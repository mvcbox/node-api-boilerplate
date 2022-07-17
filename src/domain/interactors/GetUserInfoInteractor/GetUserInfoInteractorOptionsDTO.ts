import { Sequelize } from 'sequelize';
import { AuthService } from '../../services/AuthService';

export interface GetUserInfoInteractorOptionsDTO {
  sequelize: Sequelize;
  authService: AuthService;
}
