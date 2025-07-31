import minioClient from './minio-client';
export async function ensureBucketExists(bucket) {
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
        await minioClient.makeBucket(bucket, 'us-east-1');
        console.log(`✅ Created bucket: ${bucket}`);
    }
}
export async function uploadFile(bucket, objectName, filePath, metaData = {}) {
    return minioClient.fPutObject(bucket, objectName, filePath, metaData);
}
export async function getFile(bucket, objectName) {
    return minioClient.getObject(bucket, objectName);
}
//# sourceMappingURL=minio-utils.js.map