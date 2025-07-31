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
import { logger } from '@shared/logger';
import { config } from '@shared/config';
import { SERVICE_PORTS, SERVICE_NAMES } from '@shared/constants';

// 🎛️ Service-specific configuration
const SERVICE_NAME = SERVICE_NAMES.CART;
const PORT = SERVICE_PORTS[SERVICE_NAME];

const prisma = new PrismaClient();

// 🎯 Kafka consumer config (cart-service is producer-only for now)
const kafkaConfig: KafkaConsumerConfig = {
  groupId: SERVICE_NAME,
  topics: [], // No subscribed topics currently
};

// 📨 Kafka message handler stub
const onMessage = async (_topic: string, _payload: unknown): Promise<void> => {
  logger.warn(`⚠️ No Kafka consumer logic implemented in ${SERVICE_NAME}`);
};

const kafkaMessageHandler = async (rawMessage: string): Promise<void> => {
  if (!kafkaConfig.topics.length) return; // 🧠 Skip handler in producer-only mode

  try {
    const { topic, payload } = JSON.parse(rawMessage);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to handle Kafka message', err);
  }
};

// 🚀 Bootstrapping the service
let server: ReturnType<typeof app.listen> | null = null;

async function start() {
  try {
    logger.info(`🧠 Starting ${SERVICE_NAME}...`);

    // 🔐 Ensure critical env vars are present
    if (!config.JWT_SECRET) {
      throw new Error('Missing required JWT_SECRET in environment');
    }

    await connectRedis();
    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);

    server = app.listen(PORT, () => {
      logger.info(`🚀 ${SERVICE_NAME} running at http://localhost:${PORT}`);
      logger.info(
        `🩺 Healthcheck available at http://localhost:${PORT}/healthz`
      );
    });
  } catch (err) {
    logger.error(`❌ ${SERVICE_NAME} startup failed`, err);
    await shutdown();
    process.exit(1);
  }
}

// 🧹 Graceful shutdown logic
async function shutdown() {
  logger.info(`🛑 Shutting down ${SERVICE_NAME}...`);

  try {
    await prisma.$disconnect();

    if ('status' in redisClient && redisClient.status === 'ready') {
      await redisClient.quit();
    }

    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();

    if (server) {
      await new Promise((resolve, reject) => {
        server!.close((err) => {
          if (err) {
            logger.error('❌ Error closing HTTP server', err);
            reject(err);
          } else {
            logger.info('✅ HTTP server closed');
            resolve(true);
          }
        });
      });
    }

    process.exit(0);
  } catch (err) {
    logger.error('❌ Error during shutdown', err);
    process.exit(1);
  }
}

// 📦 Hook into OS-level process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// 🟢 Start the service
start();
