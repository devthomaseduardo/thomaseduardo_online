import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { analyticsService } from '../services/analytics.js';

const prisma = new PrismaClient();

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const kpis = await analyticsService.getKPIs();
    res.json(kpis);
  } catch (error: any) {
    console.error("Analytics route error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [projects, clientsCount, invoices, proposalsCount, deploysCount, activities, allPayments, gaKPIs] = await Promise.all([
      prisma.project.findMany({ include: { client: true, invoices: true } }),
      prisma.client.count(),
      prisma.invoice.findMany({ include: { payments: true } }),
      prisma.proposal.count({ where: { status: { in: ['draft', 'sent'] } } }),
      prisma.deploy.count(),
      (prisma as any).timelineEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { project: { select: { name: true } } }
      }),
      (prisma as any).payment.findMany({
        where: { pagoEm: { gte: sixMonthsAgo } }
      }),
      analyticsService.getKPIs()
    ]);

    const activeProjects = projects.filter(p => !['concluido', 'cancelado'].includes(p.status ?? p.phase)).length;
    
    const monthlyRevenue = allPayments
      .filter((p: any) => p.pagoEm >= firstDayMonth)
      .reduce((sum: number, p: any) => sum + p.valor, 0);

    const pendingRevenue = invoices
      .filter(i => ['pending', 'partial', 'overdue'].includes(i.status))
      .reduce((sum, i) => sum + (i.saldo ?? i.amount), 0);

    const revenueChart = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextM = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthName = d.toLocaleDateString('pt-BR', { month: 'short' });
      
      const total = allPayments
        .filter((p: any) => p.pagoEm >= d && p.pagoEm < nextM)
        .reduce((sum: number, p: any) => sum + p.valor, 0);
        
      revenueChart.push({ month: monthName, revenue: total });
    }

    const pipeline = projects.map(p => {
      const totalPago = p.invoices.reduce((s, i) => s + (i.valorPago ?? 0), 0);
      const valorTotal = p.invoices.reduce((s, i) => s + i.amount, 0);
      return {
        id: p.id,
        client: p.client.name,
        nome: p.name,
        tipo: p.tipo ?? 'website',
        status: p.status ?? p.phase,
        progresso: p.progresso ?? 0,
        payment: totalPago >= valorTotal && valorTotal > 0 ? 'Pago' : 'Pendente',
        value: valorTotal,
        balance: valorTotal - totalPago
      };
    });

    const recentActivities = activities.map((a: any) => ({
      id: a.id,
      type: a.tipo === 'financeiro' ? 'payment' : a.tipo === 'deploy' ? 'deploy' : a.tipo === 'contrato' ? 'proposal' : 'message',
      title: a.titulo,
      description: `${a.project?.name || 'Sistema'}: ${a.descricao}`,
      timestamp: a.createdAt.toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }));

    res.json({
      kpis: [
        { label: 'Projetos ativos', value: activeProjects.toString() },
        { label: 'A Receber', value: `R$ ${pendingRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        { label: 'Clientes', value: clientsCount.toString() },
        { label: 'Propostas Ativas', value: proposalsCount.toString() },
        { label: 'Deploys Realizados', value: deploysCount.toString() },
        { label: 'Receita Mensal', value: `R$ ${monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
      ],
      gaKPIs,
      pipeline,
      revenueChart,
      activities: recentActivities
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dashboard' });
  }
};
