import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  return (
    <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-zinc-500 text-sm font-medium">{title}</span>
        <div className="p-2 bg-[#111] rounded-md border border-[#222]">
          <Icon className="w-4 h-4 text-zinc-400" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {trend && (
          <span className={`text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
