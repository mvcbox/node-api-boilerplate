import { Interactor } from '../../foundation';
import { AuthService } from '../../services/AuthService';
import { HandleInputDTO, HandleOutputDTO } from './handle';
import { TransactionService } from '../../services/TransactionService';
import { RefreshAuthTokenInteractorOptionsDTO } from './RefreshAuthTokenInteractorOptionsDTO';

export class RefreshAuthTokenInteractor implements Interactor<HandleInputDTO, HandleOutputDTO> {
  protected readonly authService: AuthService;
  protected readonly transactionService: TransactionService;

  public constructor(options: RefreshAuthTokenInteractorOptionsDTO) {
    this.authService = options.authService;
    this.transactionService = options.transactionService;
  }

  public async validateInputAssert(input: HandleInputDTO): Promise<void> {}

  public async handle(input: HandleInputDTO): Promise<HandleOutputDTO> {
    const { session } = await this.authService.refreshAuthToken({
      session: {
        refreshToken: input.session.refreshToken,
        client: input.session.client
      }
    });

    return {
      session: {
        authToken: session.authToken,
        refreshToken: session.refreshToken
      }
    };
  }
}
