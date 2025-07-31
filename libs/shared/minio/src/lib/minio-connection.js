"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMinio = connectMinio;
exports.disconnectMinio = disconnectMinio;
const minio_client_1 = __importDefault(require("./minio-client"));
const logger_1 = require("@shared/logger");
async function connectMinio() {
    try {
        // This simply verifies connection by checking a bucket, or you can ping the server
        const bucket = 'vendor-files';
        const exists = await minio_client_1.default.bucketExists(bucket);
        if (!exists) {
            await minio_client_1.default.makeBucket(bucket, 'us-east-1');
            logger_1.logger.info(`✅ Created bucket: ${bucket}`);
        }
        else {
            logger_1.logger.info(`ℹ️ Bucket already exists: ${bucket}`);
        }
    }
    catch (err) {
        logger_1.logger.error('❌ Error connecting to MinIO', err);
        throw err;
    }
}
// MinIO client does not need explicit disconnect, but provide a stub for symmetry
async function disconnectMinio() {
    logger_1.logger.info('ℹ️ MinIO client disconnect called (no-op)');
    // No actual disconnect method in MinIO SDK
}
//# sourceMappingURL=minio-connection.js.map