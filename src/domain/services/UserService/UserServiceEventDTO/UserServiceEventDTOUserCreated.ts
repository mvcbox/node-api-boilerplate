import { UserModelInstance } from '../../../models/UserModel';
import { UserServiceEventTypeEnum } from '../UserServiceEventTypeEnum';

export interface UserServiceEventDTOUserCreated {
  type: UserServiceEventTypeEnum.USER_CREATED;
  user: UserModelInstance;
}
