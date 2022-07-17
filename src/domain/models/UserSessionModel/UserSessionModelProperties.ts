import { UserSessionModelClient } from './UserSessionModelClient';
import { AuthServicePermissionEnum } from '../../services/AuthService';
import { UserSessionModelStatusEnum } from './UserSessionModelStatusEnum';

export interface UserSessionModelProperties {
  _id?: string;
  userId: string;
  authToken: string;
  refreshToken: string;
  permissions: AuthServicePermissionEnum[];
  lastActivity: number;
  client: UserSessionModelClient;
  status: UserSessionModelStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
