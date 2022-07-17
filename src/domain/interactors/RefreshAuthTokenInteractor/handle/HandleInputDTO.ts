import { UserSessionModelClient } from '../../../models/UserSessionModel';

export interface HandleInputDTO {
  session: {
    refreshToken: string;
    client?: UserSessionModelClient;
  };
}
