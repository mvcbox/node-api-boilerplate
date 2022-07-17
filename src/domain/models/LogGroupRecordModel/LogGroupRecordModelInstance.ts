import { Model } from 'sequelize';
import { LogGroupRecordModelProperties } from './LogGroupRecordModelProperties';

export interface LogGroupRecordModelInstance extends Model<LogGroupRecordModelProperties>, LogGroupRecordModelProperties {}
