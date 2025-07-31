import dotenv from 'dotenv';
import path from 'path';
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

// 🧪 Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = Number(process.env.PORT) || 3005;
const prisma = new PrismaClient();

// 🧵 Kafka consumer config
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'payment-service',
  topics: ['order.placed', 'payment.requested'], // Add actual topics used in your platform
};

// 📨 Kafka message handler
async function kafkaMessageHandler(message: string): Promise<void> {
  logger.info(`[Kafka] 🎯 Received message: ${message}`);

  try {
    const event = JSON.parse(message);

    switch (event.type) {
      case 'payment.requested':
        logger.info('💰 Processing payment request...');
        // TODO: implement payment request handling
        break;

      case 'order.placed':
        logger.info('🧾 Order placed event received...');
        // TODO: maybe prepare for payment, send confirmation, etc.
        break;

      default:
        logger.warn(`⚠️ Unknown event type: ${event.type}`);
    }
  } catch (err) {
    logger.error('❌ Failed to parse Kafka message:', err);
  }
}

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start the service
async function start() {
  try {
    logger.info('🚀 Starting Payment Service...');

    // Connect Redis
    await connectRedis();
    logger.info('✅ Redis connected');

    // Connect PostgreSQL
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    // Connect Kafka
    await connectKafkaProducer();
    logger.info('✅ Kafka producer ready');

    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka consumer subscribed');

    // Start HTTP server
    server = app.listen(PORT, () => {
      logger.info(`💳 Payment Service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Error during startup:', err);
    await shutdown(1);
  }
}

// 🛑 Graceful shutdown
async function shutdown(code = 0) {
  logger.info('🛑 Shutting down Payment Service...');

  try {
    await prisma.$disconnect();

    if (redisClient.status === 'ready') {
      await redisClient.quit();
      logger.info('✅ Redis disconnected');
    }

    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();

    if (server) {
      server.close(() => {
        logger.info('✅ HTTP server closed');
        process.exit(code);
      });
    } else {
      process.exit(code);
    }
  } catch (err) {
    logger.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// 🧯 OS signal listeners
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// 🔥 Boot the service
start();
