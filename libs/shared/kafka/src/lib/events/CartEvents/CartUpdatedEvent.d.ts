export interface CartUpdatedEvent {
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    updatedAt: string;
}
//# sourceMappingURL=CartUpdatedEvent.d.ts.map