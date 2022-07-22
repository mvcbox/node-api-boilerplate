import { EventEmitter } from 'events'
import { Transaction } from 'sequelize';
import { TransactionServiceEventTypeEnum } from './TransactionServiceEventTypeEnum';

export class TransactionServiceTransaction {
  public readonly native: Transaction;
  protected readonly events: EventEmitter;

  public constructor(native: Transaction) {
    this.native = native;
    this.events = new EventEmitter;
  }

  public onCommit(callback: () => void) {
    this.events.once(TransactionServiceEventTypeEnum.TRANSACTION_COMMIT, callback);
  }

  public onRollback(callback: () => void) {
    this.events.once(TransactionServiceEventTypeEnum.TRANSACTION_ROLLBACK, callback);
  }

  public emitCommit() {
    this.events.emit(TransactionServiceEventTypeEnum.TRANSACTION_COMMIT);
    this.events.removeAllListeners();
  }

  public emitRollback() {
    this.events.emit(TransactionServiceEventTypeEnum.TRANSACTION_ROLLBACK);
    this.events.removeAllListeners();
  }
}
