import { Buffer } from 'buffer';
import { TransactionService } from '../TransactionService';

export interface AuthServiceOptionsDTO {
  hashSalt: Buffer;
  authTokenLifeTime: number;
  transactionService: TransactionService;
}
