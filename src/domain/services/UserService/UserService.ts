import crypto from 'crypto';
import { LogService } from '../LogService';
import { EventBusService } from '../EventBusService';
import { TransactionService } from '../TransactionService';
import { UserServiceOptionsDTO } from './UserServiceOptionsDTO';
import { ApplicationError, ErrorCodeEnum } from '../../foundation';
import { FindUsersInputDTO, FindUsersOutputDTO } from './find-users';
import { UserServiceEventTypeEnum } from './UserServiceEventTypeEnum';
import { UserModel, UserModelProperties } from '../../models/UserModel';
import { CreateUserInputDTO, CreateUserOutputDTO } from './create-user';
import { UpdateUserInputDTO, UpdateUserOutputDTO } from './update-user';
import { UserServiceEventDTOUserCreated, UserServiceEventDTOUserUpdated } from './UserServiceEventDTO';

export class UserService {
  protected readonly logService: LogService;
  protected readonly eventBusService: EventBusService;
  protected readonly transactionService: TransactionService;

  public constructor(options: UserServiceOptionsDTO) {
    this.logService = options.logService;
    this.eventBusService = options.eventBusService;
    this.transactionService = options.transactionService;
  }

  public async createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    return this.transactionService.transaction(async transaction => {
      let { email, username } = input.user;
      email = email.trim().toLowerCase();
      username = username.trim();

      if (await UserModel.count({ where: { email }, transaction: transaction.native })) {
        throw new ApplicationError({
          code: ErrorCodeEnum.EMAIL_ALREADY_EXISTS
        });
      }

      if (await UserModel.count({ where: { username }, transaction: transaction.native })) {
        throw new ApplicationError({
          code: ErrorCodeEnum.USERNAME_ALREADY_EXISTS
        });
      }

      const user = await UserModel.create({
        ...input.user,
        email,
        username
      }, {
        transaction: transaction.native
      });

      transaction.onCommit(() => {
        const event: UserServiceEventDTOUserCreated = {
          type: UserServiceEventTypeEnum.USER_CREATED,
          user
        };
        this.eventBusService.emit(event.type, event);
      });

      return {
        user
      };
    }, {
      parentTransaction: input.options?.transaction
    });
  }

  public async updateUser(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    return this.transactionService.transaction(async transaction => {
      const user = await UserModel.findOne({
        where: {
          _id: input.user._id
        },
        transaction: transaction.native
      });

      if (!user) {
        throw new ApplicationError({
          code: ErrorCodeEnum.USER_NOT_FOUND
        });
      }

      await user.update(input.update, {
        transaction: transaction.native
      });

      transaction.onCommit(() => {
        const event: UserServiceEventDTOUserUpdated = {
          type: UserServiceEventTypeEnum.USER_UPDATED,
          user
        };
        this.eventBusService.emit(event.type, event);
      });

      return {
        user
      };
    }, {
      parentTransaction: input.options?.transaction
    });
  }

  public async findUsers(input: FindUsersInputDTO): Promise<FindUsersOutputDTO> {
    return UserModel.findAndCountAll({
      where: input.filters?.conditions,
      offset: input.filters?.offset,
      limit: input.filters?.limit,
      transaction: input.options?.transaction?.native
    });
  }

  public passwordHash(password: string, salt?: string): string {
    return crypto.createHash('sha256').update(`${password}${salt ?? ''}`).digest('base64');
  }
}
