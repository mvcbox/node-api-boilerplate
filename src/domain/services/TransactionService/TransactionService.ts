import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { TransactionServiceOptionsDTO } from './TransactionServiceOptionsDTO';
import { TransactionServiceTransaction } from './TransactionServiceTransaction';
import { TransactionServiceTransactionOptionsDTO } from './TransactionServiceTransactionOptionsDTO';

export class TransactionService {
  protected readonly sequelize: Sequelize;
  protected readonly defaultTransactionOptions: TransactionServiceTransactionOptionsDTO;

  public constructor(options: TransactionServiceOptionsDTO) {
    this.sequelize = options.sequelize;
    this.defaultTransactionOptions = options.defaultTransactionOptions ?? {};
  }

  public async transaction<T>(
    autoCallback: (transaction: TransactionServiceTransaction) => Promise<T>,
    options?: {
      options?: TransactionServiceTransactionOptionsDTO;
      parentTransaction?: TransactionServiceTransaction;
    }
  ): Promise<T> {
    if (options?.parentTransaction) {
      return autoCallback(options.parentTransaction);
    }

    let transaction: TransactionServiceTransaction | undefined;

    try {
      const nativeTransaction = await this.sequelize.transaction(_.merge({}, this.defaultTransactionOptions, options?.options ?? {}));
      const result = await autoCallback(transaction = new TransactionServiceTransaction(nativeTransaction));
      await transaction.native.commit();
      transaction.emitCommit();
      return result;
    } catch (err) {
      await transaction?.native.rollback().catch(console.error);
      transaction?.emitRollback();
      throw err;
    }
  }
}
