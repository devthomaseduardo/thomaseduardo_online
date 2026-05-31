import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ─── Cliente de teste ───────────────────────────────────────────────────────
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('thomas123', salt);

  const client = await prisma.client.upsert({
    where: { email: 'thomas@teste.com' },
    update: {},
    create: {
      name: 'Thomas Eduardo (Teste)',
      email: 'thomas@teste.com',
      cnpj: '12.345.678/0001-99',
      clientType: 'ativo',
      password: hashedPassword,
    },
  });

  console.log(`✅ Cliente criado: ${client.name} (${client.email})`);
  console.log(`   CNPJ: ${client.cnpj}`);
  console.log(`   Senha: thomas123`);

  // ─── Projeto de teste ────────────────────────────────────────────────────────
  const project = await prisma.project.upsert({
    where: { id: 'PROJ-TESTE01' },
    update: {},
    create: {
      id: 'PROJ-TESTE01',
      name: 'Website Institucional',
      phase: 'Em Desenvolvimento',
      financial: 'Sinal Pago — Aguardando Entrega',
      value: 5500,
      domainHostingValue: 250,
      seo: true,
      analytics: true,
      support: false,
      ads: false,
      repoUrl: 'https://github.com/thomaseduardo/projeto-teste',
      productionUrl: null,
      internalNotes: 'Cliente referência para testes do portal.',
      clientId: client.id,
    },
  });

  console.log(`\n✅ Projeto criado: ${project.name} (${project.id})`);
  console.log(`   Fase: ${project.phase}`);
  console.log(`   Valor: R$ ${project.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);

  // ─── Invoices de teste ───────────────────────────────────────────────────────
  await prisma.invoice.upsert({
    where: { id: 'inv-sinal-01' },
    update: {},
    create: {
      id: 'inv-sinal-01',
      description: 'Sinal (50%) — Website Institucional',
      amount: 2750,
      status: 'paid',
      type: 'service',
      projectId: project.id,
      paidAt: new Date('2026-05-15'),
    },
  });

  await prisma.invoice.upsert({
    where: { id: 'inv-entrega-01' },
    update: {},
    create: {
      id: 'inv-entrega-01',
      description: 'Restante (50%) — Website Institucional',
      amount: 2750,
      status: 'pending',
      type: 'service',
      projectId: project.id,
      dueDate: new Date('2026-06-15'),
    },
  });

  console.log(`\n✅ Invoices criadas:`);
  console.log(`   Sinal R$ 2.750,00 — PAGO`);
  console.log(`   Restante R$ 2.750,00 — PENDENTE (vence 15/06)`);

  console.log('\n────────────────────────────────────────────');
  console.log('🎉 Seed completo! Para logar no portal:');
  console.log('   URL:   http://localhost:3000/portal');
  console.log('   Login: thomas@teste.com  ou  12.345.678/0001-99');
  console.log('   Senha: thomas123');
  console.log('────────────────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
