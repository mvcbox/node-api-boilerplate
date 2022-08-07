import { Container } from 'plain-ioc';
import { _TemplateDaemon } from '../../../../../domain/daemons/_TemplateDaemon';
import { _TemplateService } from '../../../../../domain/services/_TemplateService';

export function configure(container: Container) {
  container.bindSingleton(_TemplateDaemon, function(): _TemplateDaemon {
    return new _TemplateDaemon({
      interval: 60000,
      templateService: container.resolve<_TemplateService>(_TemplateService)
    });
  });
}
