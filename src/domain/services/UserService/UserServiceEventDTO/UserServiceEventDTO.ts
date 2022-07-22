import { UserServiceEventDTOUserCreated } from './UserServiceEventDTOUserCreated';
import { UserServiceEventDTOUserUpdated } from './UserServiceEventDTOUserUpdated';

export type UserServiceEventDTO = UserServiceEventDTOUserCreated | UserServiceEventDTOUserUpdated;
