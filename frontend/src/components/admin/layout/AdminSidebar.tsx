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
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg">
            <img src="/logo-preta-branca.png" alt="Logo" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight">T3RN</div>
            <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Operations Center</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm group ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-lg shadow-white/5'
                      : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 duration-300`} />
                  {item.label}
                </div>
                {item.badge ? (
                  <span className="bg-white/10 text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Area */}
      <div className="p-4 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative group">
            <img src="https://github.com/thomas-lnx.png" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Thomas Eduardo</p>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest truncate">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
