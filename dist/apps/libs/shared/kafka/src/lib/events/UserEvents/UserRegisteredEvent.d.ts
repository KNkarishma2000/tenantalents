export interface UserRegisteredEvent {
    userId: string;
    registeredAt: string;
    source: 'web' | 'mobile' | 'admin';
}
