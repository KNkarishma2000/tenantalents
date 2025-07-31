export interface RatingCreatedEvent {
    ratingId: string;
    userId: string;
    productId: string;
    rating: number;
    review?: string;
    createdAt: string;
}
