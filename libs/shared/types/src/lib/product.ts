export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  vendorId: string;
  images: string[]; // MinIO keys or URLs
  createdAt: Date;
  updatedAt: Date;
}
