import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { connectRedis, redisClient } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';
import { minioClient } from '@shared/minio';
import { config } from '@shared/config'; // Optional: for centralized config
import { SERVICE_NAMES, SERVICE_PORTS } from '@shared/constants';

// 🛠️ Load environment variables early

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

// 🎯 Service ID
const SERVICE_NAME = SERVICE_NAMES.EMAIL;
const PORT = SERVICE_PORTS[SERVICE_NAME];

// 🛢️ Prisma client
const prisma = new PrismaClient();

// 📨 Kafka config
const kafkaConfig: KafkaConsumerConfig = {
  groupId: SERVICE_NAME,
  topics: [], // Future: Add email-related topics like EMAIL_SENT
};

// 📨 Kafka message handler stub
const onMessage = async (_topic: string, _payload: unknown): Promise<void> => {
  logger.warn(`⚠️ No Kafka consumer logic implemented in ${SERVICE_NAME}`);
};

const kafkaMessageHandler = async (rawMessage: string): Promise<void> => {
  try {
    const { topic, payload } = JSON.parse(rawMessage);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to handle Kafka message', err);
  }
};

// 🚀 Start the service
let server: ReturnType<typeof app.listen> | null = null;

async function start() {
  try {
    logger.info(`📨 Starting ${SERVICE_NAME}...`);

    await connectRedis();
    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    await prisma.$connect();

    const bucket = process.env.MINIO_BUCKET || 'email-files';
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
      await minioClient.makeBucket(bucket);
      logger.info(`🪣 MinIO bucket "${bucket}" created`);
    } else {
      logger.info(`✅ MinIO bucket "${bucket}" already exists`);
    }

    server = app.listen(PORT, () => {
      logger.info(`🚀 ${SERVICE_NAME} running at http://localhost:${PORT}`);
      logger.info(`📚 Swagger docs at http://localhost:${PORT}/api/docs/email`);
    });
  } catch (err) {
    logger.error(`❌ ${SERVICE_NAME} failed to start`, err);
    await shutdown();
    process.exit(1);
  }
}

// 🧹 Graceful shutdown
async function shutdown() {
  logger.info(`🛑 Shutting down ${SERVICE_NAME}...`);

  try {
    await prisma.$disconnect();

   if (typeof redisClient.status === 'string' && redisClient.status === 'ready') {
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

// 🪝 Process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// 🔥 Launch
start();
