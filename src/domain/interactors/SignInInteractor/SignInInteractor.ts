import { LogService } from '../../services/LogService';
import { UserService } from '../../services/UserService';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { UserModelStatusEnum } from '../../models/UserModel';
import { TransactionService } from '../../services/TransactionService';
import { SignInInteractorOptionsDTO } from './SignInInteractorOptionsDTO';
import { ApplicationError, ErrorCodeEnum, Interactor } from '../../foundation';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';

export class SignInInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected logService: LogService;
  protected authService: AuthService;
  protected userService: UserService;
  protected transactionService: TransactionService;

  public constructor(options: SignInInteractorOptionsDTO) {
    this.logService = options.logService;
    this.authService = options.authService;
    this.userService = options.userService;
    this.transactionService = options.transactionService;
  }

  public async validateInputAssert(input: HandleInputDTO): Promise<void> {}

  public async handle(input: HandleInputDTO): Promise<HandleOutputDTO> {
    const { rows } = await this.userService.findUsers({
      filters: {
        limit: 1,
        conditions: {
          email: input.credentials.email.trim().toLowerCase()
        }
      }
    });

    if (!rows.length) {
      throw new ApplicationError({
        code: ErrorCodeEnum.INVALID_CREDENTIALS
      });
    }

    const user = rows[0];

    if (user.passwordHash !== this.userService.passwordHash(input.credentials.password, user._id!)) {
      throw new ApplicationError({
        code: ErrorCodeEnum.INVALID_CREDENTIALS
      });
    }

    if (user.status !== UserModelStatusEnum.ACTIVE) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED,
        params: {
          reason: `USER_STATUS_${user.status}`
        }
      });
    }

    const { session } = await this.authService.createSession({
      user: {
        _id: user._id!
      },
      permissions: [
        AuthServicePermissionEnum.ALL
      ]
    });

    return {
      session: {
        authToken: session.authToken,
        refreshToken: session.refreshToken
      }
    };
  }
}
