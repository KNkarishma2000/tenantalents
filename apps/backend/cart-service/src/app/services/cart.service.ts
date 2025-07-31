import { createRedisClient, setCache, getCache } from '@shared/redis';
import { connectKafkaProducer, KAFKA_TOPICS } from '@shared/kafka';
import { v4 as uuidv4 } from 'uuid';
import type { Producer } from 'kafkajs';

const CART_TTL = 60 * 60 * 2; // 2 hours in seconds

// Redis (Sentinel-aware)
const redisClient = createRedisClient();

let kafkaProducer: Producer | null = null;

async function getKafkaProducer(): Promise<Producer> {
  if (!kafkaProducer) {
    kafkaProducer = await connectKafkaProducer();
  }
  return kafkaProducer;
}

export const cartService = {
  /**
   * Get the cart for a user or guest session.
   */
  getCart: async (userId: string): Promise<any[]> => {
    const cacheKey = `cart:${userId}`;
    const cart = await getCache<any[]>(redisClient, cacheKey);
    return cart ?? [];
  },

  /**
   * Add an item to the user's or guest's cart.
   */
  addToCart: async (userId: string, item: any): Promise<any[]> => {
    const cacheKey = `cart:${userId}`;
    const cart = await cartService.getCart(userId);
    const updatedCart = [...cart, { ...item, id: uuidv4() }];

    await setCache(redisClient, cacheKey, updatedCart, CART_TTL);

    try {
      const producer = await getKafkaProducer();
      await producer.send({
        topic: KAFKA_TOPICS.CART_UPDATED,
        messages: [
          {
            value: JSON.stringify({ userId, cart: updatedCart }),
          },
        ],
      });
    } catch (err) {
      console.error('❌ Failed to send CART_UPDATED Kafka message:', err);
    }

    return updatedCart;
  },

  /**
   * Checkout the cart: clears from Redis and emits Kafka event.
   */
  checkout: async (
    userId: string
  ): Promise<{ status: string; cart: any[] }> => {
    const cacheKey = `cart:${userId}`;
    const cart = await cartService.getCart(userId);

    try {
      const producer = await getKafkaProducer();
      await producer.send({
        topic: KAFKA_TOPICS.CART_CHECKED_OUT,
        messages: [
          {
            value: JSON.stringify({ userId, cart }),
          },
        ],
      });
    } catch (err) {
      console.error('❌ Failed to send CART_CHECKED_OUT Kafka message:', err);
    }

    await redisClient.del(cacheKey);

    return {
      status: 'checked_out',
      cart,
    };
  },
};
