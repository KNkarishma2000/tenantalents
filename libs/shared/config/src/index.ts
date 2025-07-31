export * from './lib/env';
export * from './lib/postgres';
export * from './lib/redis';
export * from './lib/kafka';
export * from './lib/jwt';
export * from './lib/smtp';
export * from './lib/minio';
export * from './lib/imagekit';
export * from './lib/types';
export * from './lib/config';

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',

  service: {
    port: Number(process.env.PORT) || 3000,
  },

  // other config properties here
};
