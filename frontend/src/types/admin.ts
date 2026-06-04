export type ProjectStatus = 'Active' | 'Completed' | 'On Hold' | 'Cancelled';
export type ProposalStatus = 'Pending' | 'Accepted' | 'Rejected';

export interface KpiMetrics {
  activeProjects: number;
  monthlyRevenue: number;
  pendingRevenue: number;
  activeProposals: number;
  completedDeploys: number;
  activeClients: number;
}

export interface ActivityItem {
  id: string;
  type: 'deploy' | 'payment' | 'proposal' | 'message';
  title: string;
  description: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  value: number;
}

export interface Deploy {
  id: string;
  project: string;
  environment: 'production' | 'staging';
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
}

export interface Deadline {
  id: string;
  title: string;
  project: string;
  date: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}
