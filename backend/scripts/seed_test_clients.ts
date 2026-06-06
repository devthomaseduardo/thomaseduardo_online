import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);

  const clientsData = [
    {
      name: 'Cliente Início',
      email: 'inicio@teste.com',
      projects: {
        create: {
          name: 'Projeto de Boas-vindas',
          status: 'briefing',
          phase: 'Onboarding',
          progresso: 10,
          tipo: 'website',
          value: 5000
        }
      }
    },
    {
      name: 'Cliente Meio',
      email: 'meio@teste.com',
      projects: {
        create: {
          name: 'Sistema em Construção',
          status: 'em_desenvolvimento',
          phase: 'Desenvolvimento Backend',
          progresso: 50,
          tipo: 'webapp',
          value: 15000
        }
      }
    },
    {
      name: 'Cliente Fim',
      email: 'fim@teste.com',
      projects: {
        create: {
          name: 'Plataforma Concluída',
          status: 'concluido',
          phase: 'Entregue',
          progresso: 100,
          tipo: 'ecommerce',
          value: 25000
        }
      }
    }
  ];

  for (const data of clientsData) {
    const client = await prisma.client.upsert({
      where: { email: data.email },
      update: {},
      create: {
        ...data,
        password: hash,
        clientType: 'active'
      },
      include: { projects: true }
    });
    console.log(`✅ Cliente "${client.name}" e seu projeto criados/verificados.`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
