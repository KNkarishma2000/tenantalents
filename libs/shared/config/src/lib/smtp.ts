import { env } from './env';

export const smtpConfig = {
  host: env.SMTP_HOST || '',
  port: env.SMTP_PORT || 587,
  user: env.SMTP_USER || '',
  pass: env.SMTP_PASS || '',
};
