/**
 * 🪣 MinIO Buckets used in the MVP E-Commerce Platform
 * Each microservice can own or use one or more of these buckets.
 */
export declare const MinioBuckets: {
    readonly USER: "user-files";
    readonly PRODUCT: "product-files";
    readonly RATING: "rating-files";
    readonly EMAIL: "email-files";
    readonly INVOICE: "invoice-files";
    readonly VENDOR: "vendor-files";
    readonly CMS: "cms-files";
};
/**
 * 📁 Folder paths within each bucket (virtual directories)
 * Use consistent prefixes to avoid naming collisions
 */
export declare const MinioFolderPaths: {
    readonly USER_AVATARS: "users/avatars/";
    readonly USER_DOCS: "users/documents/";
    readonly PRODUCT_IMAGES: "products/images/";
    readonly RATING_IMAGES: "ratings/images/";
    readonly EMAIL_ATTACHMENTS: "emails/attachments/";
    readonly INVOICE_PDFS: "invoices/pdf/";
    readonly VENDOR_KYC_DOCS: "vendors/kyc/";
    readonly CMS_STATIC: "cms/static/";
};
/**
 * ⏳ Default expiry time (in seconds) for pre-signed URLs
 */
export declare const DEFAULT_EXPIRY_SECONDS = 3600;
/**
 * 🎯 Strictly typed bucket name type for safer usage in app code
 */
export type BucketName = (typeof MinioBuckets)[keyof typeof MinioBuckets];
/**
 * 📦 MIME type mappings for file uploads (used with Content-Type headers)
 */
export declare const MimeTypes: {
    readonly JPEG: "image/jpeg";
    readonly PNG: "image/png";
    readonly WEBP: "image/webp";
    readonly PDF: "application/pdf";
    readonly DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    readonly ZIP: "application/zip";
};
//# sourceMappingURL=minio-constants.d.ts.map