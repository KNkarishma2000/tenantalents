import { VendorStatus as PrismaVendorStatus } from '@prisma/client';
import { PrismaClient, Prisma } from '@prisma/client';
import { produceKafkaEvent } from '@shared/kafka';
import { SERVICE_NAMES } from '@shared/constants';
import { VendorStatus } from '@shared/types';
import { KAFKA_TOPICS } from '@shared/kafka';

import { VendorCreatedEvent, VendorStatusUpdatedEvent } from '@shared/kafka';
import { logger } from '@shared/logger';

const prisma = new PrismaClient();

export const vendorService = {
  async register(data: Prisma.VendorCreateInput) {
    const vendor = await prisma.vendor.create({ data });

    const createdEvent: VendorCreatedEvent = {
      vendorId: vendor.id,
      name: vendor.name,
      status: vendor.status as VendorStatus,
      createdAt: vendor.createdAt.toISOString(),
    };

    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.CREATED,
      messages: [{ value: JSON.stringify(createdEvent) }],
    });

    const statusUpdatedEvent: VendorStatusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status as VendorStatus,
      updatedAt: vendor.createdAt.toISOString(),
    };

    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
      messages: [{ value: JSON.stringify(statusUpdatedEvent) }],
    });

    logger.info(
      `[${SERVICE_NAMES.VENDOR}] Vendor registered and status emitted: ${vendor.id}`
    );
    return vendor;
  },

  async updateStatus(id: string, status: PrismaVendorStatus) {
    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        status: { set: status },
      },
    });

    const event: VendorStatusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status as VendorStatus,
      updatedAt: vendor.updatedAt.toISOString(),
    };

    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
      messages: [{ value: JSON.stringify(event) }],
    });

    logger.info(
      `[${SERVICE_NAMES.VENDOR}] Vendor status updated: ${vendor.id}`
    );
    return vendor;
  },

  async getById(id: string) {
    return prisma.vendor.findUnique({ where: { id } });
  },
};
