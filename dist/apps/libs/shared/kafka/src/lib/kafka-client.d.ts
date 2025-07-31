import { Kafka, KafkaConfig, Consumer } from 'kafkajs';
export declare const initKafka: (config: KafkaConfig) => void;
export declare const getKafkaInstance: () => Kafka;
export declare const setKafkaConsumer: (instance: Consumer) => void;
export declare const getKafkaConsumer: () => Consumer;
