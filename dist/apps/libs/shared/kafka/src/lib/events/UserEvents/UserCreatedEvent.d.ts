export interface UserCreatedEvent {
    userId: string;
    email: string;
    name: string;
    role: 'user' | 'admin' | 'super_admin';
    createdAt: string;
}
