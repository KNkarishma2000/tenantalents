// ✅ Load environment variables from shared env loader
import '@shared/config/src/lib/env';

import app from './app';
import { PrismaClient } from '@prisma/client';
import { redisClient, connectRedis } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { env } from '@shared/config';
import { logger } from '@shared/logger';

const prisma = new PrismaClient();
const PORT = env.PORT || 3010;
const SERVICE_NAME = env.SERVICE_NAME;

// 🧠 Kafka Consumer Setup
const kafkaConfig: KafkaConsumerConfig = {
  groupId: SERVICE_NAME,
  topics: ['analytics-topic'], // Replace with KAFKA_TOPICS if needed
};

// 📨 Kafka Message Handler
const onMessage = async (
  topic: string,
  payload: Record<string, any>
): Promise<void> => {
  logger.info(`📩 Kafka: ${topic}`, payload);

  try {
    // Example DB insert (enable if needed):
    // await prisma.analyticsEvent.create({ data: { topic, payload: JSON.stringify(payload) } });
  } catch (err) {
    logger.error(`❌ Failed to process message from topic ${topic}`, err);
  }
};

// 🧾 Kafka Raw Message Wrapper
const kafkaMessageHandler = async (message: string): Promise<void> => {
  try {
    const { topic, payload } = JSON.parse(message);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to parse Kafka message', err);
  }
};

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Bootstrap Application
async function start() {
  try {
    if (!env.JWT_SECRET) {
      throw new Error('Missing env: JWT_SECRET');
    }

    logger.info(`🔧 Bootstrapping ${SERVICE_NAME}...`);

    await connectRedis();
    logger.info('✅ Redis connected');

    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka connected');

    server = app.listen(PORT, () => {
      logger.info(`🚀 ${SERVICE_NAME} running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Service startup failed:', err);
    await shutdown();
    process.exit(1);
  }
}

// 🧹 Graceful Shutdown Handler
async function shutdown() {
  logger.info('🛑 Initiating graceful shutdown...');

  try {
    await disconnectKafkaConsumer();
    await disconnectKafkaProducer();
    logger.info('✅ Kafka disconnected');

    if ((redisClient as any)?.isOpen) {
      await redisClient.quit();
      logger.info('✅ Redis disconnected');
    }

    await prisma.$disconnect();
    logger.info('✅ Prisma disconnected');

    if (server) {
      server.close(() => {
        logger.info('✅ HTTP server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    logger.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// 🧯 OS Signal Listeners
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// 🔧 Start the app
start();
