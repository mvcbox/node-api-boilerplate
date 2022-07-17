import { Transporter } from 'nodemailer';
import { EmailServiceImplOptionsDTO } from './EmailServiceImplOptionsDTO';
import { ApplicationError, ErrorCodeEnum } from '../../../../domain/foundation';
import {
  EmailService,
  SendEmailInputDTO,
  SendEmailOutputDTO,
} from '../../../../domain/services/EmailService';

export class EmailServiceImpl extends EmailService {
  protected readonly nodemailerTransport: Transporter;

  public constructor(options: EmailServiceImplOptionsDTO) {
    super(options)
    this.nodemailerTransport = options.nodemailerTransport;
  }

  public async sendEmail(input: SendEmailInputDTO): Promise<SendEmailOutputDTO> {
    return this.logService.wrapAsync('EmailServiceImpl->sendEmail()', async logContext => {
      logContext.log('input', input);
      const fromEmail = input.fromEmail ?? this.fromEmail;
      logContext.log('fromEmail', fromEmail);

      try {
        await this.nodemailerTransport.sendMail({
          from: fromEmail,
          to: input.toEmail,
          subject: input.subject,
          ...(input.contentType === 'text' ? {
            text: input.content
          } : {
            html: input.content
          })
        })
      } catch (e: any) {
        logContext.error('nodemailerTransport error', e);

        throw new ApplicationError({
          code: ErrorCodeEnum.EMAIL_SERVICE_ERROR,
          debug: {
            parentStack: e.stack
          }
        });
      }
    });
  }
}
