import { useEffect, useState } from 'react';

const API_BASE = '/api/v2';

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
  if (token) headers.Authorization = `Bearer ${token}`;
  const legacyKey = localStorage.getItem('adminKey');
  if (legacyKey) headers['x-admin-key'] = legacyKey;
  return headers;
};

export function useAdminFetch<T = any>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}${path}`, { headers: getHeaders() })
      .then(async (res) => {
        const payload = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(payload?.error || res.statusText || 'Erro ao buscar dados');
        }
        return payload as T;
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err: any) => {
        if (active) setError(err?.message ?? 'Erro de rede');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path]);

  return { data, loading, error };
}
