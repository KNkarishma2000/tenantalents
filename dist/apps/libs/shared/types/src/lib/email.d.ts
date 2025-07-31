export interface EmailPayload {
    to: string;
    subject: string;
    template: string;
    variables: Record<string, string | number>;
}
