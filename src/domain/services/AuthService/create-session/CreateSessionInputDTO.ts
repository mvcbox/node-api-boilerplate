import { AuthServicePermissionEnum } from '../../AuthService';
import { TransactionServiceTransaction } from '../../TransactionService';
import { UserSessionModelClient } from '../../../models/UserSessionModel';

export interface CreateSessionInputDTO {
  user: {
    _id: string;
  };
  client?: UserSessionModelClient;
  permissions: AuthServicePermissionEnum[];
  options?: {
    transaction?: TransactionServiceTransaction;
  };
}
