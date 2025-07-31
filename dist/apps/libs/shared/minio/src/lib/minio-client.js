import { Client } from 'minio';
export const minioClient = new Client({
    endPoint: process.env['MINIO_ENDPOINT'],
    port: parseInt(process.env['MINIO_PORT'], 10),
    useSSL: false,
    accessKey: process.env['MINIO_ACCESS_KEY'],
    secretKey: process.env['MINIO_SECRET_KEY'],
});
export default minioClient;
// npm install minio
// npm install --save-dev @types/minio
//# sourceMappingURL=minio-client.js.map