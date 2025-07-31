import redisClient from './redis-client';
import { logger } from '../../../logger/src/lib/logger';

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.status || redisClient.status === 'end') {
      if (typeof redisClient.connect === 'function') {
        await redisClient.connect();
        logger.info('🔌 Redis connection established via connectRedis');
      } else {
        logger.warn(
          '⚠️ redisClient.connect() is not available – already connected or not needed'
        );
      }
    } else {
      logger.info('✅ Redis client already connected');
    }
  } catch (err) {
    logger.error('❌ Failed to connect to Redis:', err);
    throw err;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.quit(); // Gracefully closes the connection
    logger.info('🔌 Redis connection closed via disconnectRedis');
  } catch (err) {
    logger.error('❌ Failed to disconnect from Redis:', err);
    throw err;
  }
};
