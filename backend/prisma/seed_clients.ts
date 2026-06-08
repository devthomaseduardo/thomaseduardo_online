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
      status: "completed",
      progresso: 100,
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
      status: "development",
      progresso: 45,
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
      status: "completed",
      progresso: 100,
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
      status: "development",
      progresso: 75,
      financial: "Pago",
      value: 18000.0,
      description: "Painel de controle de vendas completo para gerenciar leads, propostas e comissões da equipe comercial em tempo real."
    },
    {
      name: "Mocha Corp",
      email: "financeiro@mochacorp.com",
      password: "password123",
      projectName: "SaaS de Faturamento Mocha",
      phase: "Entregue",
      status: "completed",
      progresso: 100,
      financial: "Pago",
      value: 9400.0,
      description: "Plataforma de gestão de faturas e cobranças automatizadas."
    },
    {
      name: "The Chef",
      email: "cozinha@thechef.app",
      password: "password123",
      projectName: "Sistema KDS Profissional",
      phase: "Em Produção",
      status: "development",
      progresso: 85,
      financial: "Pago",
      value: 15200.0,
      description: "Sistema de display de cozinha para restaurantes de alto volume."
    },
    {
      name: "Paper Contracts",
      email: "legal@papercontracts.com",
      password: "password123",
      projectName: "Plataforma de Assinatura Digital",
      phase: "Entregue",
      status: "completed",
      progresso: 100,
      financial: "Pago",
      value: 12000.0,
      description: "SaaS de assinatura eletrônica e gestão de documentos jurídicos."
    },
    {
      name: "Freelancer Pro",
      email: "ana@freepro.com",
      password: "password123",
      projectName: "Analisador de Lucratividade",
      phase: "Entregue",
      status: "completed",
      progresso: 100,
      financial: "Pago",
      value: 4500.0,
      description: "Calculadora de ROI e precificação para freelancers."
    },
    {
      name: "SpinMove Elite",
      email: "contato@spinmove.com",
      password: "password123",
      projectName: "Plataforma Performance Esportiva",
      phase: "Design",
      status: "design",
      progresso: 30,
      financial: "Pendente",
      value: 7800.0,
      description: "Interface imersiva para agendamento de treinos de alta performance."
    },
    {
      name: "Infoprodutos Pro",
      email: "vendas@prlpro.com",
      password: "password123",
      projectName: "Página de Vendas PRL",
      phase: "Entregue",
      status: "completed",
      progresso: 100,
      financial: "Pago",
      value: 3200.0,
      description: "Landing page de alta conversão para produtos digitais com foco em performance mobile."
    },
    {
      name: "QR Brasil Corp",
      email: "suporte@qrbrasil.com",
      password: "password123",
      projectName: "Gerador QR Code Brasil",
      phase: "Entregue",
      status: "completed",
      progresso: 100,
      financial: "Pago",
      value: 5500.0,
      description: "Ferramenta SaaS para geração e gestão de QR Codes dinâmicos com branding customizado."
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
        status: c.status,
        progresso: c.progresso,
        financial: c.financial,
        value: c.value,
        clientId: client.id,
        seo: true,
        analytics: true,
        tipo: "SaaS / Sistema"
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
