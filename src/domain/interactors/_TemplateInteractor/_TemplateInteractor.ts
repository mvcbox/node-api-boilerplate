import { LogService } from '../../services/LogService';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { TransactionService } from '../../services/TransactionService';
import { Interactor, ApplicationError, ErrorCodeEnum } from '../../foundation';
import { _TemplateInteractorOptionsDTO } from './_TemplateInteractorOptionsDTO';
import { AuthService, AuthServicePermissionEnum } from '../../services/AuthService';

export class _TemplateInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected logService: LogService;
  protected authService: AuthService;
  protected transactionService: TransactionService;

  public constructor(options: _TemplateInteractorOptionsDTO) {
    this.logService = options.logService;
    this.authService = options.authService;
    this.transactionService = options.transactionService;
  }

  public async validateInputAssert(input: HandleInputDTO): Promise<void> {}

  public async handle(input: HandleInputDTO): Promise<HandleOutputDTO> {
    const { session } = await this.authService.validateSession({
      context: input.context,
      requiredPermissions: [
        AuthServicePermissionEnum.ALL
      ]
    });

    return {};
  }
}
