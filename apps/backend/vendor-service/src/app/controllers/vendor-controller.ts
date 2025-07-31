import { Request, Response } from 'express';
import {
  PrismaClient,
  VendorStatus as PrismaVendorStatus,
} from '@prisma/client';
import { logger } from '@shared/logger';
import { uploadFileToMinIO } from '@shared/minio';
import {
  CreateVendorSchema,
  UpdateVendorSchema,
  UpdateVendorStatusSchema,
} from '../schemas/vendor.schema';
import { vendorService } from '../services/vendor-service';

import type {
  CreateVendorDto,
  UpdateVendorDto,
  UpdateVendorStatusDto,
} from '../dto/vendor.dto';

import { VendorStatus as SharedVendorStatus } from '@shared/types';
import { produceKafkaEvent } from '@shared/kafka';
import { KAFKA_TOPICS } from '@shared/kafka';

const prisma = new PrismaClient();

function toPrismaStatus(status: SharedVendorStatus): PrismaVendorStatus {
  return status as unknown as PrismaVendorStatus;
}

/**
 * Create a new vendor
 */
export const createVendor = async (req: Request, res: Response) => {
  try {
    const result = CreateVendorSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const dto: CreateVendorDto = result.data;

    const vendor = await prisma.vendor.create({
      data: {
        ...dto,
        status: toPrismaStatus(dto.status ?? SharedVendorStatus.PENDING),
      },
    });

    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.CREATED,
      messages: [
        {
          value: JSON.stringify({
            vendorId: vendor.id,
            name: vendor.name,
            email: vendor.email,
            status: vendor.status,
            createdAt: vendor.createdAt.toISOString(),
          }),
        },
      ],
    });

    return res.status(201).json({ vendor });
  } catch (err) {
    logger.error('Error creating vendor', err);
    return res.status(500).json({ error: 'Failed to create vendor' });
  }
};

/**
 * Update vendor fields (excluding status-only updates)
 */
export const updateVendor = async (req: Request, res: Response) => {
  try {
    const vendorId = req.params.id;

    const result = UpdateVendorSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const dto: UpdateVendorDto = result.data;
    const updateData: Record<string, any> = { ...dto };

    if (dto.status !== undefined) {
      updateData.status = toPrismaStatus(dto.status);
    }

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: updateData,
    });

    if (dto.status !== undefined) {
      await produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
        messages: [
          {
            value: JSON.stringify({
              vendorId: vendor.id,
              status: vendor.status,
              updatedAt: vendor.updatedAt.toISOString(),
            }),
          },
        ],
      });
    }

    return res.status(200).json({ vendor });
  } catch (err) {
    logger.error('Error updating vendor', err);
    return res.status(500).json({ error: 'Failed to update vendor' });
  }
};

/**
 * Get vendor by ID
 */
export const getVendorById = async (req: Request, res: Response) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.params.id },
    });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    return res.status(200).json({ vendor });
  } catch (err) {
    logger.error('Error fetching vendor by ID', err);
    return res.status(500).json({ error: 'Failed to fetch vendor' });
  }
};

/**
 * Get all vendors
 */
export const getAllVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await prisma.vendor.findMany();
    return res.status(200).json({ vendors });
  } catch (err) {
    logger.error('Error fetching all vendors', err);
    return res.status(500).json({ error: 'Failed to fetch vendors' });
  }
};

/**
 * Delete a vendor by ID
 */
export const deleteVendor = async (req: Request, res: Response) => {
  try {
    await prisma.vendor.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch (err) {
    logger.error('Error deleting vendor', err);
    return res.status(500).json({ error: 'Failed to delete vendor' });
  }
};

/**
 * Upload vendor documents
 */
export const uploadVendorDocuments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `vendor-docs/${id}/${Date.now()}-${file.originalname}`;
      const url = await uploadFileToMinIO({
        bucketName: 'vendor-docs',
        objectName: fileName,
        content: file.buffer,
        contentType: file.mimetype,
      });
      uploadedUrls.push(url);
    }

    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        documents: {
          push: uploadedUrls,
        },
      },
    });

    res.status(200).json({
      message: 'Documents uploaded successfully',
      urls: uploadedUrls,
      vendor,
    });
  } catch (err) {
    logger.error('Error uploading vendor documents', err);
    return res.status(500).json({ message: 'Failed to upload documents' });
  }
};
export const approveVendor = async (req: Request, res: Response) => {
  try {
    const data = UpdateVendorStatusSchema.parse({
      id: req.params.id,
      status: 'APPROVED',
    });
    const vendor = await vendorService.updateStatus(data.id, data.status);
    res.json({ success: true, data: vendor });
  } catch (err) {
    logger.error('Approve Vendor Error:', err);
    return res.status(400).json({ success: false, error: 'Failed to approve vendor' });
  }
};

export const rejectVendor = async (req: Request, res: Response) => {
  try {
    const data = UpdateVendorStatusSchema.parse({
      id: req.params.id,
      status: 'REJECTED',
    });
    const vendor = await vendorService.updateStatus(data.id, data.status);
    res.json({ success: true, data: vendor });
  } catch (err) {
    logger.error('Reject Vendor Error:', err);
    return res.status(400).json({ success: false, error: 'Failed to reject vendor' });
  }
};

export const getVendorAnalytics = async (_req: Request, res: Response) => {
  try {
    // const analytics = await vendorService.getAnalytics();
    // res.json({ success: true, data: analytics });
  } catch (err) {
    logger.error('Vendor Analytics Error:', err);
    res
      .status(500)
      .json({ success: false, error: 'Failed to fetch analytics' });
  }
};
