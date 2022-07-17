import { Interactor } from '../../foundation';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';
import { GetCurrentSessionInfoInteractorOptionsDTO } from './GetCurrentSessionInfoInteractorOptionsDTO';

export class GetCurrentSessionInfoInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected authService: AuthService;

  public constructor(options: GetCurrentSessionInfoInteractorOptionsDTO) {
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

    return {
      session: {
        _id: session._id!,
        userId: session.userId,
        permissions: session.permissions
      }
    };
  }
}
