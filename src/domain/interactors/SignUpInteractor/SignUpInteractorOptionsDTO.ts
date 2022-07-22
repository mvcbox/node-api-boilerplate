import { LogService } from '../../services/LogService';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { TransactionService } from '../../services/TransactionService';

export interface SignUpInteractorOptionsDTO {
  logService: LogService;
  userService: UserService;
  authService: AuthService;
  transactionService: TransactionService;
}
