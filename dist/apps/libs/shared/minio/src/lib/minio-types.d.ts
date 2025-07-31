export interface UploadFileOptions {
    bucketName: string;
    objectName: string;
    content: Buffer;
    contentType: string;
}
export interface PresignedUrlOptions {
    bucketName: string;
    objectName: string;
    expirySeconds?: number;
}
