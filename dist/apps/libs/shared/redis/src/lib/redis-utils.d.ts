export declare const setCache: (key: string, value: unknown, ttlInSeconds?: number) => Promise<void>;
export declare const getCache: <T>(key: string) => Promise<T | null>;
export declare const delCache: (key: string) => Promise<void>;
