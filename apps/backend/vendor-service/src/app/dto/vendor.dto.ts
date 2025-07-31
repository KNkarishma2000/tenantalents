import { VendorStatus as SharedVendorStatus } from '@shared/types';
import { Vendor, Prisma } from '@prisma/client';

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
export interface UpdateVendorDto extends Partial<CreateVendorDto> {}

export interface UpdateVendorStatusDto {
  status: SharedVendorStatus;
}

export const createVendorDtoToPrisma = (
  dto: CreateVendorDto
): Prisma.VendorCreateInput => {
  return {
    storeName: dto.storeName,
    storeSlug: dto.storeSlug,
    name: dto.name,
    email: dto.email,
    phone: dto.phone ?? null,
    documents: dto.documents ?? [],
    status: dto.status ?? SharedVendorStatus.PENDING,
    user: {
      connect: {
        id: dto.userId,
      },
    },
  };
};
