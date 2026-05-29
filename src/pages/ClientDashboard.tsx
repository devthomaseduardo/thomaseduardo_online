import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Circle, 
  Globe, 
  Server, 
  Link as LinkIcon, 
  FileText, 
  LogOut, 
  ArrowLeft,
  MessageSquarePlus,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Activity,
  Download,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // overview, chamados, financeiro
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      const token = localStorage.getItem("clientToken");
      if (!token) {
        navigate("/portal");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/clients/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Não autorizado");
        }

        const data = await res.json();
        setClientData(data);
      } catch (err) {
        localStorage.removeItem("clientToken");
        navigate("/portal");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientId");
    navigate("/portal");
  };

  if (loading) {
    return <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center">Carregando...</div>;
  }

  if (!clientData) return null;

  const getOverview = () => {
    const projetos = clientData.projects?.length || 0;
    const entregues = clientData.projects?.filter((p: any) => p.phase === "Entregue").length || 0;
    const dominios = projetos; // simplifying for now
    return { projetos, entregues, pagamentoStatus: "Regular", dominios };
  };

  const handlePayment = async (projectId: string, amount: number) => {
    try {
      const res = await fetch("http://localhost:3001/api/payments/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, amount })
      });
      const data = await res.json();
      if (data.invoiceId) {
        alert("Fatura criada com sucesso! ID: " + data.invoiceId + " - Redirecionando para pagamento...");
        // Here we would redirect to Mercado Pago or show payment modal
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar pagamento.");
    }
  };

  const getFinanceiro = () => {
    const receitaTotal = clientData.projects?.reduce((acc: number, p: any) => acc + (p.value || 0), 0) || 0;
    const recebido = 0; // Backend doesn't track paid amount easily without invoices yet
    const pendente = receitaTotal - recebido;
    const tabela = clientData.projects?.map((p: any) => ({
      projeto: p.name,
      valor: `R$ ${p.value}`,
      pago: "R$ 0",
      restante: `R$ ${p.value}`
    })) || [];
    return { receitaTotal, recebido, pendente, tabela };
  };

  const overview = getOverview();
  const financeiro = getFinanceiro();
  const projects = clientData.projects || [];

  const renderProjectOverview = () => (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="max-w-3xl">
        <h1 className="text-[40px] md:text-[48px] leading-[1.1] font-semibold tracking-[-0.04em] mb-4 text-[#EDEDED]">
          Sua infraestrutura digital.
        </h1>
        <p className="text-[#A1A1AA] text-[16px] leading-relaxed max-w-xl">
          Acompanhe o progresso, saúde financeira e o status operacional dos seus ecossistemas.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222222] border border-[#222222] rounded-2xl overflow-hidden">
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Projetos</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED]">{overview.projetos}</span>
        </div>
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Entregues</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED]">{overview.entregues}</span>
        </div>
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Pagamentos</span>
          <span className="text-xl md:text-2xl font-medium tracking-tight text-[#EDEDED] mt-3 block">{overview.pagamentoStatus}</span>
        </div>
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Domínios</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED]">{overview.dominios}</span>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#666666] font-semibold mb-8">Operações Ativas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProject(p)}
              className="bg-[#0A0A0A] border border-[#222222] hover:border-[#444444] rounded-2xl p-8 cursor-pointer transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-2xl font-medium tracking-tight text-[#EDEDED] group-hover:text-white transition-colors">{p.name}</h3>
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#111111] border border-[#222222] text-[#A1A1AA]">
                  {p.phase}
                </span>
              </div>
              <p className="text-[13px] text-[#666666] mb-8 font-medium">Serviço: <span className="text-[#A1A1AA]">Landing Page / Website</span></p>
              
              <div className="flex justify-between items-center border-t border-[#222222] pt-6">
                <span className="text-[#666666] text-[12px] font-medium tracking-wide">Atualizado</span>
                <button className="text-[12px] font-medium text-[#A1A1AA] flex items-center gap-2 group-hover:text-white transition-colors">
                  Acessar Operação <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetail = () => {
    const p = selectedProject;
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-[#666666] hover:text-[#EDEDED] text-[12px] uppercase tracking-wider font-semibold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para operações
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-[40px] md:text-[48px] leading-[1.1] font-semibold tracking-[-0.04em] mb-4 text-[#EDEDED]">{p.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center gap-2">
                <Circle className="w-1.5 h-1.5 fill-current" />
                {p.phase}
              </span>
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#111111] border border-[#222222] text-[#A1A1AA]">
                {p.financial}
              </span>
              {p.hasDomainHosting && (
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#111111] border border-[#222222] text-[#A1A1AA]">
                  Domínio + Infra
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-[#0A0A0A] border border-[#222222] text-[#EDEDED] px-6 py-3 rounded-xl text-[13px] font-medium hover:bg-[#111111] transition-all flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" /> Produção
            </button>
            <button className="flex-1 md:flex-none bg-[#EDEDED] text-black px-6 py-3 rounded-xl text-[13px] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2">
              <MessageSquarePlus className="w-4 h-4" /> Chamado
            </button>
          </div>
        </div>

        {/* Bento Grid - Quick Answers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#222222] border border-[#222222] rounded-2xl overflow-hidden mt-8">
          {/* Serviço Contratado */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between">
            <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Serviço</span>
            <span className="text-[#EDEDED] font-light text-2xl tracking-tight leading-tight">Web Dev</span>
          </div>

          {/* Financeiro */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between">
            <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Financeiro</span>
            <div className="flex items-center gap-2">
              <span className="text-[#EDEDED] font-light text-2xl tracking-tight leading-tight">{p.financial}</span>
            </div>
          </div>

          {/* Status Online */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between">
            <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Produção</span>
            <div className="flex flex-col">
              <span className="text-green-500 font-light text-2xl tracking-tight flex items-center gap-2">
                <Circle className="w-2 h-2 fill-current" /> {p.phase === "Entregue" || p.phase === "Finalizado" ? "Online" : "Pendente"}
              </span>
              <span className="text-[#A1A1AA] text-[12px] truncate mt-2 font-medium">site.com.br</span>
            </div>
          </div>

          {/* Ação Pendente */}
          <div 
            className="bg-orange-500/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:bg-orange-500/10 transition-colors"
            onClick={() => navigate("/portal/pagamento")}
          >
            <span className="text-orange-500/80 text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Ação Pendente</span>
            <span className="text-orange-500 font-medium text-xl pr-6 leading-tight">
              Acessar Pagamentos
            </span>
            <ArrowRight className="w-4 h-4 text-orange-500 absolute bottom-8 right-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Timeline / Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 text-[#666666]">
                  <Activity className="w-4 h-4" /> Timeline Operacional
                </h3>
                <span className="text-[12px] font-medium text-[#A1A1AA]">Status: {p.phase}</span>
              </div>
              <div className="relative pl-2">
                <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[#222222]"></div>
                <div className="space-y-8">
                  {[
                    { label: "Aguardando Sinal", done: p.phase !== "Aguardando Sinal" && p.phase !== "Projeto Congelado" },
                    { label: "Aprovação", done: p.phase !== "Aguardando Sinal" && p.phase !== "Aprovação" && p.phase !== "Projeto Congelado" },
                    { label: "Em Desenvolvimento", done: p.phase === "Entregue" || p.phase === "Finalizado" },
                    { label: "Deploy", done: p.phase === "Entregue" || p.phase === "Finalizado" }
                  ].map((item: any, i: number, arr: any[]) => {
                    const isNextAction = !item.done && arr[i - 1]?.done !== false;
                    return (
                      <div key={i} className="flex items-start gap-6 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5
                          ${item.done ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
                            isNextAction ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 
                            'bg-[#000000] border-[#222222] text-[#666666]'}`}>
                          {item.done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-2 h-2 fill-current" />}
                        </div>
                        <div>
                          <span className={`text-[15px] font-medium tracking-wide block ${item.done ? 'text-[#EDEDED]' : isNextAction ? 'text-orange-500' : 'text-[#666666]'}`}>
                            {item.label}
                          </span>
                          {isNextAction && (
                            <span className="text-[13px] text-[#A1A1AA] mt-1.5 block">Nossa equipe está focada nesta etapa no momento.</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Domínios */}
              <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 text-[#666666]">
                  <Globe className="w-4 h-4" /> Domínios Registrados
                </h3>
                <div className="space-y-4">
                  {p.hasDomainHosting ? (
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#EDEDED] font-medium">site.com.br</span>
                      <span className="text-green-500 text-[12px] font-semibold uppercase tracking-wider">Conectado</span>
                    </div>
                  ) : (
                    <div className="text-[13px] text-[#666666]">Sem domínio sob gestão.</div>
                  )}
                </div>
              </div>

              {/* Hospedagem */}
              <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 text-[#666666]">
                  <Server className="w-4 h-4" /> Infraestrutura
                </h3>
                <div className="space-y-4">
                  {p.hasDomainHosting ? (
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#EDEDED] font-medium">Vercel</span>
                      <span className="text-green-500 text-[12px] font-semibold uppercase tracking-wider">Ativa</span>
                    </div>
                  ) : (
                    <div className="text-[13px] text-[#666666]">Sem hospedagem sob gestão.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6 text-[#666666]">Ficha Técnica</h3>
              <div className="space-y-5 text-[14px]">
                <div className="flex justify-between border-b border-[#222222] pb-3">
                  <span className="text-[#666666] font-medium">Investimento</span>
                  <span className="text-[#EDEDED] font-mono">R$ {p.value.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between border-b border-[#222222] pb-3">
                  <span className="text-[#666666] font-medium">Liquidação</span>
                  <span className="text-[#EDEDED]">{p.financial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666] font-medium">Adicionais</span>
                  <span className="text-[#EDEDED] font-mono">R$ {p.domainHostingValue.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 text-[#666666]">
                <LinkIcon className="w-4 h-4" /> Ativos do Projeto
              </h3>
              <div className="space-y-4">
                  <button onClick={() => navigate("/portal/material")} className="w-full flex items-center justify-between text-[14px] text-[#A1A1AA] hover:text-[#EDEDED] transition-colors group">
                    <span className="font-medium">Gerenciar Materiais</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-8">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2 text-[#666666]">
                <FileText className="w-4 h-4" /> Documentação
              </h3>
              <div className="space-y-3">
                  <button className="w-full flex items-center justify-between text-[13px] text-[#A1A1AA] hover:text-[#EDEDED] transition-colors bg-[#000000] border border-[#222222] hover:border-[#444444] px-4 py-3 rounded-xl group">
                    <span className="truncate font-medium">Contrato</span>
                    <Download className="w-4 h-4 text-[#666666] group-hover:text-[#EDEDED] transition-colors shrink-0" />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChamados = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-[40px] md:text-[48px] leading-[1.1] font-semibold tracking-[-0.04em] mb-4 text-[#EDEDED]">
          Suporte e Demanda.
        </h1>
        <p className="text-[#A1A1AA] text-[16px] leading-relaxed">
          Abra chamados para manutenções, melhorias ou inicie o escopo de um novo projeto.
        </p>
      </div>
      
      <form className="space-y-8 bg-[#0A0A0A] border border-[#222222] p-8 md:p-12 rounded-2xl">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] font-semibold text-[#666666] mb-3">Projeto Referente</label>
          <select className="w-full bg-[#000000] border border-[#222222] rounded-xl px-4 py-4 text-[14px] text-[#EDEDED] focus:outline-none focus:border-[#666666] transition-all appearance-none">
            <option value="">Selecione o projeto</option>
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
            <option value="novo">Novo Projeto</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] font-semibold text-[#666666] mb-3">Tipo de Demanda</label>
          <select className="w-full bg-[#000000] border border-[#222222] rounded-xl px-4 py-4 text-[14px] text-[#EDEDED] focus:outline-none focus:border-[#666666] transition-all appearance-none">
            <option>Correção Técnica</option>
            <option>Alteração de Escopo</option>
            <option>Suporte Operacional</option>
            <option>Novo Projeto</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] font-semibold text-[#666666] mb-3">Descrição Técnica</label>
          <textarea 
            rows={5}
            className="w-full bg-[#000000] border border-[#222222] rounded-xl px-4 py-4 text-[14px] text-[#EDEDED] focus:outline-none focus:border-[#666666] transition-all resize-none"
            placeholder="Detalhe sua necessidade com clareza..."
          ></textarea>
        </div>

        <button className="w-full bg-[#EDEDED] text-black font-semibold tracking-wide py-4 rounded-xl hover:bg-white transition-colors">
          Protocolar Solicitação
        </button>
      </form>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="max-w-3xl">
        <h1 className="text-[40px] md:text-[48px] leading-[1.1] font-semibold tracking-[-0.04em] mb-4 text-[#EDEDED]">
          Posição Financeira.
        </h1>
        <p className="text-[#A1A1AA] text-[16px] leading-relaxed max-w-xl">
          Transparência total sobre investimentos, faturas processadas e pendentes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222222] border border-[#222222] rounded-2xl overflow-hidden">
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Investimento Total</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED]">R$ {financeiro.receitaTotal}</span>
        </div>
        <div className="bg-[#0A0A0A] p-6 md:p-8">
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Quitado</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED]">R$ {financeiro.recebido}</span>
        </div>
        <div className="bg-[#0A0A0A] p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
          <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] font-semibold block mb-4">Pendente</span>
          <span className="text-4xl md:text-5xl font-light tracking-tight text-orange-500/90">R$ {financeiro.pendente}</span>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#666666] font-semibold mb-8">Extrato Operacional</h2>
        <div className="border border-[#222222] bg-[#0A0A0A] rounded-2xl overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] whitespace-nowrap">
              <thead className="border-b border-[#222222] bg-[#111111]">
                <tr>
                  <th className="px-6 py-5 text-[11px] uppercase tracking-[0.1em] font-semibold text-[#A1A1AA]">Operação</th>
                  <th className="px-6 py-5 text-[11px] uppercase tracking-[0.1em] font-semibold text-[#A1A1AA]">Valor (R$)</th>
                  <th className="px-6 py-5 text-[11px] uppercase tracking-[0.1em] font-semibold text-[#A1A1AA]">Pago (R$)</th>
                  <th className="px-6 py-5 text-[11px] uppercase tracking-[0.1em] font-semibold text-[#A1A1AA]">Restante (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {financeiro.tabela.map((t: any, i: number) => (
                  <tr key={i} className="hover:bg-[#111111] transition-colors">
                    <td className="px-6 py-5 font-medium text-[#EDEDED]">{t.projeto}</td>
                    <td className="px-6 py-5 text-[#A1A1AA]">{t.valor}</td>
                    <td className="px-6 py-5 text-[#EDEDED]">{t.pago}</td>
                    <td className="px-6 py-5 text-[#666666]">{t.restante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans selection:bg-[#EDEDED]/30">
      {/* Top Nav */}
      <nav className="border-b border-[#222222] bg-[#000000] sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0A0A0A] border border-[#222222] text-[#EDEDED] rounded-lg flex items-center justify-center font-bold text-sm">
                {clientData.name.substring(0,2).toUpperCase()}
              </div>
              <span className="font-semibold text-[15px]">{clientData.name}</span>
            </div>
            <div className="h-6 w-px bg-[#222222] mx-2 hidden md:block"></div>
            <div className="hidden md:flex gap-6 text-[14px]">
              <button 
                onClick={() => { setActiveTab("overview"); setSelectedProject(null); }}
                className={`py-5 border-b-2 font-medium transition-colors ${activeTab === "overview" && !selectedProject ? "border-[#EDEDED] text-[#EDEDED]" : "border-transparent text-[#A1A1AA] hover:text-[#EDEDED]"}`}
              >
                Projetos
              </button>
              <button 
                onClick={() => { setActiveTab("financeiro"); setSelectedProject(null); }}
                className={`py-5 border-b-2 font-medium transition-colors ${activeTab === "financeiro" ? "border-[#EDEDED] text-[#EDEDED]" : "border-transparent text-[#A1A1AA] hover:text-[#EDEDED]"}`}
              >
                Financeiro
              </button>
              <button 
                onClick={() => { setActiveTab("chamados"); setSelectedProject(null); }}
                className={`py-5 border-b-2 font-medium transition-colors ${activeTab === "chamados" ? "border-[#EDEDED] text-[#EDEDED]" : "border-transparent text-[#A1A1AA] hover:text-[#EDEDED]"}`}
              >
                Chamados
              </button>
            </div>
          </div>
          <button onClick={handleLogout} className="text-[#A1A1AA] hover:text-[#EDEDED] text-sm font-medium transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </nav>

      <main className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        {selectedProject ? renderProjectDetail() : (
          <>
            {activeTab === "overview" && renderProjectOverview()}
            {activeTab === "chamados" && renderChamados()}
            {activeTab === "financeiro" && renderFinanceiro()}
          </>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
