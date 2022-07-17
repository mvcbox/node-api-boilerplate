import { Container } from 'plain-ioc';
import { config } from '../../../../../config';
import { AuthService } from '../../../../../domain/services/AuthService';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(AuthService, function(): AuthService {
    return new AuthService({
      hashSalt: config.globalSalt,
      authTokenLifeTime: config.auth.authTokenLifeTime,
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
