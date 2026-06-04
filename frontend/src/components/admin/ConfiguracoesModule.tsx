import React from "react";
import { Settings, Shield, Key, Bell, Database, HardDrive, Lock } from "lucide-react";

export function ConfiguracoesModule() {
  return (
    <div className="w-full py-6 px-5 md:py-10 md:px-10 space-y-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Configurações</h1>
        <p className="text-white/30 text-sm">Núcleo do sistema e preferências operacionais.</p>
      </div>

      <div className="space-y-8">
        <section className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
            <Shield className="w-5 h-5 text-white/40" />
            <h3 className="font-semibold text-white">Segurança & Acesso</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white mb-1">Chave de Acesso Administrativa</p>
                <p className="text-xs text-white/40">Senha utilizada no login do painel.</p>
              </div>
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                Alterar
              </button>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
              <div>
                <p className="text-sm font-medium text-white mb-1">Autenticação em Dois Fatores (2FA)</p>
                <p className="text-xs text-white/40">Segurança adicional para o admin.</p>
              </div>
              <button className="bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-4 py-2 rounded-lg text-xs font-semibold">
                Ativado
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
            <Database className="w-5 h-5 text-white/40" />
            <h3 className="font-semibold text-white">Sistema & Infraestrutura</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#050505] border border-white/[0.04] p-5 rounded-xl">
              <HardDrive className="w-5 h-5 text-white/30 mb-3" />
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Banco de Dados</p>
              <p className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Sincronizado
              </p>
            </div>
            <div className="bg-[#050505] border border-white/[0.04] p-5 rounded-xl">
              <Lock className="w-5 h-5 text-white/30 mb-3" />
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Criptografia (JWT)</p>
              <p className="text-sm font-medium text-white">Ativa (HS256)</p>
            </div>
          </div>
        </section>

        <section className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
            <Bell className="w-5 h-5 text-white/40" />
            <h3 className="font-semibold text-white">Notificações</h3>
          </div>
          <div className="p-6 space-y-4">
            {["Alerta de novos uploads", "Avisos de pagamentos", "Falhas de deploy"].map((l, i) => (
              <label key={i} className="flex items-center justify-between p-4 bg-[#050505] border border-white/[0.04] rounded-xl cursor-pointer hover:border-white/10 transition-colors">
                <span className="text-sm text-white/80">{l}</span>
                <input type="checkbox" defaultChecked className="accent-[#009EE3] w-4 h-4 cursor-pointer" />
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
