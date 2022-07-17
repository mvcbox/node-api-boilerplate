import { AuthServiceContext } from '../../../services/AuthService';

export interface HandleInputDTO {
  context: AuthServiceContext;
  session: {
    _id: string;
  };
}
