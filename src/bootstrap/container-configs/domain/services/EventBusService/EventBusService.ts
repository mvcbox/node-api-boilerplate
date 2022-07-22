import { Container } from 'plain-ioc';
import { EventBusService } from '../../../../../domain/services/EventBusService';

export function configure(container: Container) {
  container.bindSingleton(EventBusService, function(): EventBusService {
    return new EventBusService;
  });
}
