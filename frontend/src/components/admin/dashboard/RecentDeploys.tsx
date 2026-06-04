import React from 'react';
import { Deploy } from '../../../types/admin';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export function RecentDeploys({ deploys }: { deploys: Deploy[] }) {
  return (
    <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden h-full">
      <div className="p-5 border-b border-[#222]">
        <h3 className="font-semibold text-white">Deploys Recentes</h3>
      </div>
      <div className="p-5 space-y-4">
        {deploys.map((deploy) => (
          <div key={deploy.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {deploy.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {deploy.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
              {deploy.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
              
              <div>
                <p className="text-sm font-medium text-zinc-200">{deploy.project}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{deploy.environment}</p>
              </div>
            </div>
            <span className="text-xs text-zinc-500">{deploy.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
