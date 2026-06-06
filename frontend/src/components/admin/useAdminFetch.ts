import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

const API_BASE = `${API_URL}/api/v2`;

export function useAdminFetch<T = any>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}${path}`, { headers: getAdminHeaders() })
      .then(async (res) => {
        const text = await res.text();
        let payload = null;
        try {
          payload = text ? JSON.parse(text) : null;
        } catch (e) {
          // Fallback if not JSON
        }
        
        if (!res.ok) {
          throw new Error(payload?.error || res.statusText || 'Erro ao buscar dados');
        }
        return payload as T;
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err: any) => {
        if (active) {
          setError(err?.message ?? 'Erro de rede');
          showToast(err?.message ?? 'Erro de rede', 'error');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path, showToast]);

  return { data, loading, error };
}
