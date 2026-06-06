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
import { useAdminFetch } from '../../components/admin/useAdminFetch';
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API_V2 = `${API_URL}/api/v2`;

export function AdminDashboard() {
  const { data, loading, error } = useAdminFetch<any>('/dashboard');
  const isProd = import.meta.env.PROD;

  const kpis = data?.kpis || [];
  const projects = data?.pipeline?.map((project: any) => ({
    id: project.id,
    name: project.nome || project.name,
    client: project.client || '—',
    status: project.status || project.phase || 'Active',
    progress: project.progresso ?? 0,
    deadline: project.dataEntregaPrevista || project.deadline || new Date().toISOString(),
    value: project.value ?? 0,
  })) || [];

  const revenueData = data?.revenueChart || [];
  const activities = data?.activities || [];

  const handleSeedRealData = async () => {
    if (!confirm('Deseja popular o banco com dados reais?')) return;
    try {
      const res = await fetch(`${API_V2}/dev/seed`, {
        method: 'POST',
        headers: getAdminHeaders()
      });
      
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Erro ao popular banco');
      
      alert('Dados reais adicionados com sucesso! Por favor, recarregue a página.');
      window.location.reload();
    } catch (e: any) {
      alert(`Erro: ${e.message}`);
    }
  };

  const handleClearDB = async () => {
    if (!confirm('AVISO: Isso apagará TODOS os dados do sistema. Tem certeza?')) return;
    try {
      const res = await fetch(`${API_V2}/dev/wipe`, {
        method: 'POST',
        headers: getAdminHeaders()
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Falha ao limpar banco');
      
      alert('Banco de dados limpo com sucesso!');
      window.location.reload();
    } catch (e: any) {
      alert(`Erro ao limpar banco: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Operações</h1>
          <p className="text-zinc-500 text-sm">Visão geral do sistema e indicadores chave.</p>
        </div>
        {!isProd && (
          <div className="flex gap-2">
            <button 
              onClick={handleClearDB}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-500/30 text-red-500 border border-red-500/20 text-sm font-medium rounded-lg transition-colors"
            >
              Limpar Banco
            </button>
            <button 
              onClick={handleSeedRealData}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Popular Banco (Dados Reais)
            </button>
          </div>
        )}
      </div>

      {(loading || error) && (
        <div className="rounded-lg border border-[#222] bg-[#0B0B0B] p-4 text-sm text-zinc-300">
          {loading && 'Carregando dados do dashboard...'}
          {error && `Erro ao buscar dados do dashboard: ${error}`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi: any, i: number) => (
          <KpiCard 
            key={i}
            title={kpi.label} 
            value={kpi.value} 
            icon={kpi.label.includes('Receita') || kpi.label.includes('Receber') ? DollarSign : kpi.label.includes('Projetos') ? Briefcase : kpi.label.includes('Clientes') ? Users : kpi.label.includes('Propostas') ? FileText : Rocket} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueData} />
          <ActiveProjects projects={projects} />
        </div>
        <div className="space-y-6">
          <ActivityFeed activities={activities} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeploys deploys={data?.deploys ?? []} />
        <UpcomingDeadlines deadlines={data?.deadlines ?? []} />
      </div>
    </div>
  );
}
