import React from 'react';
import { RevenueDataPoint } from '../../../types/admin';

export function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);
  
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/[0.04] transition-all duration-500">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-bold text-white tracking-tight">Monthly Revenue</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Project Revenue</span>
        </div>
      </div>
      <div className="p-8 flex-1 flex items-end gap-3 sm:gap-6 h-64">
        {data.map((point) => {
          const height = `${(point.revenue / maxRevenue) * 100}%`;
          return (
            <div key={point.month} className="flex-1 flex flex-col items-center gap-4 group h-full">
              <div className="w-full relative flex-1 flex items-end">
                <div 
                  className="w-full bg-emerald-500/10 rounded-t-xl group-hover:bg-emerald-500/20 transition-all duration-500 relative border-t border-x border-emerald-500/10 group-hover:border-emerald-500/30 shadow-[0_-4px_20px_rgba(16,185,129,0.05)]"
                  style={{ height }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1.5 px-3 rounded-full font-bold shadow-xl whitespace-nowrap pointer-events-none transition-all duration-300 transform group-hover:-translate-y-1">
                    R$ {(point.revenue / 1000).toFixed(1)}k
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{point.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
