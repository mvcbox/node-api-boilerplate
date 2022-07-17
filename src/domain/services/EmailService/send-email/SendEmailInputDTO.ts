export interface SendEmailInputDTO {
  toEmail: string;
  subject: string;
  content: string;
  fromEmail?: string;
  contentType: 'text' | 'html';
}
