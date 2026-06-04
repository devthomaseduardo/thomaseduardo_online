import React from 'react';
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

  const dashboardKpis = Array.isArray(data?.kpis) ? data.kpis : [];
  const projects = data?.pipeline?.length ? data.pipeline.map((project: any) => ({
    id: project.id,
    name: project.nome || project.name,
    client: project.client || '—',
    status: project.status || project.phase || 'Active',
    progress: project.progresso ?? project.progress ?? 0,
    deadline: project.dataEntregaPrevista || project.deadline || new Date().toISOString(),
    value: project.value ?? 0,
  })) : activeProjects;

  const revenueData = data?.paymentsData?.length
    ? data.paymentsData.slice(0, 6).map((item: any, index: number) => ({
        month: item.month || `M${index + 1}`,
        revenue: typeof item.value === 'string'
          ? Number(String(item.value).replace(/[^0-9.-]/g, '')) || 0
          : Number(item.value) || 0
      }))
    : revenueChartData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Operações</h1>
        <p className="text-zinc-500 text-sm">Visão geral do sistema e indicadores chave.</p>
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
          value={dashboardKpis[0]?.value ?? kpiMetrics.activeProjects} 
          icon={Briefcase} 
          trend={{ value: '2', isPositive: true }} 
        />
        <KpiCard 
          title="Receita Mensal" 
          value={dashboardKpis[1]?.value ?? `R$ ${(kpiMetrics.monthlyRevenue / 1000).toFixed(1)}k`} 
          icon={DollarSign} 
          trend={{ value: '15%', isPositive: true }} 
        />
        <KpiCard 
          title="A Receber" 
          value={dashboardKpis[2]?.value ?? `R$ ${(kpiMetrics.pendingRevenue / 1000).toFixed(1)}k`} 
          icon={DollarSign} 
        />
        <KpiCard 
          title="Propostas Ativas" 
          value={kpiMetrics.activeProposals} 
          icon={FileText} 
        />
        <KpiCard 
          title="Deploys" 
          value={kpiMetrics.completedDeploys} 
          icon={Rocket} 
          trend={{ value: '4', isPositive: true }}
        />
        <KpiCard 
          title="Clientes Ativos" 
          value={kpiMetrics.activeClients} 
          icon={Users} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueData} />
          <ActiveProjects projects={projects} />
        </div>
        <div className="space-y-6">
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeploys deploys={recentDeploys} />
        <UpcomingDeadlines deadlines={upcomingDeadlines} />
      </div>
    </div>
  );
}
