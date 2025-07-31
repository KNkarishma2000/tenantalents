"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = getPresignedUrl;
const minio_client_1 = require("./minio-client");
const minio_constants_1 = require("./minio-constants");
async function getPresignedUrl({ bucketName, objectName, expirySeconds = minio_constants_1.DEFAULT_EXPIRY_SECONDS, }) {
    return await minio_client_1.minioClient.presignedGetObject(bucketName, objectName, expirySeconds);
}
//# sourceMappingURL=get-presigned-url.util.js.map