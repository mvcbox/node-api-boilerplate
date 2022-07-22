import { Sequelize } from 'sequelize';
import { TransactionServiceTransactionOptionsDTO } from './TransactionServiceTransactionOptionsDTO';

export interface TransactionServiceOptionsDTO {
  sequelize: Sequelize;
  defaultTransactionOptions?: TransactionServiceTransactionOptionsDTO;
}
