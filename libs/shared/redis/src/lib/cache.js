"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCache = exports.getCache = exports.setCache = void 0;
const redis_1 = require("./redis");
/**
 * Set a value in Redis cache
 * @param key string
 * @param value any serializable object
 * @param ttlInSeconds number (default: 1 hour)
 */
const setCache = async (key, value, ttlInSeconds = 3600) => {
    const data = JSON.stringify(value);
    await redis_1.redisClient.setex(key, ttlInSeconds, data);
};
exports.setCache = setCache;
/**
 * Get and deserialize a value from Redis cache
 * @param key string
 */
const getCache = async (key) => {
    const data = await redis_1.redisClient.get(key);
    if (!data)
        return null;
    return JSON.parse(data);
};
exports.getCache = getCache;
/**
 * Delete a key from Redis cache
 * @param key string
 */
const deleteCache = async (key) => {
    await redis_1.redisClient.del(key);
};
exports.deleteCache = deleteCache;
//# sourceMappingURL=cache.js.map