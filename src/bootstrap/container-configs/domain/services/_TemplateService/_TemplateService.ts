import { Container } from 'plain-ioc';
import { LogService } from '../../../../../domain/services/LogService';
import { EventBusService } from '../../../../../domain/services/EventBusService';
import { _TemplateService } from '../../../../../domain/services/_TemplateService';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(_TemplateService, function(): _TemplateService {
    return new _TemplateService({
      logService: container.resolve<LogService>(LogService),
      eventBusService: container.resolve<EventBusService>(EventBusService),
      transactionService: container.resolve<TransactionService>(TransactionService)
    });
  });
}
