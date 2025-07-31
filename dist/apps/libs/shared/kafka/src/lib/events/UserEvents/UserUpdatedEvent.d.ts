export interface UserUpdatedEvent {
    userId: string;
    updates: Partial<{
        email: string;
        name: string;
        role: string;
    }>;
    updatedAt: string;
}
