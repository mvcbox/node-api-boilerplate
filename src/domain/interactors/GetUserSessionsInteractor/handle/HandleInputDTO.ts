import { AuthServiceContext } from '../../../services/AuthService';
import { UserSessionModelStatusEnum } from '../../../models/UserSessionModel';

export interface HandleInputDTO {
  context: AuthServiceContext;
  user: {
    _id: string;
  },
  filters?: {
    offset?: number;
    limit?: number;
    conditions?: {
      _id?: string;
      status?: UserSessionModelStatusEnum;
    };
  };
}
