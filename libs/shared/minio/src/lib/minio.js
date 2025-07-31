"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToMinIO = uploadFileToMinIO;
const minio_client_1 = require("./minio-client");
/**
 * Uploads a file to MinIO with correct metadata and returns the public URL.
 */
async function uploadFileToMinIO({ bucketName, objectName, content, contentType, }) {
    const exists = await minio_client_1.minioClient.bucketExists(bucketName);
    if (!exists) {
        await minio_client_1.minioClient.makeBucket(bucketName, 'us-east-1');
    }
    await minio_client_1.minioClient.putObject(bucketName, objectName, content, content.length, {
        'Content-Type': contentType,
    });
    // ✅ Return a public URL based on env variable (you must set it)
    return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
}
//# sourceMappingURL=minio.js.map