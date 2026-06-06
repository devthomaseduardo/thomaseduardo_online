import React from 'react';
import { ActivityItem } from '../../../types/admin';
import { Rocket, DollarSign, FileText, MessageSquare } from 'lucide-react';

const typeConfig = {
  deploy: { icon: Rocket, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  payment: { icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  proposal: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  message: { icon: MessageSquare, color: 'text-zinc-400', bg: 'bg-zinc-800' },
};

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/[0.04] transition-all duration-500">
      <div className="p-6 border-b border-white/5">
        <h3 className="font-bold text-white tracking-tight">Recent Activity</h3>
      </div>
      <div className="p-8 space-y-8 flex-1 overflow-y-auto scrollbar-hide">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type] || typeConfig.message;
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="flex gap-5 relative group">
              {index !== activities.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-[-32px] w-px bg-white/5 group-hover:bg-white/10 transition-colors"></div>
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300 ${config.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex justify-between items-start mb-1.5">
                  <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{activity.title}</p>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
