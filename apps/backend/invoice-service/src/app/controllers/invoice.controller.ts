import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateInvoiceAndUpload } from '@shared/utils';
import { getPresignedUrl } from '@shared/minio'; // ✅ Corrected import

const prisma = new PrismaClient();

/**
 * Generate an invoice and upload PDF to MinIO.
 * Associates it with order and vendor.
 */
export async function manualInvoiceGeneration(req: Request, res: Response) {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            vendor: true,
          },
        },
        invoice: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.invoice) {
      return res
        .status(409)
        .json({ error: 'Invoice already exists for this order' });
    }

    const vendorId = order.items[0]?.sellerId;
    if (!vendorId) {
      return res
        .status(400)
        .json({ error: 'No vendor associated with order items' });
    }

    const filePath = await generateInvoiceAndUpload(orderId);
    const bucket = 'invoices';

    const invoice = await prisma.invoice.create({
      data: {
        orderId,
        vendorId,
        pdfUrl: '', // You could optionally store signed URL here
        filePath,
        bucket,
      },
    });

    return res.status(201).json({ message: 'Invoice generated', invoice });
  } catch (err) {
    console.error('Error generating invoice:', err);
    return res.status(500).json({ error: 'Failed to generate invoice' });
  }
}

/**
 * Get signed URL from MinIO for invoice PDF download.
 */
export async function getInvoiceDownloadUrl(req: Request, res: Response) {
  const { invoiceId } = req.params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice || !invoice.filePath || !invoice.bucket) {
      return res
        .status(404)
        .json({ error: 'Invoice not found or file data missing' });
    }

    const signedUrl = await getPresignedUrl({
      bucketName: invoice.bucket,
      objectName: invoice.filePath,
    });

    return res.json({ signedUrl });
  } catch (err) {
    console.error('Error getting signed URL:', err);
    return res.status(500).json({ error: 'Failed to get download URL' });
  }
}
