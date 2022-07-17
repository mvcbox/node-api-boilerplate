import { Model } from 'sequelize';
import { UserSessionModelProperties } from './UserSessionModelProperties';

export interface UserSessionModelInstance extends Model<UserSessionModelProperties>, UserSessionModelProperties {}
