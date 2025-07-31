// 🔁 Re-export internal Redis utility modules
export * from './lib/types';
export * from './lib/keys';
export * from './lib/cache';

// 🚀 Export Redis client and lifecycle
export * from './lib/redis'; // includes redisClient, connectRedis, disconnectRedis
