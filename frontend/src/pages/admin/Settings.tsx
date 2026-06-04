import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Monitor, Key, Check, Eye, EyeOff } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'security', icon: Shield, label: 'Segurança' },
    { id: 'notifications', icon: Bell, label: 'Notificações' },
    { id: 'appearance', icon: Monitor, label: 'Aparência' },
    { id: 'billing', icon: CreditCard, label: 'Faturamento' },
    { id: 'api_keys', icon: Key, label: 'API Keys' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Configurações</h1>
        <p className="text-zinc-500 text-sm mt-1">Gerencie as preferências da sua conta e configurações do sistema.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-1 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#111] text-white' 
                    : 'text-zinc-400 hover:bg-[#111] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Informações Pessoais</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xl text-zinc-400 font-bold overflow-hidden border border-[#222]">
                      <img src="/logo.png" alt="Avatar" className="w-full h-full object-contain p-2" />
                    </div>
                    <div>
                      <button className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-md mr-2 hover:bg-zinc-200 transition-colors">Alterar Foto</button>
                      <button className="px-3 py-1.5 bg-transparent border border-[#333] text-zinc-300 text-xs font-medium rounded-md hover:bg-[#111] transition-colors">Remover</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Nome</label>
                      <input type="text" defaultValue="Thomas" className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Sobrenome</label>
                      <input type="text" defaultValue="Eduardo" className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">E-mail</label>
                    <input type="email" defaultValue="thomas@t3rn.com" className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none transition-colors" />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#222] flex justify-end">
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6 border-red-500/20">
                <h2 className="text-lg font-semibold text-red-500 mb-1">Zona de Perigo</h2>
                <p className="text-sm text-zinc-500 mb-4">Ações irreversíveis relacionadas à sua conta.</p>
                <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors">
                  Desativar Conta
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Alterar Senha</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Nova Senha</label>
                    <input type="password" placeholder="Mínimo 8 caracteres" className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#222] flex justify-end">
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                    Atualizar Senha
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-1">Autenticação de Dois Fatores (2FA)</h2>
                <p className="text-sm text-zinc-500 mb-4">Adicione uma camada extra de segurança à sua conta.</p>
                <button className="bg-[#111] border border-[#333] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1a1a1a] transition-colors">
                  Habilitar 2FA
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Preferências de Notificação</h2>
              
              <div className="space-y-6">
                {/* Section */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">Alertas do Sistema</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-1 bg-[#111] border-[#333] rounded" />
                      <div>
                        <div className="text-sm text-white">Falhas de Deploy</div>
                        <div className="text-xs text-zinc-500">Notificar imediatamente se um deploy falhar em produção.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-1 bg-[#111] border-[#333] rounded" />
                      <div>
                        <div className="text-sm text-white">Atualizações de Segurança</div>
                        <div className="text-xs text-zinc-500">Avisos importantes sobre a infraestrutura.</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="h-px bg-[#222] w-full" />

                {/* Section */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">Atividades de Clientes</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-1 bg-[#111] border-[#333] rounded" />
                      <div>
                        <div className="text-sm text-white">Novos Leads</div>
                        <div className="text-xs text-zinc-500">Receber e-mail quando um novo lead for cadastrado.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-1 bg-[#111] border-[#333] rounded" />
                      <div>
                        <div className="text-sm text-white">Propostas Aceitas</div>
                        <div className="text-xs text-zinc-500">Notificar quando o cliente assinar a proposta.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 bg-[#111] border-[#333] rounded" />
                      <div>
                        <div className="text-sm text-white">Novas Mensagens</div>
                        <div className="text-xs text-zinc-500">Notificar a cada mensagem recebida (pode ser ruidoso).</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#222] flex justify-end">
                <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Aparência do Sistema</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">Tema</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="border-2 border-white bg-[#050505] rounded-lg p-4 flex flex-col items-center gap-2 transition-all">
                      <div className="w-12 h-12 bg-black rounded-full border border-[#222] flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Dark Premium</span>
                      <span className="text-[10px] text-zinc-500">(Atual) Padrão T3RN</span>
                    </button>
                    <button className="border-2 border-transparent bg-[#111] hover:border-[#333] rounded-lg p-4 flex flex-col items-center gap-2 transition-all opacity-50 cursor-not-allowed">
                      <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-black" />
                      </div>
                      <span className="text-sm font-medium text-zinc-400">Light Mode</span>
                      <span className="text-[10px] text-zinc-500">Em Breve</span>
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#222] w-full" />

                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">Densidade de Dados</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="density" defaultChecked className="mt-1" />
                      <div>
                        <div className="text-sm text-white">Confortável</div>
                        <div className="text-xs text-zinc-500">Mais espaço em branco e padding nas tabelas.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="density" className="mt-1" />
                      <div>
                        <div className="text-sm text-white">Compacta</div>
                        <div className="text-xs text-zinc-500">Mais informações visíveis ao mesmo tempo, ideal para telas menores.</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Plano Atual</h2>
                    <p className="text-sm text-zinc-500 mt-1">Você está no plano T3RN Enterprise.</p>
                  </div>
                  <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded">ATIVO</span>
                </div>
                
                <div className="bg-[#111] border border-[#222] rounded-lg p-4 mb-6">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-white">R$ 299</span>
                    <span className="text-sm text-zinc-500">/mês</span>
                  </div>
                  <p className="text-xs text-zinc-400">Próxima cobrança em 15 de Julho de 2026.</p>
                </div>

                <div className="flex gap-3">
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                    Gerenciar Assinatura
                  </button>
                  <button className="bg-transparent border border-[#333] text-zinc-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-[#111] transition-colors">
                    Ver Faturas
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Método de Pagamento</h2>
                <div className="flex items-center justify-between bg-[#111] border border-[#222] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-white">
                      VISA
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">•••• •••• •••• 4242</div>
                      <div className="text-xs text-zinc-500">Expira em 12/28</div>
                    </div>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-white transition-colors">Editar</button>
                </div>
              </div>
            </div>
          )}

          {/* API KEYS */}
          {activeTab === 'api_keys' && (
            <div className="bg-[#0B0B0B] border border-[#222] rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Chaves de API</h2>
                  <p className="text-sm text-zinc-500 mt-1">Gerencie chaves para acesso à API REST do Centro de Operações.</p>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                  Gerar Nova Chave
                </button>
              </div>
              
              <div className="border border-[#222] rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#111]">
                      <th className="p-4 font-medium">Nome</th>
                      <th className="p-4 font-medium">Token</th>
                      <th className="p-4 font-medium">Último Uso</th>
                      <th className="p-4 font-medium w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-[#222] hover:bg-[#111] transition-colors">
                      <td className="p-4 text-zinc-300 font-medium">Integração Stripe</td>
                      <td className="p-4 text-zinc-500 font-mono">pk_live_••••••••••••83a9</td>
                      <td className="p-4 text-zinc-500 text-xs">Hoje, 14:32</td>
                      <td className="p-4">
                        <button className="text-red-500 hover:text-red-400 text-xs font-medium transition-colors">Revogar</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#111] transition-colors">
                      <td className="p-4 text-zinc-300 font-medium">Zapier Webhooks</td>
                      <td className="p-4 text-zinc-500 font-mono">pk_live_••••••••••••2f11</td>
                      <td className="p-4 text-zinc-500 text-xs">Ontem, 09:15</td>
                      <td className="p-4">
                        <button className="text-red-500 hover:text-red-400 text-xs font-medium transition-colors">Revogar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
