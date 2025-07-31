export declare const ROLES: {
    readonly BUYER: "buyer";
    readonly SELLER: "seller";
    readonly BUYER_SELLER: "buyer_seller";
    readonly ADMIN: "admin";
    readonly SUPER_ADMIN: "super_admin";
};
export type UserRole = (typeof ROLES)[keyof typeof ROLES];
export interface AuthPayload {
    userId: string;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
export declare const isBuyer: (user?: AuthPayload) => boolean;
export declare const isSeller: (user?: AuthPayload) => boolean;
export declare const isBuyerSeller: (user?: AuthPayload) => boolean;
export declare const isAdmin: (user?: AuthPayload) => boolean;
export declare const isSuperAdmin: (user?: AuthPayload) => boolean;
