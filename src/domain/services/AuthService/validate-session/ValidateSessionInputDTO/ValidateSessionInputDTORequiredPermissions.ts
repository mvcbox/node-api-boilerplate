import { AuthServicePermissionEnum } from '../../AuthServicePermissionEnum';

export type ValidateSessionInputDTORequiredPermissions = AuthServicePermissionEnum[] | {
  $or: AuthServicePermissionEnum[][]
};
