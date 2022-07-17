import { AuthServiceContext } from '../../AuthServiceContext';
import { ValidateSessionInputDTORequiredPermissions } from './ValidateSessionInputDTORequiredPermissions';

export interface ValidateSessionInputDTO {
  context: AuthServiceContext;
  requiredPermissions: ValidateSessionInputDTORequiredPermissions;
}
