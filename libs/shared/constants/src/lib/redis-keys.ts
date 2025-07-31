export const REDIS_KEYS = {
  otp: (identifier: string) => `otp:${identifier}`,
  cart: (userIdOrSessionId: string) => `cart:${userIdOrSessionId}`,
};
