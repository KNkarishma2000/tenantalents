import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // TODO: Add your seed data here
  console.log('🌱 Seeding...');
}

main()
  .then(() => {
    console.log('✅ Seeding complete');
    return prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error('❌ Seeding failed:', err);
    await prisma.$disconnect();
    process.exit(1);
  });
