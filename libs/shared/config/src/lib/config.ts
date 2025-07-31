import { env } from './env';

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  serviceName: env.SERVICE_NAME || 'unknown-service', // ✅ Added serviceName with fallback

  postgres: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    db: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
  },

  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },

  kafka: {
    broker: env.KAFKA_BROKER,
    clientId: env.KAFKA_CLIENT_ID,
    groupId: env.KAFKA_GROUP_ID,
  },

  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.EMAIL_FROM,
  },

  jwt: {
    secret: env.JWT_SECRET,
  },

  minio: {
    endpoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    bucketName: env.MINIO_BUCKET_NAME,
  },

  imagekit: {
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
  },
};
