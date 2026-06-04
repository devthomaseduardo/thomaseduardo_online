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
    <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden h-full">
      <div className="p-5 border-b border-[#222]">
        <h3 className="font-semibold text-white">Atividades Recentes</h3>
      </div>
      <div className="p-5 space-y-6">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="flex gap-4 relative">
              {index !== activities.length - 1 && (
                <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-[#222]"></div>
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border border-[#222] ${config.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-zinc-200">{activity.title}</p>
                  <span className="text-[10px] text-zinc-500">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-400">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
