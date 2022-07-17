import { LogService } from '../LogService';
import { KeyValueDTO } from '../../foundation';
import { EmailServiceTemplateTypeEnum } from './EmailServiceTemplateTypeEnum';

export interface EmailServiceOptionsDTO {
  fromEmail: string;
  subjectPrefix: string;
  logService: LogService;
  defaultTemplateParams?: KeyValueDTO;
  templates: Map<EmailServiceTemplateTypeEnum, string>;
}
