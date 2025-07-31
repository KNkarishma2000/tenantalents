import { Router } from 'express';
import multer from 'multer';

import {
  createVendor,
  updateVendor,
  getVendorById,
  getAllVendors,
  deleteVendor,
  uploadVendorDocuments,
  approveVendor,
  rejectVendor,
  getVendorAnalytics,
} from '../controllers/vendor-controller';

import { authMiddleware } from '@shared/auth';
import { UserRole } from '@shared/types';

const router = Router();

// Multer config: memory storage, file size limit, and basic type filtering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (req, file, cb) => {
    const isAccepted =
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('application/');
    if (!isAccepted) {
      return cb(new Error('Only images or documents are allowed'));
    }
    cb(null, true);
  },
});

// === Authenticated & Role-Based Vendor Routes ===

// Register a new vendor
router.post('/', authMiddleware(UserRole.SELLER), createVendor);

// Get all vendors (admin access)
router.get('/', authMiddleware(UserRole.ADMIN), getAllVendors);

// Get vendor by ID (any authenticated user)
router.get('/:id', authMiddleware(), getVendorById);

// Update vendor by ID
router.put('/:id', authMiddleware(UserRole.SELLER), updateVendor);

// Delete vendor by ID (admin only)
router.delete('/:id', authMiddleware(UserRole.ADMIN), deleteVendor);

// Upload vendor documents (authenticated seller)
router.post(
  '/:id/documents',
  authMiddleware(UserRole.SELLER),
  upload.array('documents'),
  uploadVendorDocuments
);

// Approve vendor (admin only)
router.patch('/:id/approve', authMiddleware(UserRole.ADMIN), approveVendor);

// Reject vendor (admin only)
router.patch('/:id/reject', authMiddleware(UserRole.ADMIN), rejectVendor);

// Vendor analytics (admin or seller)
router.get(
  '/:id/analytics',
  authMiddleware([UserRole.ADMIN, UserRole.SELLER]),
  getVendorAnalytics
);

export default router;
