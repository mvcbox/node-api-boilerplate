import { UserModelStatusEnum } from './UserModelStatusEnum';

export interface UserModelProperties {
  _id?: string;
  email: string | null;
  username: string | null;
  options: {};
  status: UserModelStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
