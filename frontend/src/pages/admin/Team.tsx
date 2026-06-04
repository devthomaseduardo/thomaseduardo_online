import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Shield, Mail } from 'lucide-react';

const mockTeam = [
  { id: '1', name: 'Thomas Eduardo', role: 'Lead Developer', status: 'Active', email: 'thomas@t3rn.com', lastActive: 'Agora', isAdmin: true },
  { id: '2', name: 'Sarah Lima', role: 'UI/UX Designer', status: 'Active', email: 'sarah@t3rn.com', lastActive: 'Há 5 min', isAdmin: false },
  { id: '3', name: 'Marcos Silva', role: 'Backend Dev', status: 'Away', email: 'marcos@t3rn.com', lastActive: 'Há 2 horas', isAdmin: false },
  { id: '4', name: 'Julia Costa', role: 'Project Manager', status: 'Offline', email: 'julia@t3rn.com', lastActive: 'Ontem', isAdmin: true },
];

export function Team() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Equipe</h1>
          <p className="text-zinc-500 text-sm">Gerencie o acesso e permissões dos membros da equipe T3RN.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Adicionar Membro
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar membros..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Papel</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Último Acesso</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockTeam.map(m => (
                <tr key={m.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs text-zinc-400 font-bold">
                      {m.name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {m.name}
                        {m.isAdmin && <Shield className="w-3 h-3 text-amber-500" />}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400">{m.role}</td>
                  <td className="p-4 text-zinc-400 flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {m.email}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-emerald-500' : m.status === 'Away' ? 'bg-amber-500' : 'bg-zinc-600'}`}></div>
                      <span className="text-xs text-zinc-400">{m.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-500 text-right text-xs">{m.lastActive}</td>
                  <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
