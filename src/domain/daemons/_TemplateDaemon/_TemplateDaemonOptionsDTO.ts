import { DaemonOptionsDTO } from '../../foundation';
import { _TemplateService } from '../../services/_TemplateService';

export interface _TemplateDaemonOptionsDTO extends DaemonOptionsDTO {
  templateService: _TemplateService;
}
