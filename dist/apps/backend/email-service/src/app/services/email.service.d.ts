interface EmailParams {
    to: string;
    subject: string;
    html: string;
}
export declare const emailService: {
    send: ({ to, subject, html }: EmailParams) => Promise<{
        messageId: string;
    }>;
};
export {};
