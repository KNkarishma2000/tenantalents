import { PrismaClient } from '@prisma/client';
import { redisClient } from 'libs/shared/redis/src/lib';
import { disconnectKafkaProducer } from '@shared/kafka';
import logger from '@shared/logger';

interface ShutdownDeps {
  prisma: PrismaClient;
  redisClient: typeof redisClient;
}

export const gracefulShutdown = async ({
  prisma,
  redisClient,
}: ShutdownDeps) => {
  logger.info('🛑 Gracefully shutting down...');
  await disconnectKafkaProducer();
  await redisClient.disconnect();
  await prisma.$disconnect();
  process.exit(0);
};
