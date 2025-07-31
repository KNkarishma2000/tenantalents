import { PresignedUrlOptions } from './minio-types';
export declare function getPresignedUrl({ bucketName, objectName, expirySeconds, }: PresignedUrlOptions): Promise<string>;
