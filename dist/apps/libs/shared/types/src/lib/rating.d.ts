export interface Rating {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}
