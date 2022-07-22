import { WhereOptions } from 'sequelize';
import { UserModelProperties } from '../../../models/UserModel';
import { TransactionServiceTransaction } from '../../TransactionService';

export interface FindUsersInputDTO {
  filters?: {
    offset?: number;
    limit?: number;
    conditions?: WhereOptions<UserModelProperties>;
  };
  options?: {
    transaction?: TransactionServiceTransaction;
  };
}
