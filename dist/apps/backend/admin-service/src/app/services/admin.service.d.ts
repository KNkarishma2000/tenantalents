import { User, Seller, UserRole, SellerStatus } from '@prisma/client';
export declare const adminService: {
    getAllUsers: () => Promise<Array<{
        id: string;
        email: string;
        role: UserRole;
        sellerStatus: SellerStatus | null;
    }>>;
    updateUserRole: (userId: string, role: UserRole) => Promise<User>;
    getPendingSellers: () => Promise<(Seller & {
        user: Pick<User, "id" | "email" | "role"> | null;
    })[]>;
    updateSellerStatus: (sellerId: string, approve: boolean) => Promise<Seller>;
    getDashboardSummary: () => Promise<{
        userCount: number;
        sellerCount: number;
    }>;
};
