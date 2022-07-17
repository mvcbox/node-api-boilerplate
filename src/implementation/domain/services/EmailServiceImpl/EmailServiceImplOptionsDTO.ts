import { Transporter } from 'nodemailer';
import { EmailServiceOptionsDTO } from '../../../../domain/services/EmailService';

export interface EmailServiceImplOptionsDTO extends EmailServiceOptionsDTO {
  nodemailerTransport: Transporter;
}
