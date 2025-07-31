import helmet, { HelmetOptions } from 'helmet';

/**
 * Helmet middleware with sensible defaults.
 * You can override or add options as needed.
 */
const options: HelmetOptions = {
  contentSecurityPolicy: false, // disable CSP if frontend hosts scripts from multiple domains
  crossOriginEmbedderPolicy: false, // disable if using 3rd-party iframes (e.g., Stripe)
};

export const helmetMiddleware = helmet(options);
