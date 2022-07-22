import { LogService } from '../LogService';
import { EventBusService } from '../EventBusService';
import { TransactionService } from '../TransactionService';

export interface _TemplateServiceOptionsDTO {
  logService: LogService;
  eventBusService: EventBusService;
  transactionService: TransactionService;
}
