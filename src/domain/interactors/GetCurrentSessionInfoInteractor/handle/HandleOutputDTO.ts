import { AuthServicePermissionEnum } from '../../../services/AuthService';

export interface HandleOutputDTO {
  session: {
    _id: string;
    userId: string;
    permissions: AuthServicePermissionEnum[];
  };
}
