import { useState, useCallback } from 'react';

const BASE = 'http://localhost:3001/api/v2';

function getHeaders() {
  const token = localStorage.getItem('adminAuth') ?? '';
  return { 'Content-Type': 'application/json', 'x-admin-key': token };
}

async function apiFetch(url: string, opts?: RequestInit) {
  const res = await fetch(BASE + url, { ...opts, headers: { ...getHeaders(), ...(opts?.headers ?? {}) } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Erro desconhecido');
  return data;
}

export type Tab = 'overview' | 'timeline' | 'tasks' | 'files' | 'finance' | 'contracts' | 'deploys' | 'analytics';

export interface Toast { msg: string; type: 'success' | 'error' }

export function useProjectDrawer(projectId: string | null, onRefreshKanban: () => void) {
  const [tab, setTab] = useState<Tab>('overview');
  const [project, setProject] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [deploys, setDeploys] = useState<any[]>([]);
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadProject = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const p = await apiFetch(`/projects/${id}`);
      setProject(p);
      setTimeline(p.timeline ?? []);
      setTasks(p.tasks ?? []);
      setInvoices(p.invoices ?? []);
      setContracts(p.contracts ?? []);
      setDeploys(p.deploys ?? []);
      setIntegrations(p.integrations ?? []);
      setFiles(p.files ?? []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // OVERVIEW
  const updateProject = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}`, { method: 'PUT', body: JSON.stringify(data) });
      setProject(updated);
      showToast('Projeto atualizado!');
      onRefreshKanban();
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // TIMELINE
  const addTimelineEvent = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const ev = await apiFetch(`/projects/${projectId}/timeline`, { method: 'POST', body: JSON.stringify(data) });
      setTimeline(prev => [ev, ...prev]);
      showToast('Evento adicionado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const deleteTimelineEvent = async (id: string) => {
    if (!projectId) return;
    try {
      await apiFetch(`/projects/${projectId}/timeline/${id}`, { method: 'DELETE' });
      setTimeline(prev => prev.filter(e => e.id !== id));
      showToast('Evento removido.');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const toggleTimelineVisibility = async (ev: any) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}/timeline/${ev.id}`, {
        method: 'PUT',
        body: JSON.stringify({ visivelCliente: !ev.visivelCliente })
      });
      setTimeline(prev => prev.map(e => e.id === ev.id ? updated : e));
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // TAREFAS
  const addTask = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const task = await apiFetch(`/projects/${projectId}/tasks`, { method: 'POST', body: JSON.stringify(data) });
      setTasks(prev => [...prev, task]);
      showToast('Tarefa criada!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const updateTask = async (id: string, data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const deleteTask = async (id: string) => {
    if (!projectId) return;
    try {
      await apiFetch(`/projects/${projectId}/tasks/${id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== id));
      showToast('Tarefa removida.');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // FINANCEIRO
  const addInvoice = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const inv = await apiFetch(`/projects/${projectId}/invoices`, { method: 'POST', body: JSON.stringify(data) });
      setInvoices(prev => [inv, ...prev]);
      showToast('Fatura criada!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const registerPayment = async (invoiceId: string, valor: number, metodo: string) => {
    if (!projectId) return;
    try {
      await apiFetch(`/projects/${projectId}/invoices/${invoiceId}/pay`, {
        method: 'POST', body: JSON.stringify({ valor, metodo })
      });
      const updated = await apiFetch(`/projects/${projectId}/invoices`);
      setInvoices(updated);
      showToast('Pagamento registrado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const deleteInvoice = async (id: string) => {
    if (!projectId) return;
    try {
      await apiFetch(`/projects/${projectId}/invoices/${id}`, { method: 'DELETE' });
      setInvoices(prev => prev.filter(i => i.id !== id));
      showToast('Fatura removida.');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // CONTRATOS
  const addContract = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const c = await apiFetch(`/projects/${projectId}/contracts`, { method: 'POST', body: JSON.stringify(data) });
      setContracts(prev => [c, ...prev]);
      showToast('Contrato adicionado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const updateContract = async (id: string, data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}/contracts/${id}`, { method: 'PUT', body: JSON.stringify(data) });
      setContracts(prev => prev.map(c => c.id === id ? updated : c));
      showToast('Contrato atualizado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const deleteContract = async (id: string) => {
    if (!projectId) return;
    try {
      await apiFetch(`/projects/${projectId}/contracts/${id}`, { method: 'DELETE' });
      setContracts(prev => prev.filter(c => c.id !== id));
      showToast('Contrato removido.');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // DEPLOYS
  const addDeploy = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const d = await apiFetch(`/projects/${projectId}/deploys`, { method: 'POST', body: JSON.stringify(data) });
      setDeploys(prev => [d, ...prev]);
      showToast('Deploy registrado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const updateDeploy = async (id: string, data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}/deploys/${id}`, { method: 'PUT', body: JSON.stringify(data) });
      setDeploys(prev => prev.map(d => d.id === id ? updated : d));
      showToast('Deploy atualizado!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  // ANALYTICS
  const addIntegration = async (data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const i = await apiFetch(`/projects/${projectId}/integrations`, { method: 'POST', body: JSON.stringify(data) });
      setIntegrations(prev => [...prev, i]);
      showToast('Integração adicionada!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  const updateIntegration = async (id: string, data: Record<string, any>) => {
    if (!projectId) return;
    try {
      const updated = await apiFetch(`/projects/${projectId}/integrations/${id}`, { method: 'PUT', body: JSON.stringify(data) });
      setIntegrations(prev => prev.map(i => i.id === id ? updated : i));
      showToast('Integração atualizada!');
    } catch (e: any) { showToast(e.message, 'error'); }
  };

  return {
    tab, setTab, project, timeline, tasks, invoices, contracts, deploys, integrations, files,
    loading, toast,
    loadProject, updateProject,
    addTimelineEvent, deleteTimelineEvent, toggleTimelineVisibility,
    addTask, updateTask, deleteTask,
    addInvoice, registerPayment, deleteInvoice,
    addContract, updateContract, deleteContract,
    addDeploy, updateDeploy,
    addIntegration, updateIntegration,
  };
}
