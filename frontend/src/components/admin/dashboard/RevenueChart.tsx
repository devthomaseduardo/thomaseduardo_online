import React from 'react';
import { RevenueDataPoint } from '../../../types/admin';

export function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);
  
  return (
    <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-[#222]">
        <h3 className="font-semibold text-white">Receita Mensal</h3>
      </div>
      <div className="p-5 flex-1 flex items-end gap-2 sm:gap-4 h-48">
        {data.map((point) => {
          const height = `${(point.revenue / maxRevenue) * 100}%`;
          return (
            <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative flex-1 flex items-end">
                <div 
                  className="w-full bg-zinc-800 rounded-t-sm group-hover:bg-zinc-700 transition-colors relative"
                  style={{ height }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded font-medium whitespace-nowrap pointer-events-none transition-opacity">
                    R$ {(point.revenue / 1000).toFixed(1)}k
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">{point.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
