import { VendorStatus as PrismaVendorStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare const vendorService: {
    register(data: Prisma.VendorCreateInput): Promise<{
        email: string;
        id: string;
        name: string;
        phone: string | null;
        userId: string;
        storeName: string;
        storeSlug: string;
        status: import(".prisma/client").$Enums.VendorStatus;
        documents: string[];
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, status: PrismaVendorStatus): Promise<{
        email: string;
        id: string;
        name: string;
        phone: string | null;
        userId: string;
        storeName: string;
        storeSlug: string;
        status: import(".prisma/client").$Enums.VendorStatus;
        documents: string[];
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getById(id: string): Promise<{
        email: string;
        id: string;
        name: string;
        phone: string | null;
        userId: string;
        storeName: string;
        storeSlug: string;
        status: import(".prisma/client").$Enums.VendorStatus;
        documents: string[];
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
};
