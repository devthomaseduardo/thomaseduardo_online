import React from 'react';
import { Deadline } from '../../../types/admin';
import { Calendar } from 'lucide-react';

export function UpcomingDeadlines({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden h-full">
      <div className="p-5 border-b border-[#222]">
        <h3 className="font-semibold text-white">Próximos Prazos</h3>
      </div>
      <div className="p-5 space-y-4">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="flex items-center justify-between p-3 rounded-md bg-[#111] border border-[#222]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1A1A1A] rounded text-zinc-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{deadline.title}</p>
                <p className="text-xs text-zinc-500">{deadline.project}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
              {deadline.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
