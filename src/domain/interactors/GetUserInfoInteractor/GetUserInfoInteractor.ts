import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { UserModel } from '../../models/UserModel';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { Interactor, ApplicationError, ErrorCodeEnum } from '../../foundation';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';
import { GetUserInfoInteractorOptionsDTO } from './GetUserInfoInteractorOptionsDTO';

export class GetUserInfoInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected readonly sequelize: Sequelize;
  protected readonly authService: AuthService;

  public constructor(options: GetUserInfoInteractorOptionsDTO) {
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

    const isMyProfile = session.userId === input.user._id;
    const user = await UserModel.findOne({
      where: {
        _id: input.user._id
      }
    });

    if (!user) {
      throw new ApplicationError({
        code: ErrorCodeEnum.USER_NOT_FOUND
      });
    }

    return {
      user: {
        _id: user._id!,
        ..._.pick(user, [
          'username',
          'status'
        ]),
        ...(isMyProfile ? {
          email: user.email
        } : {})
      }
    };
  }
}
