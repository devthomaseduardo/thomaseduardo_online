import React, { useState } from "react";
import { 
  Shield, 
  Database, 
  Bell, 
  HardDrive, 
  Lock, 
  LogOut, 
  User, 
  Globe, 
  Terminal,
  Cpu,
  RefreshCw,
  Activity,
  Key
} from "lucide-react";
import { useToast } from '@/contexts/ToastContext';

export function ConfiguracoesModule() {
  const { showToast } = useToast();

  const handleLogout = () => {
    if (!confirm("Deseja encerrar sua sessão de administrador?")) return;
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const handleSync = () => {
    showToast("Sincronizando com o banco de dados...");
    setTimeout(() => showToast("Sincronização concluída."), 1500);
  };

  return (
    <div className="w-full py-10 px-8 xl:px-12 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Configurações</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Painel de controle do sistema</p>
        </div>
        <button 
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-sm font-semibold transition-all border border-rose-500/10"
        >
          <LogOut className="w-4 h-4" /> Sair do Sistema
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Segurança */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Segurança & Acesso</h3>
                  <p className="text-xs text-white/40">Credenciais e proteção de dados</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <Key className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-white">Senha Mestra</p>
                    <p className="text-xs text-white/30">Atualize sua senha de acesso administrativo</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all border border-white/5">
                  Redefinir
                </button>
              </div>

              <div className="flex items-center justify-between group pt-6 border-t border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <Terminal className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-white">Chaves de API (Vercel/MP)</p>
                    <p className="text-xs text-white/30">Tokens de integração com serviços externos</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all border border-white/5">
                  Gerenciar
                </button>
              </div>

              <div className="flex items-center justify-between group pt-6 border-t border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <Lock className="w-5 h-5 text-emerald-400/40" />
                  <div>
                    <p className="text-sm font-semibold text-white">Autenticação JWT</p>
                    <p className="text-xs text-emerald-400/50">Sessões protegidas com criptografia HS256</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-[10px] font-mono rounded-md border border-emerald-400/10">
                  ATIVO
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#009EE3]/10 border border-[#009EE3]/20 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#009EE3]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Preferências do Sistema</h3>
                  <p className="text-xs text-white/40">Alertas e notificações em tempo real</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              {[
                { label: "Notificar novos Leads", desc: "Receba alertas instantâneos de potenciais clientes" },
                { label: "Relatórios Financeiros", desc: "Resumo semanal de faturamento no e-mail" },
                { label: "Status de Deployment", desc: "Notificar falhas em produção ou staging" }
              ].map((item, i) => (
                <label key={i} className="flex items-center justify-between p-5 bg-[#050505] border border-white/[0.04] rounded-2xl cursor-pointer hover:border-white/10 transition-all group">
                  <div>
                    <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{item.label}</p>
                    <p className="text-[10px] text-white/30">{item.desc}</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/20 after:border-white/5 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#009EE3]/50 peer-checked:after:bg-white" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Status Lateral */}
        <div className="space-y-6">
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-white/30" />
              <h3 className="font-bold text-white">Infraestrutura</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#050505] border border-white/[0.04] rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-white/20" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Servidor API</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-sm font-bold text-white">Operacional</p>
                <p className="text-[10px] text-white/20 mt-1">Latência: 24ms</p>
              </div>

              <div className="p-4 bg-[#050505] border border-white/[0.04] rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-white/20" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Banco Prisma</span>
                  </div>
                  <button onClick={handleSync} className="text-white/30 hover:text-white transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-bold text-white">PostgreSQL Cloud</p>
                <p className="text-[10px] text-white/20 mt-1">Conexões Ativas: 12</p>
              </div>

              <div className="p-4 bg-[#050505] border border-white/[0.04] rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-white/20" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Capa CDN</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-white">Vercel Edge</p>
                <p className="text-[10px] text-white/20 mt-1">Status: Ativo</p>
              </div>
            </div>
          </div>

          <div className="bg-[#009EE3]/5 border border-[#009EE3]/10 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#009EE3]" />
              <h3 className="font-bold text-white">Informações da Conta</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-white/60">Thomas Eduardo</p>
              <p className="text-[10px] font-mono text-white/30 break-all">ID: ADMIN-T3RN-7V1ZU9</p>
              <p className="text-[10px] font-mono text-white/30">Nível: Root / SuperAdmin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
