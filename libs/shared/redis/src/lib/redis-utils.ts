import redisClient from './redis-client';

export const setCache = async (
  key: string,
  value: unknown,
  ttlInSeconds = 3600
): Promise<void> => {
  const data = JSON.stringify(value);
  await redisClient.setex(key, ttlInSeconds, data);
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const delCache = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
