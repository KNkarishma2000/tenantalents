export declare function ensureBucketExists(bucket: string): Promise<void>;
export declare function uploadFile(bucket: string, objectName: string, filePath: string, metaData?: Record<string, string>): Promise<import("minio/dist/main/internal/type").UploadedObjectInfo>;
export declare function getFile(bucket: string, objectName: string): Promise<import("stream").Readable>;
//# sourceMappingURL=minio-utils.d.ts.map