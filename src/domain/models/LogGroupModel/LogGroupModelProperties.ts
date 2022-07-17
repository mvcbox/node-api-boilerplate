import { LogGroupRecordModelInstance } from '../LogGroupRecordModel';

export interface LogGroupModelProperties {
  _id?: string;
  name: string;
  initializedAt: Date;
  logGroupRecords?: LogGroupRecordModelInstance[];
  createdAt?: Date;
  updatedAt?: Date;
}
