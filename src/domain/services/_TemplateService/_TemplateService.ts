import { LogService } from '../LogService';
import { EventBusService } from '../EventBusService';
import { TransactionService } from '../TransactionService';
import { _TemplateServiceOptionsDTO } from './_TemplateServiceOptionsDTO';

export class _TemplateService {
  protected readonly logService: LogService;
  protected readonly eventBusService: EventBusService;
  protected readonly transactionService: TransactionService;

  public constructor(options: _TemplateServiceOptionsDTO) {
    this.logService = options.logService;
    this.eventBusService = options.eventBusService;
    this.transactionService = options.transactionService;
  }
}
