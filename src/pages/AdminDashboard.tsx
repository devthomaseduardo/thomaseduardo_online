import React, { useState, useEffect } from "react";
import { 
  Search, Plus, MoreHorizontal, CheckCircle2, Clock, 
  DollarSign, Briefcase, Activity, LogOut, Key, Copy, 
  Link as LinkIcon, ArrowRight, ArrowUpRight, FileText, 
  Trash2, Edit2, X, Bell, User, ChevronRight, Folder, 
  CreditCard, Settings, Layers, UploadCloud, Info,
  Download, ExternalLink, GitBranch, Github, BarChart3,
  Globe, Shield, File
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [clientTab, setClientTab] = useState("Overview");
  const [projectClientTab, setProjectClientTab] = useState("Todos");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  
  // Settings State
  const [config, setConfig] = useState({
    commercialName: 'Thomas Eduardo',
    supportEmail: 'contato@thomaseduardo.com',
    pixKey: '12.345.678/0001-90',
    mpToken: 'APP_USR-123456789-XXX'
  });
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  
  // Files State
  const [files, setFiles] = useState([
    { name: "Brandbook_v2_Final.pdf", size: "14.2 MB", date: "Ontem" },
    { name: "Logo_Assets_Pack.zip", size: "45.0 MB", date: "12 Mai 2026" },
    { name: "Copy_Home_Aprovada.docx", size: "1.2 MB", date: "10 Mai 2026" },
    { name: "Contrato_Assinado.pdf", size: "3.4 MB", date: "10 Mai 2026" }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/dashboard');
        const data = await response.json();
        setDashboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const kpis = dashboardData?.kpis || [];
  const pipeline = dashboardData?.pipeline || [];
  const paymentsData = dashboardData?.paymentsData || [];
  
  // Use a hardcoded timeline for now or an empty array if preferred
  const timeline = [
    { time: "Hoje, 14:32", action: "Sleep House enviou material (Catálogo 2026)", type: "material" },
    { time: "Ontem, 16:45", action: "Contrato assinado por Reis do Manto", type: "contract" },
    { time: "Ontem, 10:12", action: "Pagamento confirmado (Casa Lellit - 50%)", type: "payment" },
    { time: "24 Mai, 09:00", action: "Deploy realizado na Vercel (Hazap App)", type: "deploy" }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pago": return "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20";
      case "Pendente": return "text-amber-400 bg-amber-400/10 border border-amber-400/20";
      case "Atrasado": return "text-red-500 bg-red-500/10 border border-red-500/20";
      case "Em revisão": return "text-blue-400 bg-blue-400/10 border border-blue-400/20";
      case "Bloqueado": return "text-red-400 bg-red-400/10 border border-red-400/20";
      case "Em desenvolvimento": return "text-white/70 bg-white/5 border border-white/10";
      case "Assinado": return "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20";
      case "Production": return "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20";
      case "Staging": return "text-purple-400 bg-purple-400/10 border border-purple-400/20";
      default: return "text-white/50 bg-white/5 border border-white/10";
    }
  };

  const getTimelineIcon = (type: string) => {
    switch(type) {
      case "material": return <Folder className="w-3.5 h-3.5 text-white/50" />;
      case "contract": return <FileText className="w-3.5 h-3.5 text-white/50" />;
      case "payment": return <DollarSign className="w-3.5 h-3.5 text-emerald-400/80" />;
      case "deploy": return <Activity className="w-3.5 h-3.5 text-[#009EE3]/80" />;
      default: return <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />;
    }
  };

  const renderTopbar = () => (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4 text-[13px] font-mono tracking-wide">
        <span className="text-white/40">Admin</span>
        {selectedClient && (
          <>
            <ChevronRight className="w-4 h-4 text-white/20" />
            <span className="text-white">{selectedClient.client}</span>
          </>
        )}
        {!selectedClient && (
          <>
            <ChevronRight className="w-4 h-4 text-white/20" />
            <span className="text-white">{activeMenu}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-6">
        <Search className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
        <Bell className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <User className="w-4 h-4 text-white/60" />
        </div>
      </div>
    </header>
  );

  const renderOperacao = () => {
    if (activeMenu === "Clientes") {
      const uniqueClients = pipeline.reduce((acc: any, curr: any) => {
        if (!acc.find((c: any) => c.client === curr.client)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-[1200px] mx-auto py-12 px-8">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Clientes</h1>
              <p className="text-white/50">Gerenciamento da carteira ativa de clientes.</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Novo Cliente
            </button>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-white/5 bg-white/[0.01]">
                <tr>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Contato</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">CNPJ / Doc</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {uniqueClients.map((c: any, i: number) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedClient(c)}>
                    <td className="px-6 py-5 font-medium text-white/90 group-hover:text-white transition-colors">{c.client}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-white/70">{c.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-white/50">
                      {c.phone || "Não informado"}
                    </td>
                    <td className="px-6 py-5">
                      <button className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-2 cursor-pointer">
                        Abrir Perfil <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }

    if (activeMenu === "Projetos") {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-[1200px] mx-auto py-12 px-8">
          <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Projetos</h1>
              <p className="text-white/50">Acompanhamento e gestão de projetos em andamento.</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors cursor-pointer w-fit">
              <Plus className="w-4 h-4" /> Novo Projeto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipeline.map((p: any, i: number) => (
              <div 
                key={i} 
                onClick={() => setSelectedClient(p)}
                className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-3xl p-6 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm text-white/50 border border-white/10 font-bold">
                      {p.client.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white/90 group-hover:text-white transition-colors">{p.client}</h3>
                      <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-0.5">Website Institucional</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10 flex-grow">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">Fase Atual</span>
                      <span className={`inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md ${getStatusColor(p.status)}`}>{p.status}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="bg-white/40 h-1.5 rounded-full" style={{ width: p.progress }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">Financeiro</span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded-md ${getStatusColor(p.payment)}`}>{p.payment}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto relative z-10 flex justify-between items-center">
                  <span className="text-[11px] font-mono text-white/30 group-hover:text-white/50 transition-colors">Progresso: {p.progress}</span>
                  <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-black group-hover:bg-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeMenu === "Pagamentos" || activeMenu === "Financeiro") {
      const latePayments = paymentsData.filter((p: any) => p.status === 'Atrasado');
      
      const calculateTotal = (status: string) => {
        if (!paymentsData || paymentsData.length === 0) return 0;
        return paymentsData
          .filter((p: any) => p.status === status)
          .reduce((acc: number, curr: any) => {
            const val = parseFloat(curr.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
            return acc + (isNaN(val) ? 0 : val);
          }, 0);
      };

      const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

      const totalPago = calculateTotal('Pago');
      const totalPendente = calculateTotal('Pendente');
      const totalAtrasado = calculateTotal('Atrasado');

      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-[1200px] mx-auto py-12 px-8">
           <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Financeiro</h1>
            <p className="text-white/50">Fluxo de caixa e faturamento da operação.</p>
          </div>

          {latePayments.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                   <Bell className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
                <div>
                   <h4 className="text-red-500 font-medium text-lg">Alerta de Inadimplência</h4>
                   <p className="text-red-500/70 text-sm">Você possui {latePayments.length} pagamento(s) em atraso totalizando {formatCurrency(totalAtrasado)}.</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-xl text-sm transition-colors font-bold whitespace-nowrap border border-red-500/30">
                Gerenciar Cobranças
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-all relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Receita Mensal</span>
              <div className="text-4xl font-light tracking-tight text-white mt-4 relative z-10">
                {formatCurrency(totalPago)}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-all relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">A Receber</span>
              <div className="text-4xl font-light tracking-tight text-white mt-4 relative z-10">
                {formatCurrency(totalPendente)}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-all relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors"></div>
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Inadimplência</span>
              <div className="text-4xl font-light tracking-tight text-red-400 mt-4 relative z-10">
                {formatCurrency(totalAtrasado)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Últimas Transações</h2>
            <div className="flex gap-2">
               <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
               </button>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-white/5 bg-white/[0.01]">
                <tr>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Data</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paymentsData.length > 0 ? (
                  paymentsData.map((p: any, i: number) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedClient({ client: p.client, status: 'Active', payment: p.status, progress: '50%' })}>
                      <td className="px-6 py-5 font-mono text-white/50">{p.date}</td>
                      <td className="px-6 py-5 font-medium text-white/90 group-hover:text-white flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white/50 border border-white/10">
                           {p.client.charAt(0)}
                        </div>
                        {p.client}
                      </td>
                      <td className="px-6 py-5 text-white/70">{p.desc}</td>
                      <td className="px-6 py-5 font-mono text-white">{p.value}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor(p.status)}`}>
                          {p.status === 'Atrasado' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse"></span>}
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-white/40 hover:text-white transition-colors text-sm flex items-center justify-end gap-2 w-full">
                          Detalhes <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40 font-mono text-xs uppercase tracking-widest">
                      Nenhuma transação encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }

    if (activeMenu === "Configurações") {
      const handleSaveConfig = () => {
        setIsSavingConfig(true);
        setTimeout(() => {
          setIsSavingConfig(false);
          alert('Configurações salvas com sucesso!');
        }, 1000);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-[1200px] mx-auto py-12 px-8">
           <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Configurações</h1>
            <p className="text-white/50">Ajustes globais do sistema e integrações.</p>
          </div>
          <div className="max-w-3xl space-y-8">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-[13px] font-mono text-white/60 mb-6 uppercase tracking-wider">Perfil da Agência</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 mb-2 uppercase tracking-wider">Nome Comercial</label>
                  <input type="text" value={config.commercialName} onChange={e => setConfig({...config, commercialName: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#009EE3] transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 mb-2 uppercase tracking-wider">E-mail de Suporte</label>
                  <input type="email" value={config.supportEmail} onChange={e => setConfig({...config, supportEmail: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#009EE3] transition-colors" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-[13px] font-mono text-white/60 mb-6 uppercase tracking-wider">Integrações de Pagamento</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 mb-2 uppercase tracking-wider">Chave PIX Principal</label>
                  <input type="text" value={config.pixKey} onChange={e => setConfig({...config, pixKey: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 font-mono text-white outline-none focus:border-[#009EE3] transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 mb-2 uppercase tracking-wider">Mercado Pago Access Token</label>
                  <input type="password" value={config.mpToken} onChange={e => setConfig({...config, mpToken: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 font-mono text-white outline-none focus:border-[#009EE3] transition-colors" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
               <button onClick={handleSaveConfig} disabled={isSavingConfig} className="bg-white text-black px-8 py-3 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50">
                 {isSavingConfig ? 'Salvando...' : 'Salvar Configurações'}
               </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Default Overview
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-[1200px] mx-auto py-12 px-8"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Operação</h1>
          <p className="text-white/50">Monitoramento institucional dos projetos ativos.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-[#009EE3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Line 1 - KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {kpis.map((kpi, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
              key={i} 
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between h-48 group hover:bg-white/[0.04] transition-all relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#009EE3]/5 rounded-full blur-3xl group-hover:bg-[#009EE3]/10 transition-colors"></div>
              <div>
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">{kpi.label}</span>
                {kpi.sub && <span className="block text-[11px] font-mono text-white/30 uppercase tracking-wider mt-1">{kpi.sub}</span>}
              </div>
              <div className="text-4xl font-light tracking-tight text-white mt-auto">
                {kpi.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Line 2 & 3 - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pipeline Operacional */}
          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-mono text-white/40 mb-4 uppercase tracking-wider">Pipeline Operacional</h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="border-b border-white/5 bg-white/[0.01]">
                    <tr>
                      <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Pagamento</th>
                      <th className="px-6 py-5 font-mono text-white/40 text-[11px] uppercase tracking-wider">Progresso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pipeline.map((p, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer group" onClick={() => setSelectedClient(p)}>
                        <td className="px-6 py-5 font-medium text-white/90 group-hover:text-white transition-colors">{p.client}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor(p.payment)}`}>
                            {p.payment}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-mono text-white/50">{p.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-1">
            <h2 className="text-[11px] font-mono text-white/40 mb-4 uppercase tracking-wider">Timeline</h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {timeline.map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-[#050505] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-lg">
                      {getTimelineIcon(event.type)}
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)]">
                      <div className="flex flex-col gap-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <span className="text-[10px] font-mono text-white/40">{event.time}</span>
                        <p className="text-[12px] text-white/70 leading-relaxed">{event.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
          </>
        )}
      </motion.div>
    );
  };

  const renderClientWorkspace = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto py-12 px-8"
    >
      <button 
        onClick={() => setSelectedClient(null)}
        className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Operação
      </button>

      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">{selectedClient.client}</h1>
          <p className="text-white/50">Visão geral do cliente e administração do projeto.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
          <Globe className="w-4 h-4 text-white/50" /> Portal do Cliente <ExternalLink className="w-3 h-3 text-white/50" />
        </button>
      </div>

      {/* Tabs like Payment page */}
      <div className="flex p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl mb-10 w-fit overflow-x-auto">
        {["Overview", "Materiais", "Financeiro", "Contrato", "Deploy", "Analytics", "Arquivos"].map(tab => (
          <button 
            key={tab}
            onClick={() => setClientTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              clientTab === tab ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm min-h-[400px]">
        <AnimatePresence mode="wait">
          {clientTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                  <h3 className="text-[11px] font-mono text-white/40 mb-6 uppercase tracking-wider">Status Atual</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-sm text-white/60">Fase do Projeto</span>
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor(selectedClient.status)}`}>
                        {selectedClient.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-sm text-white/60">Saúde Financeira</span>
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor(selectedClient.payment)}`}>
                        {selectedClient.payment}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-sm text-white/60">Progresso Geral</span>
                      <span className="text-lg font-mono text-white">{selectedClient.progress}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                  <h3 className="text-[11px] font-mono text-white/40 mb-6 uppercase tracking-wider">Ações Rápidas</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm py-4 px-6 flex justify-between items-center transition-colors">
                      <span>Solicitar Reunião de Alinhamento</span>
                      <ArrowUpRight className="w-4 h-4 text-white/40" />
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm py-4 px-6 flex justify-between items-center transition-colors">
                      <span>Enviar Lembrete de Pagamento</span>
                      <ArrowUpRight className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {clientTab === "Financeiro" && (
            <motion.div
              key="finance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
               <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 relative overflow-hidden mb-8 max-w-4xl mx-auto">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                   <DollarSign className="w-64 h-64 text-white" />
                 </div>
                 
                 <h3 className="text-[11px] font-mono text-white/40 mb-8 uppercase tracking-wider relative z-10">Invoice principal</h3>
                 
                 <div className="mb-12 relative z-10">
                   <div className="text-lg text-white/70 mb-2 font-medium">Projeto Institucional</div>
                   <div className="text-5xl md:text-6xl font-bold tracking-tight text-white">R$ 5.700<span className="text-3xl text-white/40">,00</span></div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mb-8">
                   <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 cursor-pointer transition-colors border-l-4 border-l-[#009EE3]">
                     <div className="text-sm text-white font-medium mb-1">PIX</div>
                     <div className="text-[11px] text-white/50 font-mono">Confirmação imediata</div>
                   </div>
                   <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 cursor-pointer transition-colors">
                     <div className="text-sm text-white/70 font-medium mb-1">Cartão</div>
                     <div className="text-[11px] text-white/50 font-mono">Via Mercado Pago</div>
                   </div>
                   <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 cursor-pointer transition-colors">
                     <div className="text-sm text-white/70 font-medium mb-1">Boleto</div>
                     <div className="text-[11px] text-white/50 font-mono">Até 3 dias úteis</div>
                   </div>
                 </div>

                 <div className="bg-black/40 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 p-3">
                      <div className="w-full h-full border-2 border-white/20 border-dashed rounded-xl opacity-50 relative flex items-center justify-center">
                         <QrCode className="w-10 h-10 text-white/20" />
                      </div>
                    </div>
                    <div className="w-full text-center md:text-left">
                      <p className="text-sm text-white/60 mb-4">Aguardando pagamento via Pix. Envie o QR code ou a chave PIX Copia e Cola para o cliente.</p>
                      <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2 hover:bg-white/90 transition-colors w-full md:w-auto">
                        <Copy className="w-4 h-4" /> Copiar Chave Pix
                      </button>
                    </div>
                 </div>
               </div>

               <div className="max-w-4xl mx-auto">
                 <h3 className="text-[11px] font-mono text-white/40 mb-6 uppercase tracking-wider">Histórico de Transações</h3>
                 <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/5 bg-white/[0.02]">
                          <tr>
                            <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Data</th>
                            <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-5 font-mono text-white/50 text-[12px]">12 Mai 2026</td>
                            <td className="px-6 py-5 text-white/90">Sinal 50%</td>
                            <td className="px-6 py-5 font-mono text-white/70">R$ 2.850,00</td>
                            <td className="px-6 py-5"><span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-mono ${getStatusColor("Pago")}`}>Confirmado</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                 </div>
               </div>
            </motion.div>
          )}

          {clientTab === "Materiais" && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto space-y-4"
            >
               {[
                 { title: "Identidade Visual", status: "Aprovado", items: ["Logo em Vetor", "Manual da Marca", "Tipografia"] },
                 { title: "Copywriting", status: "Pendente", items: ["Textos da Home", "Sobre nós", "Serviços"] },
                 { title: "Mídia & Fotografia", status: "Em revisão", items: ["Fotos do Escritório", "Retratos da Equipe"] }
               ].map((section, idx) => (
                 <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden group">
                    <div className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/[0.02] transition-colors border-b border-white/5">
                      <h3 className="text-base font-medium text-white/90">{section.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-mono ${getStatusColor(section.status)}`}>
                        {section.status}
                      </span>
                    </div>
                    <div className="p-6 bg-black/20">
                      <ul className="space-y-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex justify-between items-center text-sm">
                            <span className="text-white/60 flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                              {item}
                            </span>
                            <button className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10">
                              <UploadCloud className="w-3.5 h-3.5" /> Anexar
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {clientTab === "Contrato" && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto"
            >
               <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                   <Shield className="w-8 h-8 text-emerald-400" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">Contrato Assinado</h2>
                 <p className="text-white/50 mb-8 max-w-md">O contrato de prestação de serviços foi assinado digitalmente por ambas as partes no dia 10 de Maio de 2026.</p>
                 
                 <div className="flex gap-4 w-full md:w-auto">
                    <button className="bg-white text-black px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors w-full md:w-auto">
                      <Download className="w-4 h-4" /> Baixar PDF
                    </button>
                    <button className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors w-full md:w-auto">
                      <ExternalLink className="w-4 h-4" /> Ver Autenticidade
                    </button>
                 </div>
               </div>
            </motion.div>
          )}

          {clientTab === "Deploy" && (
             <motion.div
               key="deploy"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="max-w-4xl mx-auto space-y-6"
             >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                     <div className="flex justify-between items-start mb-6">
                       <div>
                         <h3 className="text-lg font-medium text-white mb-1">Production</h3>
                         <p className="text-[11px] font-mono text-white/40">main branch</p>
                       </div>
                       <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor("Production")}`}>Online</span>
                     </div>
                     <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6 font-mono text-sm text-white/70 flex justify-between items-center">
                        <span className="truncate mr-4">https://{selectedClient.client.toLowerCase().replace(/\s/g, '')}.com</span>
                        <ExternalLink className="w-4 h-4 text-white/30 shrink-0 cursor-pointer hover:text-white" />
                     </div>
                     <button className="text-[12px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                       Ver Logs de Build
                     </button>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                     <div className="flex justify-between items-start mb-6">
                       <div>
                         <h3 className="text-lg font-medium text-white mb-1">Staging</h3>
                         <p className="text-[11px] font-mono text-white/40">staging branch</p>
                       </div>
                       <span className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg ${getStatusColor("Staging")}`}>Building</span>
                     </div>
                     <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6 font-mono text-sm text-white/70 flex justify-between items-center">
                        <span className="truncate mr-4">https://staging.{selectedClient.client.toLowerCase().replace(/\s/g, '')}.com</span>
                        <ExternalLink className="w-4 h-4 text-white/30 shrink-0 cursor-pointer hover:text-white" />
                     </div>
                     <button className="text-[12px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                       Ver Logs de Build
                     </button>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                  <h3 className="text-[11px] font-mono text-white/40 mb-6 uppercase tracking-wider">Histórico de Commits</h3>
                  <div className="space-y-4">
                     {[
                       { message: "Update copy in about page", hash: "a1b2c3d", time: "2 horas atrás", author: "Thomas Eduardo" },
                       { message: "Fix layout shift on mobile menu", hash: "f9e8d7c", time: "5 horas atrás", author: "Thomas Eduardo" },
                       { message: "Add new product images to gallery", hash: "4a5b6c7", time: "Ontem", author: "Thomas Eduardo" }
                     ].map((commit, i) => (
                       <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                         <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                               <GitBranch className="w-4 h-4 text-white/50" />
                            </div>
                            <div>
                               <p className="text-sm text-white/90">{commit.message}</p>
                               <div className="flex items-center gap-2 mt-1">
                                 <span className="text-[11px] font-mono text-[#009EE3]">{commit.hash}</span>
                                 <span className="text-[11px] font-mono text-white/30">•</span>
                                 <span className="text-[11px] font-mono text-white/40">{commit.time}</span>
                               </div>
                            </div>
                         </div>
                         <div className="hidden md:flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10"></div>
                            <span className="text-[11px] font-mono text-white/40">{commit.author}</span>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
             </motion.div>
          )}

          {clientTab === "Analytics" && (
             <motion.div
               key="analytics"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="max-w-4xl mx-auto"
             >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                   <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                     <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Acessos Únicos (30d)</span>
                     <div className="text-3xl font-light text-white mt-3">12.450</div>
                     <span className="text-emerald-400 text-[11px] font-mono mt-2 block">+14.5% vs mês anterior</span>
                   </div>
                   <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                     <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Taxa de Conversão</span>
                     <div className="text-3xl font-light text-white mt-3">3.2%</div>
                     <span className="text-emerald-400 text-[11px] font-mono mt-2 block">+0.4% vs mês anterior</span>
                   </div>
                   <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                     <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Uptime (90d)</span>
                     <div className="text-3xl font-light text-white mt-3">99.9%</div>
                     <span className="text-white/40 text-[11px] font-mono mt-2 block">Estável</span>
                   </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                  <BarChart3 className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Integração com Google Analytics</h3>
                  <p className="text-white/40 text-sm max-w-md">Para visualizar gráficos detalhados de tráfego e comportamento, conecte a conta do Google Analytics deste projeto em Configurações.</p>
                  <button className="mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-xl text-sm transition-colors">
                    Configurar Integração
                  </button>
                </div>
             </motion.div>
          )}

          {clientTab === "Arquivos" && (() => {
             const handleUpload = () => {
               const newFile = { name: "Novo_Arquivo_Simulado.png", size: "2.1 MB", date: "Agora" };
               setFiles([newFile, ...files]);
               alert('Upload simulado concluído com sucesso!');
             };
             
             return (
             <motion.div
               key="arquivos"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="max-w-4xl mx-auto"
             >
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Repositório de Arquivos</h3>
                   <button onClick={handleUpload} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-[12px] font-mono uppercase tracking-widest transition-colors flex items-center gap-2">
                     <UploadCloud className="w-3.5 h-3.5" /> Novo Upload
                   </button>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                   <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead className="border-b border-white/5 bg-white/[0.02]">
                       <tr>
                         <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Nome do Arquivo</th>
                         <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Tamanho</th>
                         <th className="px-6 py-4 font-mono text-white/40 text-[11px] uppercase tracking-wider">Data</th>
                         <th className="px-6 py-4"></th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {files.map((file, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 text-white/90 flex items-center gap-3">
                              <File className="w-4 h-4 text-white/40" /> {file.name}
                            </td>
                            <td className="px-6 py-4 font-mono text-white/50 text-[12px]">{file.size}</td>
                            <td className="px-6 py-4 font-mono text-white/50 text-[12px]">{file.date}</td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-white/40 hover:text-white transition-colors">
                                 <Download className="w-4 h-4" />
                               </button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
             </motion.div>
             );
          })()}

          {/* Fallback tab catch-all */}
          {!["Overview", "Financeiro", "Materiais", "Contrato", "Deploy", "Analytics", "Arquivos"].includes(clientTab) && (
             <motion.div
               key="placeholder"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.2 }}
               className="p-12 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col items-center justify-center min-h-[300px] max-w-4xl mx-auto"
             >
               <Info className="w-8 h-8 text-white/20 mb-4" />
               <p className="text-white/40 font-mono text-[12px] uppercase tracking-widest text-center">Módulo "{clientTab}" em desenvolvimento</p>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const menuItems = [
    { name: "Overview", icon: Activity },
    { name: "Clientes", icon: UsersIcon },
    { name: "Projetos", icon: Briefcase },
    { name: "Financeiro", icon: DollarSign },
    { name: "Configurações", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden selection:bg-[#009EE3]/30">
      
      {/* Sidebar Lateral Fixa */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex-shrink-0 flex flex-col relative z-20">
        <div className="h-16 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
               <div className="w-2 h-2 rounded-sm bg-black" />
             </div>
             <span className="font-bold tracking-tight text-white text-sm">AGÊNCIA</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveMenu(item.name);
                setSelectedClient(null); // Reset client view when navigating main menu
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                activeMenu === item.name && !selectedClient
                  ? "bg-white/[0.08] text-white shadow-sm border border-white/5" 
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeMenu === item.name && !selectedClient ? "text-white" : "text-white/40"}`} strokeWidth={2} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => navigate("/")} className="w-full text-white/40 hover:text-white text-[11px] font-mono uppercase tracking-widest transition-colors flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5">
            <LogOut className="w-4 h-4" strokeWidth={2} />
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {renderTopbar()}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {selectedClient ? (
              <motion.div key="client" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {renderClientWorkspace()}
              </motion.div>
            ) : (
              <motion.div key={activeMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {renderOperacao()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Extracted from Lucide since Users doesn't always render fine as UsersIcon alias inline if not imported properly
function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function QrCode(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

function ArrowLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

export default AdminDashboard;
