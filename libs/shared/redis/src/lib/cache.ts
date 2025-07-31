import { redisClient } from './redis';

/**
 * Set a value in Redis cache
 * @param key string
 * @param value any serializable object
 * @param ttlInSeconds number (default: 1 hour)
 */
export const setCache = async (
  key: string,
  value: unknown,
  ttlInSeconds = 3600
): Promise<void> => {
  const data = JSON.stringify(value);
  await redisClient.setex(key, ttlInSeconds, data);
};

/**
 * Get and deserialize a value from Redis cache
 * @param key string
 */
export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redisClient.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

/**
 * Delete a key from Redis cache
 * @param key string
 */
export const deleteCache = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
