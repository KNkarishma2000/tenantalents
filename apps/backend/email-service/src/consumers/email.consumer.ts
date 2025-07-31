import { connectKafkaConsumer } from '@shared/kafka';
import { sendEmail, EmailPayload } from '@shared/email';
import { logger } from '@shared/logger';

const topic = 'user.registration.email';

export const startEmailConsumer = async (): Promise<void> => {
  await connectKafkaConsumer(
    { groupId: 'email-service', topics: [topic] },
    async (message: string): Promise<void> => {  // <--- explicitly typed here
      try {
        const payload = JSON.parse(message) as EmailPayload;
        logger.info(`📥 [${topic}] Consuming email payload for ${payload.to}`);
        await sendEmail(payload);
        logger.info(`📧 Email sent to ${payload.to}`);
      } catch (err) {
        logger.error(`❌ Failed to process email message from topic "${topic}":`, err);
      }
    }
  );
};
