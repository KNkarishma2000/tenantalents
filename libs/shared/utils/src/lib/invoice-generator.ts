import PDFDocument from 'pdfkit';
import stream from 'stream';
import { logger } from '@shared/logger';
import {
  uploadFileToMinIO,
  MinioFolderPaths,
  MinioBuckets,
  generateFilename,
} from '@shared/minio';

export async function generateInvoiceAndUpload(
  orderId: string
): Promise<string> {
  const fileName = generateFilename(`invoice-${orderId}`, '.pdf');
  const objectName = `${MinioFolderPaths.INVOICE_PDFS}${fileName}`;
  const bucket = MinioBuckets.INVOICE;

  const doc = new PDFDocument();
  const bufferStream = new stream.PassThrough();
  const chunks: Buffer[] = [];

  doc.pipe(bufferStream);
  doc.fontSize(20).text(`🧾 Invoice #${orderId}`, { underline: true });
  doc.moveDown().text('📦 Thank you for your order!');
  doc.end();

  bufferStream.on('data', (chunk) => chunks.push(chunk));

  return new Promise((resolve, reject) => {
    bufferStream.on('end', async () => {
      try {
        const finalBuffer = Buffer.concat(chunks);

        await uploadFileToMinIO({
          bucketName: bucket,
          objectName,
          content: finalBuffer,
          contentType: 'application/pdf',
        });

        resolve(objectName);
      } catch (err) {
        logger.error(`[invoice-generator] ❌ Failed to upload invoice:`, err);
        reject(err);
      }
    });

    bufferStream.on('error', (err) => {
      logger.error(`[invoice-generator] ❌ Stream error:`, err);
      reject(err);
    });
  });
}
