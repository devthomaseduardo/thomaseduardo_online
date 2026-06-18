import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const clients = await prisma.client.findMany({
    where: {
      name: {
        contains: 'homma',
        mode: 'insensitive'
      }
    }
  });
  console.log(clients);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
