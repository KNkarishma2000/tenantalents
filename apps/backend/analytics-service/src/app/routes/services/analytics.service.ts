import { PrismaClient } from '@prisma/client';

// Handle Prisma singleton in development
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Defines shape of returned summary object
type MetricSummary = Record<string, number>;

export const analyticsService = {
  /**
   * Increment an event type in analytics.
   * If it doesn't exist, create it.
   * @param type - Metric type, e.g., "user_signup", "product_view"
   */
  async incrementEvent(type: string): Promise<void> {
    try {
      await prisma.metric.upsert({
        where: { type },
        update: {
          value: { increment: 1 },
        },
        create: {
          type,
          value: 1,
        },
      });
    } catch (error) {
      console.error(`❌ Failed to increment metric "${type}":`, error);
      throw new Error('Failed to increment metric');
    }
  },

  /**
   * Get a summary of all metrics.
   * Returns an object like: { "user_signup": 10, "product_view": 42 }
   */
 async getSummary(): Promise<MetricSummary> {
  try {
    const allMetrics: Metric[] = await prisma.metric.findMany();

    return allMetrics.reduce<MetricSummary>((acc: MetricSummary, metric: Metric) => {
      acc[metric.type] = metric.value;
      return acc;
    }, {});
  } catch (error) {
    console.error('❌ Failed to get metric summary:', error);
    throw new Error('Failed to get metric summary');
  }
}
};
