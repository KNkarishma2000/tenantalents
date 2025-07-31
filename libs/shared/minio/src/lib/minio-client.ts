import { Client, BucketItemFromList} from 'minio';

// ✅ Debug: Print env variables
console.log('📦 MinIO Environment Config:');
console.log('MINIO_ENDPOINT:', process.env.MINIO_ENDPOINT);
console.log('MINIO_PORT:', process.env.MINIO_PORT);
console.log('MINIO_ACCESS_KEY:', process.env.MINIO_ACCESS_KEY);
console.log('MINIO_SECRET_KEY:', process.env.MINIO_SECRET_KEY);

// ✅ Validate presence
const rawEndpoint = process.env.MINIO_ENDPOINT;
const rawPort = process.env.MINIO_PORT;

if (!rawEndpoint || !rawPort) {
  throw new Error('❌ MINIO_ENDPOINT or MINIO_PORT is not defined!');
}

// ✅ Strip protocol if included
const cleanedEndpoint = rawEndpoint.replace(/^https?:\/\//, '');
const port = parseInt(rawPort, 10);
if (isNaN(port)) {
  throw new Error(`❌ Invalid MINIO_PORT: ${rawPort}`);
}

// ✅ Build the client
export const minioClient = new Client({
  endPoint: cleanedEndpoint,
  port,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

// ✅ Optional: check connection at startup with async/await
(async () => {
  try {
    const buckets: BucketItemFromList[] = await minioClient.listBuckets();
    console.log('✅ Connected to MinIO. Buckets:', buckets);
  } catch (err) {
    console.error('❌ MinIO connection failed:', err);
  }
})();

export default minioClient;
