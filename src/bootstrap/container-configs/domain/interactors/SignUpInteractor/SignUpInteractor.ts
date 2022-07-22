import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { AuthService } from '../../../../../domain/services/AuthService';
import { UserService } from '../../../../../domain/services/UserService';
import { SignUpInteractor } from '../../../../../domain/interactors/SignUpInteractor';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(SignUpInteractor, function(): SignUpInteractor {
    return new SignUpInteractor({
      logService: container.resolve<LogService>(LogService),
      authService: container.resolve<AuthService>(AuthService),
      userService: container.resolve<UserService>(UserService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
