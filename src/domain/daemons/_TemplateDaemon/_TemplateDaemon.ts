import { Daemon } from '../../foundation';
import { _TemplateService } from '../../services/_TemplateService';
import { _TemplateDaemonOptionsDTO } from './_TemplateDaemonOptionsDTO';

export class _TemplateDaemon extends Daemon {
  protected readonly templateService: _TemplateService;

  public constructor(options: _TemplateDaemonOptionsDTO) {
    super(options);
    this.templateService = options.templateService;
  }

  public async handle(): Promise<void> {

  }
}
