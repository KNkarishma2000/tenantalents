export declare const cartService: {
    /**
     * Get the cart for a user or guest session.
     */
    getCart: (userId: string) => Promise<any[]>;
    /**
     * Add an item to the user's or guest's cart.
     */
    addToCart: (userId: string, item: any) => Promise<any[]>;
    /**
     * Checkout the cart: clears from Redis and emits Kafka event.
     */
    checkout: (userId: string) => Promise<{
        status: string;
        cart: any[];
    }>;
};
