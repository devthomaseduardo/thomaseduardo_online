import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-300 font-sans overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
