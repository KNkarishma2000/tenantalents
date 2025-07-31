import { Request, Response } from 'express';
import { sendEmail } from '@shared/email';
import { logger } from '@shared/logger';

export const sendTestEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        message: '❌ Missing required fields: to, subject, or html',
      });
    }

    const result = await sendEmail({ to, subject, html });

    return res.status(200).json({
      message: '✅ Test email sent successfully',
      messageId: result?.messageId ?? 'unknown',
    });
  } catch (error: any) {
    logger.error('[sendTestEmail] ❌ Failed to send email:', error);
    return res.status(500).json({
      message: '❌ Failed to send test email',
      error: error?.message ?? 'Unknown error',
    });
  }
};
