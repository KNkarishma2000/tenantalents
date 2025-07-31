import { createClient } from 'redis';
import { logger } from '@shared/middlewares/logger/src/index';

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

export async function connectRedis(): Promise<void> {
  redisClient.on('error', (err) => logger.error('❌ Redis Error:', err));
  await redisClient.connect();
  logger.info('✅ Redis connected');
}

export async function disconnectRedis(): Promise<void> {
  await redisClient.quit();
  logger.info('🔌 Redis disconnected');
}
