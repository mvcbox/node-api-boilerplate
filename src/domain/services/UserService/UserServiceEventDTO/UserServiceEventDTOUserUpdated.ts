import { UserModelInstance } from '../../../models/UserModel';
import { UserServiceEventTypeEnum } from '../UserServiceEventTypeEnum';

export interface UserServiceEventDTOUserUpdated {
  type: UserServiceEventTypeEnum.USER_UPDATED;
  user: UserModelInstance;
}
