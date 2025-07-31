import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { minioClient } from '@shared/minio';
import { MinioBuckets, MINIO_FOLDER_PATHS } from '@shared/minio/constants';

const prisma = new PrismaClient();

export const productService = {
  /**
   * 📦 Create a new product
   */
  async createProduct(data: any, createdBy: string) {
    return prisma.product.create({
      data: {
        ...data,
        createdBy,
      },
    });
  },

  /**
   * 📦 Get all products
   */
  async getAllProducts() {
    return prisma.product.findMany();
  },

  /**
   * 🔍 Get product by ID
   */
  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  /**
   * 🛠️ Update product details
   */
  async updateProduct(id: string, data: any, updatedBy: string) {
    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    });
  },

  /**
   * ❌ Delete product
   */
  async deleteProduct(id: string, deletedBy: string) {
    // Optionally record audit info here
    return prisma.product.delete({
      where: { id },
    });
  },

  /**
   * 🖼️ Upload product image to MinIO
   */
  async uploadProductImage(productId: string, imageBase64: string) {
    const buffer = Buffer.from(imageBase64, 'base64');
    const objectName = `${
      MINIO_FOLDER_PATHS.PRODUCT_IMAGES
    }${productId}-${uuid()}.png`;

    await minioClient.putObject(MinioBuckets.PRODUCT, objectName, buffer, {
      'Content-Type': 'image/png',
    });

    return {
      bucket: MinioBuckets.PRODUCT,
      key: objectName,
      url: `${process.env.MINIO_URL}/${MinioBuckets.PRODUCT}/${objectName}`,
    };
  },
};
