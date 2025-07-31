import { env } from './env';

export const imageKitConfig = {
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT || '',
  publicKey: env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: env.IMAGEKIT_PRIVATE_KEY || '',
};
