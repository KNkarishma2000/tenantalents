import { UploadFileOptions } from './minio-types';
/**
 * Uploads a file to MinIO with correct metadata and returns the public URL.
 */
export declare function uploadFileToMinIO({ bucketName, objectName, content, contentType, }: UploadFileOptions): Promise<string>;
