import { UserRole } from '@prisma/client';
interface RegisterUserParams {
    email: string;
    password: string;
    phone: string;
    role?: UserRole;
}
interface LoginUserParams {
    email: string;
    password: string;
}
export declare const userService: {
    registerUser: ({ email, password, phone, role, }: RegisterUserParams) => Promise<{
        id: any;
        email: any;
        role: any;
    }>;
    loginUser: ({ email, password }: LoginUserParams) => Promise<any>;
    getUserProfile: (userId: string) => Promise<any>;
    updateUserRole: (userId: string, newRole: UserRole) => Promise<any>;
};
export {};
