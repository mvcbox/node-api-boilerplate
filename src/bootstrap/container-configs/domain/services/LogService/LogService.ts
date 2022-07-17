import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(LogService, function(): LogService {
    return new LogService({
      inspectorOptions: {
        depth: Infinity
      },
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
