import minioClient from './minio-client';

export async function ensureBucketExists(bucket: string) {
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, 'us-east-1');
    console.log(`✅ Created bucket: ${bucket}`);
  }
}

export async function uploadFile(
  bucket: string,
  objectName: string,
  filePath: string,
  metaData: Record<string, string> = {}
) {
  return minioClient.fPutObject(bucket, objectName, filePath, metaData);
}

export async function getFile(bucket: string, objectName: string) {
  return minioClient.getObject(bucket, objectName);
}
