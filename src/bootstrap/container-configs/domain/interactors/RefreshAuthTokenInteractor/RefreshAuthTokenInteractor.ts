import { Container } from 'plain-ioc';
import { AuthService } from '../../../../../domain/services/AuthService';
import { TransactionService } from '../../../../../domain/services/TransactionService';
import { RefreshAuthTokenInteractor } from '../../../../../domain/interactors/RefreshAuthTokenInteractor';

export function configure(container: Container) {
  container.bindSingleton(RefreshAuthTokenInteractor, function(): RefreshAuthTokenInteractor {
    return new RefreshAuthTokenInteractor({
      authService: container.resolve<AuthService>(AuthService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
