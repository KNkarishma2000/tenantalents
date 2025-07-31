// libs/shared/types/src/lib/events/vendor.events.ts

import { VendorStatus } from '../enums/vendor-status.enum';

/**
 * Event emitted when a vendor is created/registered
 */
export interface VendorCreatedEvent {
  vendorId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  status: VendorStatus;
  documents?: string[];
  createdAt: string; // ISO string
}

/**
 * Event emitted when a vendor’s status is updated (e.g. approved, rejected)
 */
export interface VendorStatusUpdatedEvent {
  vendorId: string;
  status: VendorStatus;
  updatedAt: string; // ISO string
}
