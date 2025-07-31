import { VendorStatus as PrismaVendorStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare const vendorService: {
    register(data: Prisma.VendorCreateInput): Promise<any>;
    updateStatus(id: string, status: PrismaVendorStatus): Promise<any>;
    getById(id: string): Promise<any>;
};
