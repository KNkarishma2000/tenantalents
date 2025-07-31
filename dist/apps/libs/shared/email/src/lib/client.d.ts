import { EmailPayload } from './types';
export declare const sendEmail: ({ to, subject, html, }: EmailPayload) => Promise<{
    messageId: string;
}>;
