import { useState, useEffect } from "react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

let cache: Record<string, any[] | null> = {
  projects: null,
  clients: null,
  proposals: null,
  invoices: null,
  contracts: null,
  deploys: null,
  leads: null,
  messages: null,
  team: null,
};

let loading: Record<string, boolean> = {
  projects: false,
  clients: false,
  proposals: false,
  invoices: false,
  contracts: false,
  deploys: false,
  leads: false,
  messages: false,
  team: false,
};

let listeners: Function[] = [];

function emit() {
  listeners.forEach(l => l());
}

export function useAdminData() {
  const [data, setData] = useState({
    projects: cache.projects || [],
    clients: cache.clients || [],
    proposals: cache.proposals || [],
    invoices: cache.invoices || [],
    contracts: cache.contracts || [],
    deploys: cache.deploys || [],
    leads: cache.leads || [],
    messages: cache.messages || [],
    team: cache.team || [],
    loading: Object.values(loading).some(l => l) || Object.values(cache).some(c => c === null)
  });

  useEffect(() => {
    const handler = () => {
      setData({
        projects: cache.projects || [],
        clients: cache.clients || [],
        proposals: cache.proposals || [],
        invoices: cache.invoices || [],
        contracts: cache.contracts || [],
        deploys: cache.deploys || [],
        leads: cache.leads || [],
        messages: cache.messages || [],
        team: cache.team || [],
        loading: Object.values(loading).some(l => l) || Object.values(cache).some(c => c === null)
      });
    };
    listeners.push(handler);

    const fetchEntity = (entity: string, endpoint: string) => {
      if (cache[entity] === null && !loading[entity]) {
        loading[entity] = true;
        handler();
        fetch(`${API}/${endpoint}`, { headers: hdrs() })
          .then(r => r.ok ? r.json() : [])
          .then(res => {
            cache[entity] = Array.isArray(res) ? res : [];
            loading[entity] = false;
            emit();
          })
          .catch(() => { loading[entity] = false; emit(); });
      }
    };

    fetchEntity('projects', 'projects');
    fetchEntity('clients', 'clients');
    fetchEntity('proposals', 'proposals');
    fetchEntity('invoices', 'invoices');
    fetchEntity('contracts', 'contracts');
    fetchEntity('deploys', 'deploys');
    fetchEntity('leads', 'leads');
    fetchEntity('messages', 'messages');
    fetchEntity('team', 'team');

    handler();

    return () => {
      listeners = listeners.filter(l => l !== handler);
    };
  }, []);

  const mutate = (entity?: string) => {
    const fetchEntity = (ent: string, endpoint: string) => {
      loading[ent] = true;
      emit();
      fetch(`${API}/${endpoint}`, { headers: hdrs() })
        .then(r => r.ok ? r.json() : [])
        .then(res => {
          cache[ent] = Array.isArray(res) ? res : [];
          loading[ent] = false;
          emit();
        }).catch(() => { loading[ent] = false; emit(); });
    };

    if (entity) {
      fetchEntity(entity, entity);
    } else {
      fetchEntity('projects', 'projects');
      fetchEntity('clients', 'clients');
      fetchEntity('proposals', 'proposals');
      fetchEntity('invoices', 'invoices');
      fetchEntity('contracts', 'contracts');
      fetchEntity('deploys', 'deploys');
      fetchEntity('leads', 'leads');
      fetchEntity('messages', 'messages');
      fetchEntity('team', 'team');
    }
  };

  return { ...data, mutate };
}
