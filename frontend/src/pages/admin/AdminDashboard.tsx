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
    <div className="space-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Centro de Comando</h1>
          <p className="text-zinc-500 text-sm font-medium">Desempenho do sistema e insights estratégicos.</p>
        </div>
        {!isProd && (
          <div className="flex gap-3">
            <button 
              onClick={handleClearDB}
              className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95"
            >
              Limpar Banco
            </button>
            <button 
              onClick={handleSeedRealData}
              className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:bg-zinc-200 shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
            >
              Popular Dados Reais
            </button>
          </div>
        )}
      </div>

      {(loading || error) && (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-sm text-zinc-400 backdrop-blur-sm animate-pulse">
          {loading && 'Sincronizando dados operacionais...'}
          {error && `Erro ao sincronizar dados: ${error}`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi: any, i: number) => (
          <KpiCard 
            key={i}
            title={kpi.label} 
            value={kpi.value} 
            icon={kpi.label.includes('Receita') || kpi.label.includes('Receber') ? DollarSign : kpi.label.includes('Projetos') ? Briefcase : kpi.label.includes('Clientes') ? Users : kpi.label.includes('Propostas') ? FileText : Rocket} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-[400px]">
            <RevenueChart data={revenueData} />
          </div>
          <ActiveProjects projects={projects} />
        </div>
        <div className="space-y-8 h-full">
          <ActivityFeed activities={activities} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentDeploys deploys={data?.deploys ?? []} />
        <UpcomingDeadlines deadlines={data?.deadlines ?? []} />
      </div>
    </div>
  );
}
