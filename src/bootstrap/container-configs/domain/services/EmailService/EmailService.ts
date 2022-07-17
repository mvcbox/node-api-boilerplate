import nodemailer from 'nodemailer';
import { Container } from 'plain-ioc';
import { config } from '../../../../../config';
import { LogService } from '../../../../../domain/services/LogService';
import { EmailServiceImpl } from '../../../../../implementation/domain/services/EmailServiceImpl';
import { EmailService, EmailServiceTemplateTypeEnum } from '../../../../../domain/services/EmailService';

export function configure(container: Container) {
  container.bindSingleton(EmailService, function(): EmailServiceImpl {
    return new EmailServiceImpl({
      defaultTemplateParams: {},
      fromEmail: config.emailService.fromEmail,
      subjectPrefix: '[Node.js API Boilerplate] ',
      logService: container.resolve<LogService>(LogService),
      templates: new Map<EmailServiceTemplateTypeEnum, string>(),
      nodemailerTransport: nodemailer.createTransport(config.emailService.nodemailer)
    });
  });
}
