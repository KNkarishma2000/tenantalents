import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { KafkaMessage, EachMessagePayload } from 'kafkajs';

// 🧱 Shared Libraries
import '@shared/config/src/lib/env';
import { env } from '@shared/config';
import { logger } from '@shared/logger';
import { connectRedis, redisClient } from '@shared/redis';
import { Consumer } from 'kafkajs';
import {
  getKafkaConsumer,
  disconnectKafkaConsumer,
  disconnectKafkaProducer,
} from '@shared/kafka';



import { errorHandler, notFoundHandler } from '@shared/error';
import { setupSwagger } from '@shared/swagger';
import { authMiddleware } from '@shared/auth';
import { ApiError } from '@shared/error';

const app = express();
let kafkaConsumer: Consumer | null = null;
let server: ReturnType<typeof app.listen> | null = null;
let isShuttingDown = false;

// 🌐 Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// 🔐 Protected Test Route
app.get('/api/secure', authMiddleware(), (_req, res) => {
  res.json({ message: '✅ Analytics route protected by auth' });
});

// 📄 Swagger Documentation
setupSwagger(app, {
  path: '/api/docs',
  title: 'Analytics Service',
  description: 'API docs for the analytics microservice',
  version: '1.0.0',
});

// ❓ 404 Handler
app.use(notFoundHandler);

// ❗ Error Handler
app.use(errorHandler);

// 📨 Kafka Message Handler
const handleKafkaMessage = async (topic: string, message: KafkaMessage) => {
  try {
    const key = message.key?.toString();
    const value = message.value?.toString();

    logger.info(`📨 Kafka: topic=${topic}, key=${key}, value=${value}`);

    const parsed = value ? JSON.parse(value) : null;

    if (topic === 'analytics-topic') {
      logger.info('📊 Handling analytics event:', parsed);
      // TODO: Store in DB, forward to BigQuery, etc.
    } else {
      logger.warn(`❓ No handler for topic "${topic}"`);
    }
  } catch (err) {
    logger.error(`❌ Failed to process Kafka message on topic "${topic}"`, err);
  }
};

// 🚀 Start App
async function start() {
  try {
    logger.info('🧪 Starting Analytics Service...');

    await connectRedis();
    logger.info('✅ Redis connected');

    kafkaConsumer = await getKafkaConsumer();

    // ✅ Use non-null assertion to silence TS18047
    await kafkaConsumer!.subscribe({
      topic: 'analytics-topic',
      fromBeginning: true,
    });

    await kafkaConsumer!.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        await handleKafkaMessage(topic, message);
      },
    });

    server = app.listen(env.PORT, () => {
      logger.info(
        `🚀 Analytics Service running on http://localhost:${env.PORT}`
      );
    });
  } catch (err) {
    logger.error('❌ App startup failed:', err);
    throw new ApiError(500, 'Internal server error during startup');
  }
}

// 🧹 Graceful Shutdown
async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info('🛑 Shutting down Analytics Service...');

  const shutdownTimeout = setTimeout(() => {
    logger.error('⏱ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);

  try {
    if (redisClient?.isOpen) {
    await redisClient.quit();
    logger.info('✅ Redis disconnected');
  }

  if (kafkaConsumer) {
    await disconnectKafkaConsumer();
    await disconnectKafkaProducer();
    logger.info('✅ Kafka disconnected');
  }

    if (server) {
      server.close(() => {
        logger.info('✅ HTTP server closed');
        clearTimeout(shutdownTimeout);
        process.exit(0);
      });
    } else {
      clearTimeout(shutdownTimeout);
      process.exit(0);
    }
  } catch (err) {
    logger.error('❌ Shutdown failed:', err);
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}

// 🛡 Signal & Exception Handling
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (error) => {
  logger.error('❌ Uncaught Exception:', error);
  shutdown();
});
process.on('unhandledRejection', (reason) => {
  logger.error('❌ Unhandled Rejection:', reason);
  shutdown();
});

// 🟢 Start
start();

export default app;
