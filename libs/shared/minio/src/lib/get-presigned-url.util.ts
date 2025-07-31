import { minioClient } from './minio-client';
import { PresignedUrlOptions } from './minio-types';
import { DEFAULT_EXPIRY_SECONDS } from './minio-constants';

export async function getPresignedUrl({
  bucketName,
  objectName,
  expirySeconds = DEFAULT_EXPIRY_SECONDS,
}: PresignedUrlOptions): Promise<string> {
  return await minioClient.presignedGetObject(
    bucketName,
    objectName,
    expirySeconds
  );
}
