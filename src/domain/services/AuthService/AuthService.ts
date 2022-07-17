import _ from 'lodash';
import moment from 'moment';
import crypto from 'crypto';
import { Op } from 'sequelize';
import { Buffer } from 'buffer';
import { UserModel } from '../../models/UserModel';
import { TransactionService } from '../TransactionService';
import { AuthServiceOptionsDTO } from './AuthServiceOptionsDTO';
import { ApplicationError, ErrorCodeEnum } from '../../foundation';
import { AuthServicePermissionEnum } from './AuthServicePermissionEnum';
import { CreateHashInputDTO, CreateHashOutputDTO } from './create-hash';
import { CreateSessionInputDTO, CreateSessionOutputDTO } from './create-session';
import { ValidateSessionInputDTO, ValidateSessionOutputDTO } from './validate-session';
import { RefreshAuthTokenInputDTO, RefreshAuthTokenOutputDTO } from './refresh-auth-token';
import {
  UserSessionModel,
  UserSessionModelProperties,
  UserSessionModelStatusEnum
} from '../../models/UserSessionModel';

export class AuthService {
  protected hashSalt: Buffer;
  protected authTokenLifeTime: number;
  protected transactionService: TransactionService;

  public constructor(options: AuthServiceOptionsDTO) {
    this.hashSalt = options.hashSalt;
    this.authTokenLifeTime = options.authTokenLifeTime;
    this.transactionService = options.transactionService;
  }

  public async validateSession(input: ValidateSessionInputDTO): Promise<ValidateSessionOutputDTO> {
    const [inputSessionId, inputSessionAuthToken] = input.context.authToken.split(':', 2);
    const requiredPermissions = Array.isArray(input.requiredPermissions) ? [input.requiredPermissions] : input.requiredPermissions.$or;

    if (!inputSessionId || !inputSessionAuthToken) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED,
        params: {
          reason: 'INVALID_INPUT'
        }
      });
    }

    const session = await UserSessionModel.findOne({
      where: {
        _id: inputSessionId
      }
    });

    if (!session || session.authToken !== this.createHash(inputSessionAuthToken)) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED,
        params: {
          reason: 'SESSION_NOT_FOUND'
        }
      });
    }

    if (session.status !== UserSessionModelStatusEnum.ACTIVE) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED,
        params: {
          reason: `SESSION_STATUS_${session.status}`
        }
      });
    }

    UserSessionModel.update({
      lastActivity: moment().unix()
    }, {
      where: {
        _id: session._id!
      }
    }).catch(console.error);

    const user = await UserModel.findOne({
      where: {
        _id: session.userId
      }
    });

    if (!user) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED,
        params: {
          reason: 'USER_NOT_FOUND'
        }
      });
    }

    if (session.permissions.includes(AuthServicePermissionEnum.ALL)) {
      return {
        user,
        session
      };
    }

    const sessionPermissions = _.uniq(session.permissions);

    for (let _requiredPermissions of requiredPermissions) {
      _requiredPermissions = _.uniq(_requiredPermissions);

      if (_.intersection(sessionPermissions, _requiredPermissions).length === _requiredPermissions.length) {
        return {
          user,
          session
        };
      }
    }

    throw new ApplicationError({
      code: ErrorCodeEnum.ACCESS_DENIED,
      params: {
        reason: 'INSUFFICIENT_PERMITS'
      }
    });
  }

  public async createSession(input: CreateSessionInputDTO): Promise<CreateSessionOutputDTO> {
    return this.transactionService.transaction(async transaction => {
      const user = await UserModel.findOne({
        where: {
          _id: input.user._id
        },
        transaction
      });

      if (!user) {
        throw new ApplicationError({
          code: ErrorCodeEnum.INTERNAL_APPLICATION_ERROR
        });
      }

      const authToken = crypto.randomBytes(129).toString('base64');
      const refreshToken = crypto.randomBytes(129).toString('base64');

      const session = await UserSessionModel.create({
        userId: user._id!,
        authToken,
        refreshToken,
        permissions: input.permissions,
        lastActivity: moment().unix(),
        client: input.client ?? {},
        status: UserSessionModelStatusEnum.ACTIVE
      }, {
        transaction
      });

      await UserSessionModel.update({
        authToken: this.createHash(authToken),
        refreshToken: this.createHash(refreshToken)
      }, {
        where: {
          _id: session._id!
        },
        transaction
      });

      return {
        session: {
          ...session.toJSON() as UserSessionModelProperties,
          authToken: `${session._id}:${authToken}`,
          refreshToken: `${session._id}:${refreshToken}`
        }
      };
    }, {
      parentTransaction: input.options?.transaction
    });
  }

  public async refreshAuthToken(input: RefreshAuthTokenInputDTO): Promise<RefreshAuthTokenOutputDTO> {
    const [inputSessionId, inputSessionRefreshToken] = input.session.refreshToken.split(':', 2);

    if (!inputSessionId || !inputSessionRefreshToken) {
      throw new ApplicationError({
        code: ErrorCodeEnum.INVALID_INPUT
      });
    }

    return this.transactionService.transaction(async transaction => {
      const oldSession = await UserSessionModel.findOne({
        where: {
          _id: inputSessionId,
          status: {
            [Op.in]: [
              UserSessionModelStatusEnum.ACTIVE,
              UserSessionModelStatusEnum.EXPIRED
            ]
          }
        },
        transaction
      });

      if (!oldSession || oldSession.refreshToken !== this.createHash(inputSessionRefreshToken)) {
        throw new ApplicationError({
          code: ErrorCodeEnum.EXPIRED_SESSION_NOT_FOUND
        });
      }

      await UserSessionModel.update({
        status: UserSessionModelStatusEnum.TERMINATED
      }, {
        where: {
          _id: oldSession._id!
        },
        transaction
      });

      const { session } = await this.createSession({
        user: {
          _id: oldSession.userId
        },
        client: input.session.client,
        permissions: oldSession.permissions,
        options: {
          transaction
        }
      });

      return {
        session
      };
    }, {
      parentTransaction: input.options?.transaction
    });
  }

  public createHash(input: CreateHashInputDTO): CreateHashOutputDTO {
    return crypto.createHash('sha512').update(input).update(this.hashSalt).digest('base64');
  }
}
