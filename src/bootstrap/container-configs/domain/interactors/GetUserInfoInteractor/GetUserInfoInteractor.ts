import { Container } from 'plain-ioc';
import { Sequelize } from 'sequelize';
import { AuthService } from '../../../../../domain/services/AuthService';
import { GetUserInfoInteractor } from '../../../../../domain/interactors/GetUserInfoInteractor';

export function configure(container: Container) {
  container.bindSingleton(GetUserInfoInteractor, function(): GetUserInfoInteractor {
    return new GetUserInfoInteractor({
      sequelize: container.resolve<Sequelize>(Sequelize),
      authService: container.resolve<AuthService>(AuthService)
    });
  });
}
