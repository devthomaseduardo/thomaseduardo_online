import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md hidden md:block group">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search projects, clients, proposals..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)]">
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">Create New</span>
        </button>
        
        <div className="w-px h-8 bg-white/5 mx-2"></div>
        
        <button className="text-zinc-500 hover:text-white transition-all relative p-2 rounded-xl hover:bg-white/5 group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}
