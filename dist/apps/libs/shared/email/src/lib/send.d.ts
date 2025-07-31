export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}
export declare const sendEmail: ({ to, subject, html, }: EmailPayload) => Promise<void>;
