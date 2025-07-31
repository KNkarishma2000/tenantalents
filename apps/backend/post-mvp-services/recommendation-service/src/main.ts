import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { connectRedis, disconnectRedis, redisClient } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';

// 🌍 Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 3013;
const prisma = new PrismaClient();

// 📨 Kafka consumer config
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'recommendation-service',
  topics: [], // TODO: Add relevant topics (e.g., 'user-behavior-updated')
};

// 🧠 Kafka message handler
const onMessage = async (topic: string, payload: any) => {
  try {
    logger.info(
      `[Kafka] Recommendation Service received topic: ${topic}`,
      payload
    );
    // TODO: Implement business logic here
  } catch (err) {
    logger.error(`❌ Error handling Kafka topic ${topic}:`, err);
  }
};

const kafkaMessageHandler = async (message: string) => {
  try {
    const { topic, payload } = JSON.parse(message);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to parse or handle Kafka message:', err);
  }
};

let server: ReturnType<typeof app.listen> | null = null;

async function start() {
  try {
    await connectRedis();
    await connectKafkaProducer();
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);

    server = app.listen(PORT, () => {
      logger.info(
        `🚀 Recommendation Service running at http://localhost:${PORT}`
      );
      logger.info(
        `📚 Swagger docs at http://localhost:${PORT}/api/docs/recommendation`
      );
    });
  } catch (err) {
    logger.error('❌ Failed to start Recommendation Service:', err);
    await shutdown();
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('🛑 Shutting down Recommendation Service...');
  try {
    await prisma.$disconnect();

    if (redisClient.isOpen) {
      await disconnectRedis();
    }

    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();

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

// Graceful shutdown handlers
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start service
start();
