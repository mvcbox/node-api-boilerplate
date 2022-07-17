import _ from 'lodash';
import { Queue } from 'plain-queue';
import { InspectOptions } from 'util';
import { LogServiceContext } from './LogServiceContext';
import { LogGroupModel } from '../../models/LogGroupModel';
import { TransactionService } from '../TransactionService';
import { LogServiceOptionsDTO } from './LogServiceOptionsDTO';
import { LogGroupRecordModel } from '../../models/LogGroupRecordModel';

export class LogService {
  public readonly queue: Queue;
  public readonly inspectorOptions?: InspectOptions;
  public readonly transactionService: TransactionService;

  public constructor(options: LogServiceOptionsDTO) {
    this.queue = new Queue(options.queueOptions);
    this.inspectorOptions = options.inspectorOptions;
    this.transactionService = options.transactionService;
  }

  protected saveContext(context: LogServiceContext): void {
    this.queue.addTask(async () => {
      await this.transactionService.transaction(async function(transaction) {
        const logGroup = await LogGroupModel.create({
          name: context.logGroupName,
          initializedAt: context.initializedAt
        }, {
          transaction
        });

        await LogGroupRecordModel.bulkCreate(context.logRecords.map(function(logRecord, index) {
          return {
            ..._.pick(logRecord, ['name', 'value', 'isError', 'initializedAt']),
            index,
            logGroupId: logGroup._id!
          };
        }), {
          transaction
        });
      });
    }).catch(function(err) {
      console.error('LogService->saveContext() ERROR:', err, context);
    });
  }

  public wrap<T>(logGroupName: string, wrapper: (context: LogServiceContext) => T): T {
    const context = new LogServiceContext({
      logGroupName,
      inspectorOptions: this.inspectorOptions
    });

    try {
      const result = wrapper(context);
      context.log('_LoggerContextReturnValue', result);
      this.saveContext(context);
      return result;
    } catch (e) {
      context.error('_LoggerContextUncaughtError', e);
      this.saveContext(context);
      throw e;
    }
  }

  public async wrapAsync<T>(logGroupName: string, wrapper: (context: LogServiceContext) => Promise<T>): Promise<T> {
    const context = new LogServiceContext({
      logGroupName,
      inspectorOptions: this.inspectorOptions
    });

    try {
      const result = await wrapper(context);
      context.log('_LoggerContextReturnValue', result);
      this.saveContext(context);
      return result;
    } catch (e) {
      context.error('_LoggerContextUncaughtError', e);
      this.saveContext(context);
      throw e;
    }
  }
}
