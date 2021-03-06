import { Container } from 'plain-ioc';
import { Sequelize, Transaction } from 'sequelize';
import { TransactionService } from '../../../../../domain/services/TransactionService';

export function configure(container: Container) {
  container.bindSingleton(TransactionService, function(): TransactionService {
    return new TransactionService({
      sequelize: container.resolve<Sequelize>(Sequelize),
      defaultTransactionOptions: {
        type: Transaction.TYPES.EXCLUSIVE
      }
    });
  });
}
