import { LogService } from '../LogService';
import _, { TemplateExecutor } from 'lodash';
import { EmailServiceOptionsDTO } from './EmailServiceOptionsDTO';
import { SendEmailInputDTO, SendEmailOutputDTO } from './send-email';
import { EmailServiceTemplateTypeEnum } from './EmailServiceTemplateTypeEnum';
import { ApplicationError, ErrorCodeEnum, KeyValueDTO } from '../../foundation';
import { SendEmailWithTemplateInputDTO, SendEmailWithTemplateOutputDTO } from './send-email-with-template';

export abstract class EmailService {
  protected readonly fromEmail: string;
  protected readonly subjectPrefix: string;
  protected readonly logService: LogService;
  protected readonly defaultTemplateParams: KeyValueDTO;
  protected readonly templates: Map<EmailServiceTemplateTypeEnum, TemplateExecutor>;

  protected constructor(options: EmailServiceOptionsDTO) {
    this.fromEmail = options.fromEmail;
    this.logService = options.logService;
    this.subjectPrefix = options.subjectPrefix;
    this.defaultTemplateParams = options.defaultTemplateParams ?? {};
    this.templates = new Map<EmailServiceTemplateTypeEnum, TemplateExecutor>();

    options.templates.forEach((value, key) => {
      this.templates.set(key, _.template(value, { variable: '___obj' }));
    });
  }

  public abstract sendEmail(input: SendEmailInputDTO): Promise<SendEmailOutputDTO>;

  public async sendEmailWithTemplate(input: SendEmailWithTemplateInputDTO): Promise<SendEmailWithTemplateOutputDTO> {
    return this.logService.wrapAsync('EmailService->sendEmailWithTemplate()', async logContext => {
      logContext.log('input', input);
      const template = this.templates.get(input.type);
      const fromEmail = input.fromEmail ?? this.fromEmail;
      const subject = this.subjectPrefix + (input.subject ?? '');
      logContext.log('subject', subject);
      logContext.log('fromEmail', fromEmail);

      if (!template) {
        throw new ApplicationError({
          code: ErrorCodeEnum.EMAIL_SERVICE_ERROR,
          params: {
            reason: 'EMAIL_TEMPLATE_NOT_FOUND'
          }
        });
      }

      const content = template({
        ...this.defaultTemplateParams,
        ...input.templateParams
      });

      logContext.log('content', content);

      await this.sendEmail({
        subject,
        content,
        fromEmail,
        contentType: 'html',
        toEmail: input.toEmail
      });
    });
  }
}
