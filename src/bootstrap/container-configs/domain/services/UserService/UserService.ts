import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { UserService } from '../../../../../domain/services/UserService';
import { EventBusService } from '../../../../../domain/services/EventBusService';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(UserService, function(): UserService {
    return new UserService({
      logService: container.resolve<LogService>(LogService),
      eventBusService: container.resolve<EventBusService>(EventBusService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
