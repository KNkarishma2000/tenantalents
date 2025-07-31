export interface Rating {
  id: string;
  userId: string;
  productId: string;
  rating: number; // 1 to 5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
