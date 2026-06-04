import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  await prisma.$connect();
  const result = await prisma.project.findMany({ include: { client: true } });
  console.log('result', Array.isArray(result) ? result.length : typeof result);
  console.log(JSON.stringify(result.slice(0,2), null, 2));
  await prisma.$disconnect();
}
main().catch(e=>{ console.error('error', e); process.exit(1); });
