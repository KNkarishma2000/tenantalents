export interface SearchQuery {
    query: string;
    filters?: Record<string, string | string[]>;
    sort?: 'relevance' | 'price_asc' | 'price_desc';
    page?: number;
    pageSize?: number;
}
export interface SearchResult {
    productId: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
}
