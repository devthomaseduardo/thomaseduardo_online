import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  key?: React.Key;
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  // Determine accent color based on title (heuristically)
  const isRevenue = title.toLowerCase().includes('receita') || title.toLowerCase().includes('receber') || title.toLowerCase().includes('revenue');
  const accentColor = isRevenue ? 'emerald' : 'blue';

  return (
    <div className="group bg-white/[0.03] border border-white/5 p-6 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl bg-${accentColor}-500/10 border border-${accentColor}-500/20 group-hover:scale-110 transition-transform duration-500 relative`}>
          <Icon className={`w-5 h-5 text-${accentColor}-400 relative z-10`} />
          <div className={`absolute inset-0 bg-${accentColor}-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
            trend.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:tracking-normal transition-all duration-500">
          {value}
        </h3>
      </div>
    </div>
  );
}
