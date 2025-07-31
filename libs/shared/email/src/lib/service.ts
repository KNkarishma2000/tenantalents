import { sendEmail } from '@shared/email';
import { EmailPayload } from '@shared/email';

export const sendEmailService = async (data: EmailPayload) => {
  await sendEmail(data);
};
