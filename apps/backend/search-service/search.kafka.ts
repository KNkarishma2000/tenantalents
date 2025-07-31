import { consumeKafkaEvent } from '@shared/kafka';
import { searchService } from './search.service';

export const startSearchConsumer = () => {
  consumeKafkaEvent(['product.updated'], async ({ topic, message }) => {
    const data = JSON.parse(message.value?.toString() || '{}');
    if (topic === 'product.updated') {
      await searchService.indexProduct(data);
    }
  });
};
