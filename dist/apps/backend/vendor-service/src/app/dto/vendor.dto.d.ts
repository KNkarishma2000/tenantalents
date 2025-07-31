import { VendorStatus as SharedVendorStatus } from '@shared/types';
import { Prisma } from '@prisma/client';
export interface CreateVendorDto {
    storeName: string;
    storeSlug: string;
    name: string;
    email: string;
    phone?: string;
    userId: string;
    status?: SharedVendorStatus;
    documents?: string[];
}
export interface UpdateVendorDto extends Partial<CreateVendorDto> {
}
export interface UpdateVendorStatusDto {
    status: SharedVendorStatus;
}
export declare const createVendorDtoToPrisma: (dto: CreateVendorDto) => Prisma.VendorCreateInput;
