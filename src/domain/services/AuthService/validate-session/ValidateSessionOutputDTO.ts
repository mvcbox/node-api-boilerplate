import { UserModelInstance } from '../../../models/UserModel';
import { UserSessionModelInstance } from '../../../models/UserSessionModel';

export interface ValidateSessionOutputDTO {
  user: UserModelInstance;
  session: UserSessionModelInstance;
}
