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

export function AdminDashboard() {
  const { data, loading, error } = useAdminFetch<any>('/dashboard');

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
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth') || '';
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
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-admin-key': 'antigravity-admin-dev'
          },
          body: JSON.stringify(c)
        });
        
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Erro criando projeto ${c.projectName}: ${errText}`);
        }
        
        const project = await res.json();
        
        const invoiceRes = await fetch(`${API_URL}/api/payments/intent`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-admin-key': 'antigravity-admin-dev'
          },
          body: JSON.stringify({
            projectId: project.id,
            amount: c.projectValue / 2,
            description: "Sinal inicial de 50%",
            type: "service"
          })
        });

        if (!invoiceRes.ok) {
          const errText = await invoiceRes.text();
          throw new Error(`Erro criando fatura do projeto ${c.projectName}: ${errText}`);
        }
      }
      alert('Dados reais adicionados com sucesso! Por favor, recarregue a página.');
    } catch (e: any) {
      alert(`Erro: ${e.message}`);
      console.error(e);
    }
  };

      const handleClearDB = async () => {
        try {
          const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth') || '';
          const res = await fetch(`${API_URL}/api/dev/wipe`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'x-admin-key': 'antigravity-admin-dev'
            }
          });
          if (!res.ok) {
            throw new Error('Falha ao limpar banco');
          }
          alert('Banco de dados limpo com sucesso! Recarregue a página.');
        } catch (e: any) {
          alert(`Erro ao limpar banco: ${e.message}`);
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
