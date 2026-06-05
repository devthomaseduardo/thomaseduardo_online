import React from 'react';
import { API_URL } from '@/config';
import { 
  Briefcase, 
  DollarSign, 
  FileText, 
  Rocket, 
  Users 
} from 'lucide-react';
import { KpiCard } from '../../components/admin/dashboard/KpiCard';
import { ActivityFeed } from '../../components/admin/dashboard/ActivityFeed';
import { RevenueChart } from '../../components/admin/dashboard/RevenueChart';
import { ActiveProjects } from '../../components/admin/dashboard/ActiveProjects';
import { RecentDeploys } from '../../components/admin/dashboard/RecentDeploys';
import { UpcomingDeadlines } from '../../components/admin/dashboard/UpcomingDeadlines';
import { 
  kpiMetrics, 
  recentActivities, 
  revenueChartData, 
  activeProjects, 
  recentDeploys, 
  upcomingDeadlines 
} from '../../data/adminMockData';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function AdminDashboard() {
  const { data, loading, error } = useAdminFetch<any>('/dashboard');

  const dashboardKpis = Array.isArray(data?.kpis) ? data.kpis : [
    { label: 'Projetos ativos', value: '0' },
    { label: 'A Receber', value: 'R$ 0,00' },
    { label: 'Clientes', value: '0' },
  ];
  const projects = data?.pipeline?.map((project: any) => ({
    id: project.id,
    name: project.nome || project.name,
    client: project.client || '—',
    status: project.status || project.phase || 'Active',
    progress: project.progresso ?? project.progress ?? 0,
    deadline: project.dataEntregaPrevista || project.deadline || new Date().toISOString(),
    value: project.value ?? 0,
  })) || [];

  const revenueData = data?.paymentsData?.slice(0, 6).map((item: any, index: number) => ({
    month: item.month || `M${index + 1}`,
    revenue: typeof item.value === 'string'
      ? Number(String(item.value).replace(/[^0-9.-]/g, '')) || 0
      : Number(item.value) || 0
  })) || [];

  const handleSeedRealData = async () => {
    try {
      const clients = [
        {
          clientName: "Sleep House",
          clientEmail: "contato@sleephouse.com.br",
          password: "password123",
          projectName: "Digital Showroom de Colchões Premium",
          phase: "Entregue",
          status: "Entregue",
          projectValue: 12500.0,
        },
        {
          clientName: "LP Yázigi",
          clientEmail: "contato@yazigi.com.br",
          password: "password123",
          projectName: "Página de Alta Conversão para Captação de Alunos",
          phase: "Em Produção",
          status: "Em Produção",
          projectValue: 5700.0,
        },
        {
          clientName: "Bras Service",
          clientEmail: "contato@brasservice.com",
          password: "password123",
          projectName: "Sistema Integrado de Ordem de Serviço",
          phase: "Entregue",
          status: "Entregue",
          projectValue: 28000.0,
        },
        {
          clientName: "Hazap Vendas",
          clientEmail: "contato@hazap.com.br",
          password: "password123",
          projectName: "Painel de Vendas e CRM Comercial",
          phase: "Em Produção",
          status: "Em Produção",
          projectValue: 18000.0,
        }
      ];

      for (const c of clients) {
        const res = await fetch(`${API_URL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(c)
        });
        const project = await res.json();
        
        await fetch(`${API_URL}/api/payments/intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: project.id,
            amount: c.projectValue / 2,
            description: "Sinal inicial de 50%",
            type: "service"
          })
        });
      }
      alert('Dados reais adicionados com sucesso! Por favor, recarregue a página.');
    } catch (e) {
      alert('Erro ao adicionar dados reais. Verifique o console.');
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Operações</h1>
          <p className="text-zinc-500 text-sm">Visão geral do sistema e indicadores chave.</p>
        </div>
        <button 
          onClick={handleSeedRealData}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Popular Banco (Dados Reais)
        </button>
      </div>

      {(loading || error) && (
        <div className="rounded-lg border border-[#222] bg-[#0B0B0B] p-4 text-sm text-zinc-300">
          {loading && 'Carregando dados do dashboard...'}
          {error && `Erro ao buscar dados do dashboard: ${error}`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard 
          title="Projetos Ativos" 
          value={dashboardKpis[0]?.value ?? '0'} 
          icon={Briefcase} 
          trend={{ value: '0', isPositive: true }} 
        />
        <KpiCard 
          title="A Receber" 
          value={dashboardKpis[1]?.value ?? 'R$ 0,00'} 
          icon={DollarSign} 
        />
        <KpiCard 
          title="Clientes Ativos" 
          value={dashboardKpis[2]?.value ?? '0'} 
          icon={Users} 
        />
        <KpiCard 
          title="Propostas Ativas" 
          value={0} 
          icon={FileText} 
        />
        <KpiCard 
          title="Deploys" 
          value={0} 
          icon={Rocket} 
        />
        <KpiCard 
          title="Receita Mensal" 
          value={'R$ 0,00'} 
          icon={DollarSign} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueData} />
          <ActiveProjects projects={projects} />
        </div>
        <div className="space-y-6">
          <ActivityFeed activities={data?.activities ?? []} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeploys deploys={data?.deploys ?? []} />
        <UpcomingDeadlines deadlines={data?.deadlines ?? []} />
      </div>
    </div>
  );
}
