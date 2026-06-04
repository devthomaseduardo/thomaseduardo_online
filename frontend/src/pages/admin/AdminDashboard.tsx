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

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Operações</h1>
        <p className="text-zinc-500 text-sm">Visão geral do sistema e indicadores chave.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard 
          title="Projetos Ativos" 
          value={kpiMetrics.activeProjects} 
          icon={Briefcase} 
          trend={{ value: '2', isPositive: true }} 
        />
        <KpiCard 
          title="Receita Mensal" 
          value={`R$ ${(kpiMetrics.monthlyRevenue / 1000).toFixed(1)}k`} 
          icon={DollarSign} 
          trend={{ value: '15%', isPositive: true }} 
        />
        <KpiCard 
          title="Receita Pendente" 
          value={`R$ ${(kpiMetrics.pendingRevenue / 1000).toFixed(1)}k`} 
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueChartData} />
          <ActiveProjects projects={activeProjects} />
        </div>
        
        <div className="space-y-6">
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
      
      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeploys deploys={recentDeploys} />
        <UpcomingDeadlines deadlines={upcomingDeadlines} />
      </div>
    </div>
  );
}
