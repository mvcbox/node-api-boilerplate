import { Sequelize, TransactionOptions } from 'sequelize';
import { TransactionServiceOptionsDTO } from './TransactionServiceOptionsDTO';
import { TransactionServiceTransaction } from './TransactionServiceTransaction';

export class TransactionService {
  protected sequelize: Sequelize;

  public constructor(options: TransactionServiceOptionsDTO) {
    this.sequelize = options.sequelize;
  }

  public transaction<T>(
    autoCallback: (transaction: TransactionServiceTransaction) => Promise<T>,
    options?: {
      options?: TransactionOptions;
      parentTransaction?: TransactionServiceTransaction;
    }
  ): Promise<T> {
    return options?.parentTransaction ? autoCallback(options.parentTransaction) : this.sequelize.transaction<T>(options?.options ?? {}, autoCallback);
  }
}
