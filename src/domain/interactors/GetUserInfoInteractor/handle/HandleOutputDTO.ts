import { UserModelProperties } from '../../../models/UserModel';

export interface HandleOutputDTO {
  user: {
    _id: string;
    email?: string | null;
  } & Pick<UserModelProperties, 'username' | 'status'>;
}
