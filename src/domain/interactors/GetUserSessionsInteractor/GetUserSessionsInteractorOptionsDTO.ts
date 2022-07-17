import { Sequelize } from 'sequelize';
import { AuthService } from '../../services/AuthService';

export interface GetUserSessionsInteractorOptionsDTO {
  sequelize: Sequelize;
  authService: AuthService;
}
