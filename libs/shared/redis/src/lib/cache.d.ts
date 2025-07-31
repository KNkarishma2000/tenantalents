/**
 * Set a value in Redis cache
 * @param key string
 * @param value any serializable object
 * @param ttlInSeconds number (default: 1 hour)
 */
export declare const setCache: (key: string, value: unknown, ttlInSeconds?: number) => Promise<void>;
/**
 * Get and deserialize a value from Redis cache
 * @param key string
 */
export declare const getCache: <T>(key: string) => Promise<T | null>;
/**
 * Delete a key from Redis cache
 * @param key string
 */
export declare const deleteCache: (key: string) => Promise<void>;
//# sourceMappingURL=cache.d.ts.map