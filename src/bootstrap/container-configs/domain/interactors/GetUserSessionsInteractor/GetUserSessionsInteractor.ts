import { Container } from 'plain-ioc';
import { Sequelize } from 'sequelize';
import { AuthService } from '../../../../../domain/services/AuthService';
import { GetUserSessionsInteractor } from '../../../../../domain/interactors/GetUserSessionsInteractor';

export function configure(container: Container) {
  container.bindSingleton(GetUserSessionsInteractor, function(): GetUserSessionsInteractor {
    return new GetUserSessionsInteractor({
      sequelize: container.resolve<Sequelize>(Sequelize),
      authService: container.resolve<AuthService>(AuthService)
    });
  });
}
