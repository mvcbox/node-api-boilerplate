import { LogGroupModelInstance } from '../LogGroupModel';

export interface LogGroupRecordModelProperties {
  _id?: string;
  logGroupId: string;
  name: string;
  value: any;
  index: number;
  isError: boolean;
  initializedAt: Date;
  logGroup?: LogGroupModelInstance;
  createdAt?: Date;
  updatedAt?: Date;
}
