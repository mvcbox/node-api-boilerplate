import { Model } from 'sequelize';
import { LogGroupModelProperties } from './LogGroupModelProperties';

export interface LogGroupModelInstance extends Model<LogGroupModelProperties>, LogGroupModelProperties {}
