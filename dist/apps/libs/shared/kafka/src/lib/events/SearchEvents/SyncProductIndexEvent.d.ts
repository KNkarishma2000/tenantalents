export interface SyncProductIndexEvent {
    productId: string;
    operation: 'create' | 'update' | 'delete';
}
