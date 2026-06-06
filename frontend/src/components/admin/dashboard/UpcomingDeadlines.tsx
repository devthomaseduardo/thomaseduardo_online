import React from 'react';
import { Deadline } from '../../../types/admin';
import { Calendar } from 'lucide-react';

export function UpcomingDeadlines({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-white/[0.01]">
        <h3 className="font-bold text-white tracking-tight uppercase text-xs tracking-[0.2em]">Próximos Marcos</h3>
      </div>
      <div className="p-6 md:p-8 space-y-4 flex-1 overflow-y-auto scrollbar-hide">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 rounded-xl text-zinc-400 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{deadline.title}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{deadline.project}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 group-hover:bg-amber-400/20 transition-all whitespace-nowrap">
              {deadline.date}
            </span>
          </div>
        ))}
        {deadlines.length === 0 && <div className="text-center py-10 text-white/20 text-xs font-mono">Nenhum marco agendado.</div>}
      </div>
    </div>
  );
}
