import { minioClient } from './minio-client';
import { UploadFileOptions } from './minio-types';

/**
 * Uploads a file to MinIO with correct metadata and returns the public URL.
 */
export async function uploadFileToMinIO({
  bucketName,
  objectName,
  content,
  contentType,
}: UploadFileOptions): Promise<string> {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
  }

  await minioClient.putObject(bucketName, objectName, content, content.length, {
    'Content-Type': contentType,
  });

  // ✅ Return a public URL based on env variable (you must set it)
  return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
}
