import { LogService } from '../../services/LogService';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { TransactionService } from '../../services/TransactionService';

export interface SignInInteractorOptionsDTO {
  logService: LogService;
  authService: AuthService;
  userService: UserService;
  transactionService: TransactionService;
}
