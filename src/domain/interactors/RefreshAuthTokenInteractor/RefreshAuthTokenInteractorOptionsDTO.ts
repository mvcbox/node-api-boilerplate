import { AuthService } from '../../services/AuthService';
import { TransactionService } from '../../services/TransactionService';

export interface RefreshAuthTokenInteractorOptionsDTO {
  authService: AuthService;
  transactionService: TransactionService;
}
