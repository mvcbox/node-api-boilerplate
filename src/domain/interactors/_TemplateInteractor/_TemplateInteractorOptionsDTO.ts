import { LogService } from '../../services/LogService';
import { AuthService } from '../../services/AuthService';
import { TransactionService } from '../../services/TransactionService';

export interface _TemplateInteractorOptionsDTO {
  logService: LogService;
  authService: AuthService;
  transactionService: TransactionService;
}
