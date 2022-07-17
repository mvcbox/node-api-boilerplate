import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { AuthService } from '../../../../../domain/services/AuthService';
import { TransactionService } from '../../../../../domain/services/TransactionService';
import { _TemplateInteractor } from '../../../../../domain/interactors/_TemplateInteractor';

export function configure(container: Container) {
  container.bindSingleton(_TemplateInteractor, function(): _TemplateInteractor {
    return new _TemplateInteractor({
      logService: container.resolve<LogService>(LogService),
      authService: container.resolve<AuthService>(AuthService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
