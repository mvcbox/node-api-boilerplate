import { Interactor } from '../../foundation';
import { LogService } from '../../services/LogService';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { UserModelStatusEnum } from '../../models/UserModel';
import { TransactionService } from '../../services/TransactionService';
import { SignUpInteractorOptionsDTO } from './SignUpInteractorOptionsDTO';

export class SignUpInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected logService: LogService;
  protected authService: AuthService;
  protected userService: UserService;
  protected transactionService: TransactionService;

  public constructor(options: SignUpInteractorOptionsDTO) {
    this.logService = options.logService;
    this.authService = options.authService;
    this.userService = options.userService;
    this.transactionService = options.transactionService;
  }

  public async validateInputAssert(input: HandleInputDTO): Promise<void> {}

  public async handle(input: HandleInputDTO): Promise<HandleOutputDTO> {
    return this.transactionService.transaction(async transaction => {
      let { user } = await this.userService.createUser({
        user: {
          email: input.user.email,
          username: input.user.username,
          passwordHash: '',
          options: {},
          status: UserModelStatusEnum.ACTIVE
        },
        options: {
          transaction
        }
      });

      user = (await this.userService.updateUser({
        user: {
          _id: user._id!
        },
        update: {
          passwordHash: this.userService.passwordHash(input.user.password, user._id!)
        },
        options: {
          transaction
        }
      })).user;

      return {
        user
      };
    });
  }
}
