import React, { useState, useEffect } from "react";
import { BarChart3, PieChart, TrendingUp, Users, Eye } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

export function AnalyticsModule() {
  const { projects: data, loading } = useAdminData();
  const [kpis, setKpis] = useState<any[]>([]);
  const [kpiLoading, setKpiLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/analytics/kpis`, { headers: hdrs() })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setKpis(data);
      })
      .catch(err => console.error("Error fetching KPIs:", err))
      .finally(() => setKpiLoading(false));
  }, []);

  const allIntegrations = data.flatMap(p => (p.integrations ?? []).map((i: any) => ({ ...i, project: p })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="w-full py-6 px-5 md:py-10 md:px-10 space-y-8 max-w-7xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Analytics</h1>
          <p className="text-white/30 text-sm">Central de inteligência de dados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {kpiLoading ? (
          [1,2,3,4].map(i => (
            <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden animate-pulse">
              <div className="w-5 h-5 bg-white/10 rounded-full mb-3" />
              <div className="h-3 w-1/2 bg-white/10 rounded mb-2" />
              <div className="h-6 w-3/4 bg-white/10 rounded" />
            </div>
          ))
        ) : (
          kpis.map((k, i) => {
            const IconMap: Record<string, any> = { Users, TrendingUp, Eye, BarChart3 };
            const Icon = k.icon && IconMap[k.icon] ? IconMap[k.icon] : BarChart3;
            return (
              <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                <Icon className="w-5 h-5 text-white/20 mb-3" />
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">{k.label}</p>
                <p className="text-2xl font-bold text-white">{k.val}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="font-semibold text-white">Integrações Ativas (GTM, GA4, Pixel)</h3>
        </div>
        {loading ? (
          <div className="py-20 text-center text-white/20 font-mono text-sm">Sincronizando...</div>
        ) : allIntegrations.length === 0 ? (
          <div className="py-20 text-center border-t border-white/[0.06] border-dashed">
            <PieChart className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Nenhuma integração configurada.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                {["Projeto", "Provider", "API Key / Tracking ID", "Status"].map(h => (
                  <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {allIntegrations.map(i => (
                <tr key={i.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-white">{i.project?.name}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{i.provider}</td>
                  <td className="px-6 py-4 text-xs font-mono text-white/40">{i.apiKey}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-400/10 text-emerald-400 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md">
                      Ativo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
