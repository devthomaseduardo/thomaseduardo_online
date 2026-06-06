import React from 'react';
import { Deploy } from '../../../types/admin';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export function RecentDeploys({ deploys }: { deploys: Deploy[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-white/[0.01]">
        <h3 className="font-bold text-white tracking-tight uppercase text-xs tracking-[0.2em]">Deploys Recentes</h3>
      </div>
      <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
        {deploys.map((deploy) => (
          <div key={deploy.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                deploy.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                deploy.status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-400/20'
              }`}>
                {deploy.status === 'success' && <CheckCircle2 className="w-4 h-4" />}
                {deploy.status === 'failed' && <XCircle className="w-4 h-4" />}
                {(deploy.status as any) === 'pending' || (deploy.status as any) === 'building' ? <Clock className="w-4 h-4" /> : null}
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{deploy.project}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{deploy.environment}</p>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter opacity-50">{deploy.timestamp}</span>
          </div>
        ))}
        {deploys.length === 0 && <div className="text-center py-10 text-white/20 text-xs font-mono">Nenhum deploy recente.</div>}
      </div>
    </div>
  );
}
