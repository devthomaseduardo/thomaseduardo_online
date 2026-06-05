import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.deploy.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.client.deleteMany({});
  console.log('All admin data deleted');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
