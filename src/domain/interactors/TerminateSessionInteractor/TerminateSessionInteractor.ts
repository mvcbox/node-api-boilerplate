import { Sequelize, Op } from 'sequelize';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { Interactor, ApplicationError, ErrorCodeEnum } from '../../foundation';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';
import { UserSessionModel, UserSessionModelStatusEnum } from '../../models/UserSessionModel';
import { TerminateSessionInteractorOptionsDTO } from './TerminateSessionInteractorOptionsDTO';

export class TerminateSessionInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected sequelize: Sequelize;
  protected authService: AuthService;

  public constructor(options: TerminateSessionInteractorOptionsDTO) {
    this.sequelize = options.sequelize;
    this.authService = options.authService;
  }

  public async validateInputAssert(input: HandleInputDTO): Promise<void> {}

  public async handle(input: HandleInputDTO): Promise<HandleOutputDTO> {
    const { session } = await this.authService.validateSession({
      context: input.context,
      requiredPermissions: [
        AuthServicePermissionEnum.ALL
      ]
    });

    const _session = await UserSessionModel.findOne({
      where: {
        _id: input.session._id,
        userId: session.userId,
        status: {
          [Op.ne]: UserSessionModelStatusEnum.TERMINATED
        }
      }
    });

    if (!_session) {
      throw new ApplicationError({
        code: ErrorCodeEnum.SESSION_NOT_FOUND
      });
    }

    await UserSessionModel.update({
      status: UserSessionModelStatusEnum.TERMINATED
    }, {
      where: {
        _id: _session._id!
      }
    });

    return {};
  }
}
