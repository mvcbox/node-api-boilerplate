import { TransactionServiceTransaction } from '../../TransactionService';
import { UserSessionModelClient } from '../../../models/UserSessionModel';

export interface RefreshAuthTokenInputDTO {
  session: {
    client?: UserSessionModelClient;
    refreshToken: string;
  };
  options?: {
    transaction?: TransactionServiceTransaction;
  };
}
