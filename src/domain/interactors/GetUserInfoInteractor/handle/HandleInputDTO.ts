import { AuthServiceContext } from '../../../services/AuthService';

export interface HandleInputDTO {
  context: AuthServiceContext;
  user: {
    _id: string;
  };
}
