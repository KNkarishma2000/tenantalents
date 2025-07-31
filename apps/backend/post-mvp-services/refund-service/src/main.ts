import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { connectRedis, disconnectRedis } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';

// 🌍 Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 3012;
const prisma = new PrismaClient();

// 🎯 Kafka configuration
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'refund-service',
  topics: [], // TODO: Add refund-related topics like KAFKA_TOPICS.order.refunded
};

// 🔔 Kafka message handler
const onMessage = async (topic: string, payload: any): Promise<void> => {
  logger.info(`[Kafka] [${topic}] Received in Refund Service`, payload);
  // TODO: Implement refund-specific business logic here
};

const kafkaMessageHandler = async (message: string): Promise<void> => {
  try {
    const { topic, payload } = JSON.parse(message);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to parse Kafka message:', err);
  }
};

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start Refund Service
async function start() {
  try {
    await connectRedis();
    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);

    server = app.listen(PORT, () => {
      logger.info(`🚀 Refund Service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start Refund Service:', err);
    await shutdown();
    process.exit(1);
  }
}

// 🧼 Graceful shutdown
async function shutdown() {
  logger.info('🛑 Shutting down Refund Service...');
  try {
    await prisma.$disconnect();
    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();
    await disconnectRedis();

    if (server) {
      server.close(() => {
        logger.info('✅ Server closed gracefully');
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

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
