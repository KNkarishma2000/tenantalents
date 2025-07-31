import { SentinelAddress } from 'ioredis';
export interface RedisClientOptions {
    sentinel?: {
        enabled: boolean;
        sentinels: SentinelAddress[];
        name: string;
    };
    host?: string;
    port?: number;
    password?: string;
    db?: number;
}
