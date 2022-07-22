import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { AuthService } from '../../../../../domain/services/AuthService';
import { UserService } from '../../../../../domain/services/UserService';
import { SignInInteractor } from '../../../../../domain/interactors/SignInInteractor';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(SignInInteractor, function(): SignInInteractor {
    return new SignInInteractor({
      logService: container.resolve<LogService>(LogService),
      authService: container.resolve<AuthService>(AuthService),
      userService: container.resolve<UserService>(UserService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
