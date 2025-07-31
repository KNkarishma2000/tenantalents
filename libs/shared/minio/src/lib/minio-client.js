"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minioClient = void 0;
const minio_1 = require("minio");
exports.minioClient = new minio_1.Client({
    endPoint: process.env['MINIO_ENDPOINT'],
    port: parseInt(process.env['MINIO_PORT'], 10),
    useSSL: false,
    accessKey: process.env['MINIO_ACCESS_KEY'],
    secretKey: process.env['MINIO_SECRET_KEY'],
});
exports.default = exports.minioClient;
// npm install minio
// npm install --save-dev @types/minio
//# sourceMappingURL=minio-client.js.map