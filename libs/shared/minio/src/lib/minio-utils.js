"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureBucketExists = ensureBucketExists;
exports.uploadFile = uploadFile;
exports.getFile = getFile;
const minio_client_1 = __importDefault(require("./minio-client"));
async function ensureBucketExists(bucket) {
    const exists = await minio_client_1.default.bucketExists(bucket);
    if (!exists) {
        await minio_client_1.default.makeBucket(bucket, 'us-east-1');
        console.log(`✅ Created bucket: ${bucket}`);
    }
}
async function uploadFile(bucket, objectName, filePath, metaData = {}) {
    return minio_client_1.default.fPutObject(bucket, objectName, filePath, metaData);
}
async function getFile(bucket, objectName) {
    return minio_client_1.default.getObject(bucket, objectName);
}
//# sourceMappingURL=minio-utils.js.map