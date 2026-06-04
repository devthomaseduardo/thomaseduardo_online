import { KpiMetrics, ActivityItem, Project, Deploy, Deadline, RevenueDataPoint } from '../types/admin';

export const kpiMetrics: KpiMetrics = {
  activeProjects: 12,
  monthlyRevenue: 45000,
  pendingRevenue: 18500,
  activeProposals: 4,
  completedDeploys: 32,
  activeClients: 8,
};

export const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'deploy',
    title: 'Deploy Production',
    description: 'Sistema de gestão T3RN atualizado (v2.1.0)',
    timestamp: 'Há 2 horas',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Pagamento Recebido',
    description: 'Fatura #0045 - Cliente Alpha',
    timestamp: 'Há 5 horas',
  },
  {
    id: '3',
    type: 'proposal',
    title: 'Proposta Aceita',
    description: 'Novo contrato de manutenção fechado',
    timestamp: 'Ontem',
  },
  {
    id: '4',
    type: 'message',
    title: 'Nova Mensagem',
    description: 'Cliente Beta solicitou alteração no escopo',
    timestamp: 'Ontem',
  },
];

export const activeProjects: Project[] = [
  {
    id: '1',
    name: 'ERP Interno',
    client: 'Acme Corp',
    status: 'Active',
    progress: 75,
    deadline: '2026-07-15',
    value: 25000,
  },
  {
    id: '2',
    name: 'App de Logística',
    client: 'LogisTech',
    status: 'Active',
    progress: 30,
    deadline: '2026-08-30',
    value: 40000,
  },
  {
    id: '3',
    name: 'Portal B2B',
    client: 'Indústria BR',
    status: 'Active',
    progress: 90,
    deadline: '2026-06-20',
    value: 15000,
  },
];

export const recentDeploys: Deploy[] = [
  {
    id: '1',
    project: 'Acme Corp - ERP',
    environment: 'production',
    status: 'success',
    timestamp: '10 min atrás',
  },
  {
    id: '2',
    project: 'LogisTech - App',
    environment: 'staging',
    status: 'success',
    timestamp: '2 horas atrás',
  },
  {
    id: '3',
    project: 'Indústria BR - Portal',
    environment: 'production',
    status: 'failed',
    timestamp: '5 horas atrás',
  },
];

export const upcomingDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'Entrega Módulo Financeiro',
    project: 'ERP Interno',
    date: 'Amanhã',
  },
  {
    id: '2',
    title: 'Revisão de UI/UX',
    project: 'App de Logística',
    date: '12 Jun',
  },
  {
    id: '3',
    title: 'Lançamento B2B',
    project: 'Portal B2B',
    date: '20 Jun',
  },
];

export const revenueChartData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 30000 },
  { month: 'Fev', revenue: 35000 },
  { month: 'Mar', revenue: 32000 },
  { month: 'Abr', revenue: 40000 },
  { month: 'Mai', revenue: 45000 },
  { month: 'Jun', revenue: 48000 },
];
