export interface EmailUserCreatedEvent {
    to: string;
    subject: string;
    template: 'user-created';
    context: {
        name: string;
        email: string;
    };
}
//# sourceMappingURL=EmailUserCreatedEvent.d.ts.map