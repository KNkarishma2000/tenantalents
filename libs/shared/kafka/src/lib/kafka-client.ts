import { Kafka, KafkaConfig, Consumer } from 'kafkajs';

let kafka: Kafka | null = null;
let consumer: Consumer | null = null;

export const initKafka = (config: KafkaConfig): void => {
  kafka = new Kafka(config);
};

export const getKafkaInstance = (): Kafka => {
  if (!kafka) {
    throw new Error('Kafka is not initialized. Call initKafka() first.');
  }
  return kafka;
};

export const setKafkaConsumer = (instance: Consumer) => {
  consumer = instance;
};

export const getKafkaConsumer = (): Consumer => {
  if (!consumer) {
    throw new Error('Kafka consumer is not initialized');
  }
  return consumer;
};

