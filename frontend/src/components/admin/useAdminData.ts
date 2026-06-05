import { useState, useEffect } from "react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
// Usa helper centralizado que inclui sempre x-admin-key
const hdrs = () => getAdminHeaders();

let cacheProjects: any[] | null = null;
let cacheClients: any[] | null = null;
let loadingProjects = false;
let loadingClients = false;
let listeners: Function[] = [];

function emit() {
  listeners.forEach(l => l());
}

export function useAdminData() {
  const [data, setData] = useState({
    projects: cacheProjects || [],
    clients: cacheClients || [],
    loading: (cacheProjects === null && loadingProjects) || (cacheClients === null && loadingClients)
  });

  useEffect(() => {
    const handler = () => {
      setData({
        projects: cacheProjects || [],
        clients: cacheClients || [],
        loading: (cacheProjects === null && loadingProjects) || (cacheClients === null && loadingClients)
      });
    };
    listeners.push(handler);

    if (cacheProjects === null && !loadingProjects) {
      loadingProjects = true;
      handler();
      fetch(`${API}/projects`, { headers: hdrs() })
        .then(r => r.ok ? r.json() : [])
        .then(res => {
          cacheProjects = Array.isArray(res) ? res : [];
          loadingProjects = false;
          emit();
        })
        .catch(() => { loadingProjects = false; emit(); });
    }

    if (cacheClients === null && !loadingClients) {
      loadingClients = true;
      handler();
      fetch(`${API}/clients`, { headers: hdrs() })
        .then(r => r.ok ? r.json() : [])
        .then(res => {
          cacheClients = Array.isArray(res) ? res : [];
          loadingClients = false;
          emit();
        })
        .catch(() => { loadingClients = false; emit(); });
    }

    // Set initial state from cache if available
    handler();

    return () => {
      listeners = listeners.filter(l => l !== handler);
    };
  }, []);

  const mutate = () => {
    // We don't wipe the cache entirely to avoid UI flicker, we just re-fetch and replace
    loadingProjects = true;
    loadingClients = true;
    emit();

    fetch(`${API}/projects`, { headers: hdrs() })
      .then(r => r.ok ? r.json() : [])
      .then(res => {
        cacheProjects = Array.isArray(res) ? res : [];
        loadingProjects = false;
        emit();
      }).catch(() => { loadingProjects = false; emit(); });

    fetch(`${API}/clients`, { headers: hdrs() })
      .then(r => r.ok ? r.json() : [])
      .then(res => {
        cacheClients = Array.isArray(res) ? res : [];
        loadingClients = false;
        emit();
      }).catch(() => { loadingClients = false; emit(); });
  };

  return { ...data, mutate };
}
