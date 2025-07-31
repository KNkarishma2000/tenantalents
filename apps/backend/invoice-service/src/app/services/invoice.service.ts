import PDFDocument from 'pdfkit';
import { minioClient } from '@shared/minio';
import { prisma } from '../../prisma'; // Adjust path if you're not using @shared/prisma
import { Readable } from 'stream';

const bucket = process.env.MINIO_BUCKET || 'invoices';

export const invoiceService = {
  generateInvoicePDF: async (orderData: {
    orderId: string;
    userId: string;
    buyerEmail: string;
    items: { name: string; price: number; quantity: number }[];
    total: number;
  }): Promise<void> => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    return new Promise<void>((resolve, reject) => {
      doc.text('🧾 MVP Shop Invoice', { align: 'center' });
      doc.text(`Order ID: ${orderData.orderId}`);
      doc.text(`Buyer: ${orderData.buyerEmail}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      orderData.items.forEach((item) => {
        doc.text(`${item.name} - ₹${item.price} x ${item.quantity}`);
      });

      doc.text(`\nTotal: ₹${orderData.total}`, { align: 'right' });

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const objectName = `invoices/${orderData.userId}/${orderData.orderId}.pdf`;

          await minioClient.putObject(bucket, objectName, buffer);

          await prisma.invoice.create({
            data: {
              orderId: orderData.orderId,
              fileUrl: objectName,
              userId: orderData.userId,
            },
          });

          resolve();
        } catch (err) {
          reject(err);
        }
      });

      doc.end();
    });
  },

  getInvoiceFile: async (
    userId: string,
    orderId: string
  ): Promise<Readable> => {
    const objectName = `invoices/${userId}/${orderId}.pdf`;
    const stream = await minioClient.getObject(bucket, objectName);
    return stream as Readable;
  },
};
