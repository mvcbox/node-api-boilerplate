import { KeyValueDTO } from '../../../foundation';
import { EmailServiceTemplateTypeEnum } from '../EmailServiceTemplateTypeEnum';

export interface SendEmailWithTemplateInputDTO {
  toEmail: string;
  subject?: string;
  fromEmail?: string;
  templateParams: KeyValueDTO;
  type: EmailServiceTemplateTypeEnum;
}
