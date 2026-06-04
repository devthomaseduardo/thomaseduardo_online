import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const clients = [
    {
      name: "Sleep House",
      email: "contato@sleephouse.com.br",
      password: "password123", // hashed later se eles fizerem login
      projectName: "Digital Showroom de Colchões Premium",
      phase: "Entregue",
      financial: "Pago",
      value: 12500.0,
      description: "Um digital showroom de alto padrão para uma rede de lojas de colchões premium. O projeto entrega uma experiência de marca editorial e imersiva."
    },
    {
      name: "LP Yázigi",
      email: "contato@yazigi.com.br",
      password: "password123",
      projectName: "Página de Alta Conversão para Captação de Alunos",
      phase: "Em Produção",
      financial: "Pendente",
      value: 5700.0,
      description: "Página comercial de alta velocidade focada em apresentar a escola de idiomas e capturar contatos qualificados para o time de matrículas."
    },
    {
      name: "Bras Service",
      email: "contato@brasservice.com",
      password: "password123",
      projectName: "Sistema Integrado de Ordem de Serviço",
      phase: "Entregue",
      financial: "Pago",
      value: 28000.0,
      description: "Sistema de gestão técnica integrado para organizar chamados, alocar visitas de técnicos nas ruas e gerenciar estoque."
    },
    {
      name: "Hazap Vendas",
      email: "contato@hazap.com.br",
      password: "password123",
      projectName: "Painel de Vendas e CRM Comercial",
      phase: "Em Produção",
      financial: "Pago",
      value: 18000.0,
      description: "Painel de controle de vendas completo para gerenciar leads, propostas e comissões da equipe comercial em tempo real."
    }
  ]

  for (const c of clients) {
    const client = await prisma.client.create({
      data: {
        name: c.name,
        email: c.email,
        password: c.password, // bcrypt seria ideal aqui se fossem usar o sistema
        cnpj: Math.floor(Math.random() * 10000000).toString(),
        clientType: "new"
      }
    })

    const project = await prisma.project.create({
      data: {
        id: `PROJ-${Math.floor(Math.random() * 9000) + 1000}`,
        name: c.projectName,
        phase: c.phase,
        financial: c.financial,
        value: c.value,
        clientId: client.id,
        seo: true,
        analytics: true
      }
    })
    
    // Adicionar um pagamento inicial/sinal para testarmos o saldo
    await prisma.invoice.create({
      data: {
        description: "Sinal inicial de 50%",
        amount: c.value / 2,
        status: "paid",
        projectId: project.id,
      }
    })
    
    console.log(`Added ${c.name} - ${c.projectName}`)
  }
  
  console.log("✅ Seed completed!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
