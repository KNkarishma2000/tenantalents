import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import {
  uploadFile,
  minioClient,
  MinioBuckets,
  MinioFolderPaths,
  MimeTypes,
} from '@shared/minio';

interface SaveInvoiceParams {
  filePath: string;
  userId: string;
  orderId: string;
}

/**
 * 🧾 Save an invoice PDF to MinIO storage
 */
export const saveInvoice = async ({
  filePath,
  userId,
  orderId,
}: SaveInvoiceParams): Promise<void> => {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`❌ Invoice file does not exist at: ${absolutePath}`);
  }

  const fileStream = fs.createReadStream(absolutePath);
  const stats = fs.statSync(absolutePath);
  const objectName = `${MinioFolderPaths.INVOICE_PDFS}${userId}/${orderId}.pdf`;

  try {
    const bucketExists = await minioClient.bucketExists(MinioBuckets.INVOICE);
    if (!bucketExists) {
      await minioClient.makeBucket(MinioBuckets.INVOICE);
    }
await uploadFile(
  MinioBuckets.INVOICE,
  objectName,
  absolutePath,
  { 'Content-Type': MimeTypes.PDF }
);

    console.log(`✅ Uploaded invoice for order ${orderId} to MinIO`);
  } catch (error) {
    console.error(
      `❌ [saveInvoice] Error uploading invoice for order ${orderId}:`,
      error
    );
    throw error;
  }
};

/**
 * 📥 Retrieve an invoice PDF from MinIO as a readable stream
 */
export const getInvoiceFile = async (
  userId: string,
  orderId: string
): Promise<Readable> => {
  const objectName = `${MinioFolderPaths.INVOICE_PDFS}${userId}/${orderId}.pdf`;

  try {
    return await minioClient.getObject(MinioBuckets.INVOICE, objectName);
  } catch (error) {
    console.error(
      `❌ [getInvoiceFile] Failed to retrieve invoice for order ${orderId}:`,
      error
    );
    throw new Error(`Invoice not found for order ${orderId}`);
  }
};
