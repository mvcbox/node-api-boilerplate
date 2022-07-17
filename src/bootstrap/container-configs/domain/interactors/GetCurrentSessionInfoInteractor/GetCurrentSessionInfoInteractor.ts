import { Container } from 'plain-ioc';
import { AuthService } from '../../../../../domain/services/AuthService';
import { GetCurrentSessionInfoInteractor } from '../../../../../domain/interactors/GetCurrentSessionInfoInteractor';

export function configure(container: Container) {
  container.bindSingleton(GetCurrentSessionInfoInteractor, function(): GetCurrentSessionInfoInteractor {
    return new GetCurrentSessionInfoInteractor({
      authService: container.resolve<AuthService>(AuthService)
    });
  });
}
