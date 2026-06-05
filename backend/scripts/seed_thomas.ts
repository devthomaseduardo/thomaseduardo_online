import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  const client = await prisma.client.upsert({
    where: { email: 'devthomaseduardo@gmail.com' },
    update: { password: hash, portalKey: '123456', cnpj: '123456789' },
    create: {
      name: 'Thomas Eduardo',
      email: 'devthomaseduardo@gmail.com',
      password: hash,
      portalKey: '123456',
      cnpj: '123456789'
    }
  });
  console.log('Cliente criado com sucesso:', client);
}

main().catch(console.error).finally(() => prisma.$disconnect());
