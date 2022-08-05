import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { Interactor, ApplicationError, ErrorCodeEnum } from '../../foundation';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';
import { GetUserSessionsInteractorOptionsDTO } from './GetUserSessionsInteractorOptionsDTO';
import { UserSessionModel, UserSessionModelProperties } from '../../models/UserSessionModel';

export class GetUserSessionsInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected readonly sequelize: Sequelize;
  protected readonly authService: AuthService;

  public constructor(options: GetUserSessionsInteractorOptionsDTO) {
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

    if (input.user._id !== session.userId) {
      throw new ApplicationError({
        code: ErrorCodeEnum.ACCESS_DENIED
      });
    }

    const { count, rows } = await UserSessionModel.findAndCountAll({
      where: {
        ...(input.filters?.conditions ?? {}),
        userId: session.userId
      }
    });

    return {
      count,
      rows: rows.map(function(item) {
        return _.omit(item.toJSON(), ['authToken', 'refreshToken']);
      })
    };
  }
}
