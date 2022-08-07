import { container } from '../container';
import { Daemon } from '../domain/foundation';
import { _TemplateDaemon } from '../domain/daemons/_TemplateDaemon';

const daemons: Daemon[] = [
  container.resolve<_TemplateDaemon>(_TemplateDaemon)
];

setTimeout(function() {
  daemons.forEach(daemon => daemon.start());
}, 5000);
