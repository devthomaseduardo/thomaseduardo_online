import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with initial clients and projects...');

  // Default password for seeded clients
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash('123456', salt);

  const initialData = [
    {
      clientName: "Hazap",
      clientEmail: "contato@hazap.com.br", // fake
      clientCnpj: "00.000.000/0001-00",
      projects: [
        {
          name: "Hazap (Natal + Workstation)",
          value: 800,
          status: "Finalizado",
          hasDomainHosting: false,
          domainHostingValue: 0
        },
        {
          name: "Hazap (LP de Vendas)",
          value: 350,
          status: "Finalizado",
          hasDomainHosting: false,
          domainHostingValue: 0
        }
      ]
    },
    {
      clientName: "Casa Lellit",
      clientEmail: "contato@casalellit.com.br", // fake
      clientCnpj: "00.000.000/0001-02",
      projects: [
        {
          name: "Casa Lellit",
          value: 600,
          status: "Finalizado",
          hasDomainHosting: false,
          domainHostingValue: 0
        }
      ]
    },
    {
      clientName: "Gilbarbosa",
      clientEmail: "contato@gilbarbosa.com.br", // fake
      clientCnpj: "00.000.000/0001-03",
      projects: [
        {
          name: "Gilbarbosa",
          value: 0,
          status: "Descontinuado",
          hasDomainHosting: false,
          domainHostingValue: 0
        }
      ]
    },
    {
      clientName: "Brasservice",
      clientEmail: "contato@brasservice.com.br", // fake
      clientCnpj: "00.000.000/0001-04",
      projects: [
        {
          name: "Brasservice",
          value: 250,
          status: "Finalizado",
          hasDomainHosting: true,
          domainHostingValue: 150
        }
      ]
    },
    {
      clientName: "Sleep House",
      clientEmail: "contato@sleephouse.com.br", // fake
      clientCnpj: "57.991.177/0001-14",
      projects: [
        {
          name: "Sleep House",
          value: 800,
          status: "Aguardando Análise",
          hasDomainHosting: false,
          domainHostingValue: 0
        }
      ]
    }
  ];

  for (const data of initialData) {
    let client = await prisma.client.findUnique({
      where: { email: data.clientEmail }
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: data.clientName,
          email: data.clientEmail,
          cnpj: data.clientCnpj,
          clientType: 'old',
          password: defaultPassword
        }
      });
    }

    for (const proj of data.projects) {
      await prisma.project.create({
        data: {
          id: `PROJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          name: proj.name,
          value: proj.value,
          phase: proj.status,
          financial: proj.status === 'Finalizado' ? 'Pago (100%)' : 'Pendente',
          domainHostingValue: proj.domainHostingValue,
          clientId: client.id
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
