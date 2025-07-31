import { VendorStatus } from '../../../../types/src/lib/enums/vendor-status.enum';

export interface VendorCreatedEvent {
  id: string;
  name: string;
  email: string;
  storeName: string;
  status: VendorStatus;
  createdAt: Date;
}

export interface VendorStatusUpdatedEvent {
  id: string;
  status: VendorStatus;
  updatedAt: Date;
}
