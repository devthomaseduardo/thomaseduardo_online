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
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
  { icon: Users, label: 'Clients', path: '/admin/clients' },
  { icon: FileText, label: 'Proposals', path: '/admin/proposals' },
  { icon: DollarSign, label: 'Financial', path: '/admin/financial' },
  { icon: FileSignature, label: 'Contracts', path: '/admin/contracts' },
  { icon: Rocket, label: 'Deployments', path: '/admin/deployments' },
  { icon: Target, label: 'Leads', path: '/admin/leads' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badge: 3 },
  { icon: UsersRound, label: 'Team', path: '/admin/team' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-[#222] bg-[#050505] hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-[#222]">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-semibold text-sm"><RotatingText /></div>
            <div className="text-xs text-zinc-500">Centro de Operações</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-md transition-colors text-sm ${
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Area */}
      <div className="p-4 border-t border-[#222]">
        <div className="bg-[#111] p-3 rounded-md border border-[#222] mb-4">
          <div className="text-xs font-semibold text-zinc-300 mb-1">Plano Ativo</div>
          <div className="text-[10px] text-zinc-500 flex justify-between items-center">
            <span>T3RN Enterprise</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
            <img src="https://github.com/thomas-lnx.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate"><RotatingText /></p>
            <p className="text-xs text-zinc-500 truncate">Software Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
