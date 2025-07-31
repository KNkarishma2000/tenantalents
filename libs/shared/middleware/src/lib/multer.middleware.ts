import multer from 'multer';
import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';

// Use in-memory storage (you can replace this with disk or custom storage later)
const storage = multer.memoryStorage();

// Allowed MIME types for uploaded documents/images
const ALLOWED_MIME_TYPES = ['image/', 'application/'];

// Typed file filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const isAllowed = ALLOWED_MIME_TYPES.some((type) =>
    file.mimetype.startsWith(type)
  );

  if (!isAllowed) {
    return cb(new Error('Only image and document files are allowed'));
  }

  cb(null, true);
};

// Multer middleware export
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});
