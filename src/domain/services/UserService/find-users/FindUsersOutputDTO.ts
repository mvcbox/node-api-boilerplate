import { UserModelInstance } from '../../../models/UserModel';

export interface FindUsersOutputDTO {
  count: number;
  rows: UserModelInstance[];
}
