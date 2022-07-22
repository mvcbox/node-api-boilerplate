import { UserModelStatusEnum } from './UserModelStatusEnum';

export interface UserModelProperties {
  _id?: string;
  email: string;
  username: string;
  passwordHash: string;
  options: {};
  status: UserModelStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
