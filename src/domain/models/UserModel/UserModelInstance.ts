import { Model } from 'sequelize';
import { UserModelProperties } from './UserModelProperties';

export interface UserModelInstance extends Model<UserModelProperties>, UserModelProperties {}
