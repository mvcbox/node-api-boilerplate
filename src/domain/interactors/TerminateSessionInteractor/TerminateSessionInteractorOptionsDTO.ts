import { Sequelize } from 'sequelize';
import { AuthService } from '../../services/AuthService';

export interface TerminateSessionInteractorOptionsDTO {
  sequelize: Sequelize;
  authService: AuthService;
}
