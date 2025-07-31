import { connectKafkaConsumer } from '@shared/middlewares/kafka/src/lib/kafka-consumer';
import { KafkaConsumerConfig } from '@shared/middlewares/kafka/src/lib/kafka-consumer';
import { EachMessagePayload } from 'kafkajs';
import { generateInvoiceAndUpload } from '../../../../../libs/shared/utils/src/lib/invoice-generator';
import { prisma } from '@prisma';
import { MinioBuckets } from '@shared/minio';
import { logger } from '@shared/logger';

export async function startInvoiceConsumer(): Promise<void> {
  const config: KafkaConsumerConfig = {
    groupId: 'invoice-service-group',
    topics: ['invoice.generate'],
    handleMessage: async (topic: string, payload: EachMessagePayload) => {
      try {
        const message = payload.message.value?.toString();
        const { orderId } = JSON.parse(message || '{}');

        if (!orderId) {
          logger.warn(`[invoice.generate] ⚠️ Missing orderId`);
          return;
        }

        logger.info(
          `[invoice.generate] 📦 Generating invoice for orderId: ${orderId}`
        );
        const filePath = await generateInvoiceAndUpload(orderId);

        await prisma.invoice.create({
          data: {
            orderId,
            filePath,
            bucket: MinioBuckets.INVOICE,
            createdAt: new Date(),
          },
        });

        logger.info(`[invoice.generate] ✅ Invoice stored: ${filePath}`);
      } catch (err) {
        logger.error(`[invoice.generate] ❌ Failed to process message:`, err);
      }
    },
  };

  await connectKafkaConsumer(config);
}
