import { createRedisClient } from '@shared/redis';

const redisClient = createRedisClient();

type SearchParams = {
  query?: string;
  category?: string;
  brand?: string;
};

export const searchService = {
  /**
   * Index product into Redis hash
   * @param product Product object to index
   */
  indexProduct: async (product: Record<string, any>): Promise<void> => {
    const key = `product:${product.id}`;

    // Redis only accepts string values, so convert product fields to strings
    const productStringMap: Record<string, string> = {};
    for (const [k, v] of Object.entries(product)) {
      productStringMap[k] = String(v);
    }

    await redisClient.hset(key, productStringMap);
    // Optionally set a TTL: await redisClient.expire(key, 60 * 60); // 1 hour
  },

  /**
   * Search indexed products using filters
   * @param params SearchParams (query, category, brand)
   * @returns Filtered products
   */
  search: async (params: SearchParams): Promise<Record<string, string>[]> => {
    const keys = await redisClient.keys('product:*');
    const products = await Promise.all(
      keys.map((key) => redisClient.hgetall(key))
    );

    return products.filter((p: Record<string, string>) => {
      const name = p.name?.toLowerCase() || '';
      const matchesQuery =
        !params.query || name.includes(params.query.toLowerCase());

      const matchesCategory =
        !params.category || p.category === params.category;
      const matchesBrand = !params.brand || p.brand === params.brand;

      return matchesQuery && matchesCategory && matchesBrand;
    });
  },
};
