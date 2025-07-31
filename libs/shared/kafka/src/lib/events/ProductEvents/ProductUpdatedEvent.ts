export interface ProductUpdatedEvent {
  productId: string;
  updates: Record<string, any>;
  updatedAt: string;
}
