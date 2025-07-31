export interface RatingCreatedEvent {
  ratingId: string;
  userId: string;
  productId: string;
  rating: number; // 1 to 5
  review?: string;
  createdAt: string;
}
