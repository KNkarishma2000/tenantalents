import { env } from './env';

export const kafkaConfig = {
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKER.split(','), // Support comma-separated brokers
  groupId: env.KAFKA_GROUP_ID,
};

export const kafkaTopics = {
  userRegisteredEmail: 'user.registration.email',
  userRegisteredOTP: 'user.registration.otp',
  invoiceGenerated: 'invoice.generate',
  // Add more topics as needed
};
