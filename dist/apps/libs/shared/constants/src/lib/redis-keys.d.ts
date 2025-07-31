export declare const REDIS_KEYS: {
    otp: (identifier: string) => string;
    cart: (userIdOrSessionId: string) => string;
};
