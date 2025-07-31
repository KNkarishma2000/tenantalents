export enum RedisKey {
  USER_PROFILE = 'user:profile:',
  PRODUCT_DETAIL = 'product:detail:',
  ORDER_SUMMARY = 'order:summary:',
  CART_CONTENT = 'cart:content:',
  RATING_SUMMARY = 'rating:summary:',
}

export const DEFAULT_TTL = 60 * 60; // 1 hour
