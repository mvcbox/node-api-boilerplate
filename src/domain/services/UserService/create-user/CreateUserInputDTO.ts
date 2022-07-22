import { UserModelProperties } from '../../../models/UserModel';
import { TransactionServiceTransaction } from '../../TransactionService';

export interface CreateUserInputDTO {
  user: Omit<UserModelProperties, '_id' | 'createdAt' | 'updatedAt'>;
  options?: {
    transaction?: TransactionServiceTransaction;
  };
}
