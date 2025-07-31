"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
exports.disconnectRedis = disconnectRedis;
const redis_1 = require("redis");
const logger_1 = require("@shared/logger");
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    },
    password: process.env.REDIS_PASSWORD || undefined,
});
async function connectRedis() {
    exports.redisClient.on('error', (err) => logger_1.logger.error('❌ Redis Error:', err));
    await exports.redisClient.connect();
    logger_1.logger.info('✅ Redis connected');
}
async function disconnectRedis() {
    await exports.redisClient.quit();
    logger_1.logger.info('🔌 Redis disconnected');
}
//# sourceMappingURL=redis.js.map