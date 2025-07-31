export interface UserProfileCache {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
}
export interface ProductDetailCache {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    sellerId: string;
    rating?: number;
}
export interface OrderSummaryCache {
    id: string;
    userId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: string;
}
export interface CartContentCache {
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    createdAt: string;
    updatedAt: string;
}
export interface RatingSummaryCache {
    productId: string;
    average: number;
    count: number;
}
