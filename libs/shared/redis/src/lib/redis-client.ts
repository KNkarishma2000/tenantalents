// libs/shared/redis/src/lib/redis-client.ts

import Redis from 'ioredis';
import { logger } from '@shared/middlewares/logger/src/index';

const redisClient = new Redis({
  sentinels: [
    { host: process.env.REDIS_SENTINEL_1 || 'redis-sentinel-0', port: 26379 },
    { host: process.env.REDIS_SENTINEL_2 || 'redis-sentinel-1', port: 26379 },
    { host: process.env.REDIS_SENTINEL_3 || 'redis-sentinel-2', port: 26379 },
  ],
  name: process.env.REDIS_MASTER || 'mymaster',
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () =>
  logger.info('✅ Connected to Redis via Sentinel')
);
redisClient.on('error', (err) =>
  logger.error('❌ Redis connection error', err)
);

// ✅ Now exported as default
export default redisClient;
