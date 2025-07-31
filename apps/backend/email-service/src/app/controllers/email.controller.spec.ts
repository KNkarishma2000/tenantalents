import { Request, Response } from 'express';
import { sendTestEmail } from './email.controller';
import * as emailLib from '@shared/email';

describe('📧 sendTestEmail Controller', () => {
  let req: Request;
  let res: Response;
  let sendEmailSpy: jest.SpyInstance;

  beforeEach(() => {
    req = {
      body: {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<h1>Hello from test</h1>',
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    sendEmailSpy = jest.spyOn(emailLib, 'sendEmail');
    jest.clearAllMocks();
  });

  it('✅ should send an email and return success response', async () => {
    const mockResult = { messageId: 'abc123' };
    sendEmailSpy.mockResolvedValueOnce(mockResult);

    await sendTestEmail(req, res);

    expect(sendEmailSpy).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<h1>Hello from test</h1>',
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: '✅ Test email sent successfully',
      messageId: 'abc123',
    });
  });

  it('❌ should handle email sending error and return 500', async () => {
    const mockError = new Error('Email failed');
    sendEmailSpy.mockRejectedValueOnce(mockError);

    await sendTestEmail(req, res);

    expect(sendEmailSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: '❌ Failed to send test email',
      error: 'Email failed',
    });
  });
});
