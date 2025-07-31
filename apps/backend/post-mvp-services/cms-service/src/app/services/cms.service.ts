import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cmsService = {
  createPage: async (data: {
    title: string;
    slug: string;
    content: string;
  }) => {
    return prisma.page.create({ data });
  },

  getPageBySlug: async (slug: string) => {
    return prisma.page.findUnique({ where: { slug } });
  },

  updatePage: async (
    slug: string,
    data: Partial<{ title: string; content: string }>
  ) => {
    return prisma.page.update({ where: { slug }, data });
  },

  deletePage: async (slug: string) => {
    return prisma.page.delete({ where: { slug } });
  },

  listPages: async () => {
    return prisma.page.findMany();
  },
};
