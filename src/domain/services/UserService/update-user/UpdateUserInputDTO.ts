import { UserModelProperties } from '../../../models/UserModel';
import { TransactionServiceTransaction } from '../../TransactionService';

export interface UpdateUserInputDTO {
  user: {
    _id: string;
  };
  update: Partial<Pick<UserModelProperties, 'email' | 'username' | 'passwordHash' | 'options' | 'status'>>;
  options?: {
    transaction?: TransactionServiceTransaction;
  };
}
