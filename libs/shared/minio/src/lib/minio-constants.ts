/**
 * 🪣 MinIO Buckets used in the MVP E-Commerce Platform
 * Each microservice can own or use one or more of these buckets.
 */
export const MinioBuckets = {
  USER: 'user-files',
  PRODUCT: 'product-files',
  RATING: 'rating-files',
  EMAIL: 'email-files',
  INVOICE: 'invoice-files',
  VENDOR: 'vendor-files',
  CMS: 'cms-files',
} as const;

/**
 * 📁 Folder paths within each bucket (virtual directories)
 * Use consistent prefixes to avoid naming collisions
 */
export const MinioFolderPaths = {
  USER_AVATARS: 'users/avatars/',
  USER_DOCS: 'users/documents/',
  PRODUCT_IMAGES: 'products/images/',
  RATING_IMAGES: 'ratings/images/',
  EMAIL_ATTACHMENTS: 'emails/attachments/',
  INVOICE_PDFS: 'invoices/pdf/',
  VENDOR_KYC_DOCS: 'vendors/kyc/',
  CMS_STATIC: 'cms/static/',
} as const;

/**
 * ⏳ Default expiry time (in seconds) for pre-signed URLs
 */
export const DEFAULT_EXPIRY_SECONDS = 3600; // 1 hour

/**
 * 🎯 Strictly typed bucket name type for safer usage in app code
 */
export type BucketName = (typeof MinioBuckets)[keyof typeof MinioBuckets];

/**
 * 📦 MIME type mappings for file uploads (used with Content-Type headers)
 */
export const MimeTypes = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  WEBP: 'image/webp',
  PDF: 'application/pdf',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ZIP: 'application/zip',
} as const;
