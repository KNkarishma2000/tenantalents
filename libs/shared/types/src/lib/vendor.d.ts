import { VendorStatus } from './enums/vendor-status.enum';
export interface Vendor {
    id: string;
    storeName: string;
    storeSlug: string;
    name: string;
    email: string;
    phone: string;
    userId: string;
    documents: string[];
    status: VendorStatus;
    createdAt: string;
    updatedAt: string;
}
export interface VendorCreatedEvent {
    vendorId: string;
    userId: string;
    email: string;
    status: VendorStatus;
    createdAt: string;
}
export interface VendorStatusUpdatedEvent {
    vendorId: string;
    newStatus: VendorStatus;
    updatedAt: string;
}
//# sourceMappingURL=vendor.d.ts.map