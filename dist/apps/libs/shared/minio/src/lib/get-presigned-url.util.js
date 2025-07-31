import { minioClient } from './minio-client';
import { DEFAULT_EXPIRY_SECONDS } from './minio-constants';
export async function getPresignedUrl({ bucketName, objectName, expirySeconds = DEFAULT_EXPIRY_SECONDS, }) {
    return await minioClient.presignedGetObject(bucketName, objectName, expirySeconds);
}
//# sourceMappingURL=get-presigned-url.util.js.map