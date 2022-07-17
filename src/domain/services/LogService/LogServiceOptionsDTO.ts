import { InspectOptions } from 'util';
import { QueueOptions } from 'plain-queue';
import { TransactionService } from '../TransactionService';

export interface LogServiceOptionsDTO {
  queueOptions?: QueueOptions;
  inspectorOptions?: InspectOptions;
  transactionService: TransactionService;
}
