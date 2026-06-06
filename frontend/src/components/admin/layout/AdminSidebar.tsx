import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  DollarSign, 
  FileSignature, 
  Rocket, 
  Target, 
  MessageSquare, 
  UsersRound, 
  Settings 
} from 'lucide-react';
import { RotatingText } from '../../RotatingText';

const menuItems = [
  { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
  { icon: Briefcase, label: 'Projetos', path: '/admin/projects' },
  { icon: Users, label: 'Clientes', path: '/admin/clients' },
  { icon: FileText, label: 'Propostas', path: '/admin/proposals' },
  { icon: DollarSign, label: 'Financeiro', path: '/admin/financial' },
  { icon: FileSignature, label: 'Contratos', path: '/admin/contracts' },
  { icon: Rocket, label: 'Deploys', path: '/admin/deployments' },
  { icon: Target, label: 'Leads', path: '/admin/leads' },
  { icon: MessageSquare, label: 'Mensagens', path: '/admin/messages', badge: 3 },
  { icon: UsersRound, label: 'Equipe', path: '/admin/team' },
  { icon: Settings, label: 'Configurações', path: '/admin/settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl hidden md:flex flex-col relative z-20">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img src="/logo-preta-branca.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <div className="font-bold text-base text-white tracking-tight leading-none">T3RN</div>
            <div className="text-[10px] text-white/30 font-mono uppercase tracking-[0.2em] mt-1">Painel Admin</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 text-sm group relative ${
                    isActive
                      ? 'bg-white/10 text-white font-medium ring-1 ring-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                      : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 relative z-10">
                      <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-black' : 'bg-white/10 text-white/60 group-hover:text-white'
                      }`}>
                        {item.badge}
                      </span>
                    ) : null}
                    {isActive && (
                      <div className="absolute left-0 w-1 h-4 bg-white rounded-full -translate-x-1" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Area */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 overflow-hidden relative shadow-lg">
            <img src="https://github.com/thomas-lnx.png" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">Thomas Eduardo</p>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest truncate">Root Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
