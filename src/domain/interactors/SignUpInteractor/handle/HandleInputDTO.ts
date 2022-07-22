import { UserModelProperties } from '../../../models/UserModel';

export interface HandleInputDTO {
  user: Pick<UserModelProperties, 'email' | 'username'> & {
    password: string;
  };
}
