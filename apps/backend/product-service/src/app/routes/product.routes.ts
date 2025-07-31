import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../controllers/product.controller';
import { authenticateJWT, requireRole } from '@shared/auth';

const router = Router();

// 🛒 Create product (admin/seller)
router.post(
  '/',
  authenticateJWT,
  requireRole(['seller', 'admin', 'super_admin']),
  createProduct
);

// 📦 Get all products (public)
router.get('/', getAllProducts);

// 🔍 Get product by ID (public)
router.get('/:id', getProductById);

// 📝 Update product (admin/seller)
router.put(
  '/:id',
  authenticateJWT,
  requireRole(['seller', 'admin', 'super_admin']),
  updateProduct
);

// ❌ Delete product (admin/seller)
router.delete(
  '/:id',
  authenticateJWT,
  requireRole(['seller', 'admin', 'super_admin']),
  deleteProduct
);

// 🖼️ Upload product image to MinIO
router.post(
  '/:id/image',
  authenticateJWT,
  requireRole(['seller', 'admin', 'super_admin']),
  uploadProductImage
);

export default router;
