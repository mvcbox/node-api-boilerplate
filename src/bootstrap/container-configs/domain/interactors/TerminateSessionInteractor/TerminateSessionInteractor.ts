import { Container } from 'plain-ioc';
import { Sequelize } from 'sequelize';
import { AuthService } from '../../../../../domain/services/AuthService';
import { TerminateSessionInteractor } from '../../../../../domain/interactors/TerminateSessionInteractor';

export function configure(container: Container) {
  container.bindSingleton(TerminateSessionInteractor, function(): TerminateSessionInteractor {
    return new TerminateSessionInteractor({
      sequelize: container.resolve<Sequelize>(Sequelize),
      authService: container.resolve<AuthService>(AuthService)
    });
  });
}
