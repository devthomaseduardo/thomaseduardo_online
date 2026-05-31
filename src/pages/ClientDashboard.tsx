import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, Circle, Globe, Link as LinkIcon, FileText, LogOut, ArrowLeft,
  CreditCard, Activity, Download, UploadCloud, MonitorSmartphone, Server,
  GitBranch, Check, Hourglass, Zap, Shield, ChevronRight, PieChart, Code2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const navigate = useNavigate();
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
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Não autorizado");
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
    return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-mono text-sm tracking-widest uppercase">Carregando Infraestrutura...</div>;
  }

  if (!clientData) return null;
  const projects = clientData.projects || [];

  const renderProjectOverview = () => (
    <div className="space-y-12 animate-in fade-in duration-700 w-full">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Sua infraestrutura digital.
        </h1>
        <p className="text-white/50 text-lg font-light">
          Acompanhe o progresso, saúde financeira e o status operacional dos seus ecossistemas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map(p => (
          <div 
            key={p.id} 
            onClick={() => setSelectedProject(p)}
            className="bg-[#0A0A0A] border border-white/5 hover:border-white/15 rounded-3xl p-8 cursor-pointer transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#009EE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-2xl font-bold tracking-tight text-white">{p.name}</h3>
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/5 border border-white/10 text-white/50 group-hover:text-white/80 transition-colors">
                  {p.phase}
                </span>
              </div>
              
              <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</span>
                  <span className="text-sm font-medium text-emerald-500 flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-current" /> Operação Ativa
                  </span>
                </div>
                <button className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white flex items-center gap-2 transition-colors">
                  Acessar Painel <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border border-white/5 border-dashed rounded-3xl">
            <p className="text-white/40">Nenhum projeto ativo encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProjectDetail = () => {
    const p = selectedProject;
    
    // Fake timeline mapping to narrative
    const progressPercent = 72; // Hardcoded feel for the post-proposal experience
    const currentStepText = "Desenvolvimento Frontend";
    
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-[11px] uppercase tracking-widest font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para projetos
        </button>

        {/* ── HERO ── */}
        <div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold tracking-tight mb-4 leading-[1.1]">
            Seu projeto está em andamento.
          </h1>
          <p className="text-white/50 text-lg font-light max-w-2xl">
            Acompanhe o progresso de <strong className="text-white font-medium">{p.name}</strong>, pagamentos, arquivos e infraestrutura técnica em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── COLUNA ESQUERDA: TIMELINE VIVA (STICKY) ── */}
          <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#009EE3]/10 blur-[50px] rounded-full pointer-events-none" />
              
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 block mb-2">Passo atual:</span>
              <h3 className="text-2xl font-bold tracking-tight text-[#009EE3] mb-6">{currentStepText}</h3>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#009EE3]/50 to-[#009EE3]"
                />
              </div>
              <div className="text-right text-[10px] font-mono text-white/30 mb-8">{progressPercent}%</div>

              {/* Checklist Narrativa */}
              <div className="space-y-4">
                {[
                  { text: "Briefing recebido", status: "done" },
                  { text: "Contrato assinado", status: "done" },
                  { text: "Pagamento confirmado", status: "done" },
                  { text: "Design & UX aprovados", status: "done" },
                  { text: "Desenvolvimento Frontend", status: "active" },
                  { text: "Integrações Backend", status: "pending" },
                  { text: "Revisão Final", status: "pending" },
                  { text: "Deploy & Publicação", status: "pending" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-medium">
                    {step.status === "done" && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                    {step.status === "active" && <Hourglass className="w-4 h-4 text-[#009EE3] shrink-0 animate-pulse" />}
                    {step.status === "pending" && <Circle className="w-2 h-2 text-white/10 shrink-0 mx-1 fill-current" />}
                    
                    <span className={`
                      ${step.status === "done" ? "text-white/40 line-through decoration-white/10" : ""}
                      ${step.status === "active" ? "text-white" : ""}
                      ${step.status === "pending" ? "text-white/20" : ""}
                    `}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA: CARDS & OPERACIONAL ── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* CARDS VIVOS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2"><CreditCard className="w-3 h-3"/> Pagamentos</span>
                <span className="text-2xl font-light text-white">R$ {(p.value / 2).toLocaleString('pt-BR')} pagos</span>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2"><MonitorSmartphone className="w-3 h-3"/> Próxima Entrega</span>
                <span className="text-xl font-medium text-white">Deploy Frontend</span>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2"><FileText className="w-3 h-3"/> Arquivos Recebidos</span>
                <span className="text-xl font-medium text-white">14 arquivos</span>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2"><Activity className="w-3 h-3"/> Última Atualização</span>
                <span className="text-xl font-medium text-emerald-400">Hoje, 13:42</span>
              </div>
            </div>

            {/* ÁREA TÉCNICA (INFRAESTRUTURA) */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Server className="w-4 h-4 text-white/50" /></div>
                <h3 className="text-lg font-bold">Infraestrutura Operacional</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: "Domínio", value: "site.com.br", status: "Conectado", icon: Globe },
                  { label: "Deploy / Hospedagem", value: "Vercel Pro", status: "Ativo", icon: Zap },
                  { label: "Repositório", value: "GitHub Privado", status: "Seguro", icon: GitBranch },
                  { label: "Google Analytics", value: "GA4 Integrado", status: "Coletando", icon: PieChart },
                  { label: "Google Tag Manager", value: "GTM-XXXX", status: "Ativo", icon: Code2 },
                  { label: "Meta Pixel", value: "Pixel ID 001", status: "Coletando", icon: Activity },
                ].map((tech, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <tech.icon className="w-4 h-4 text-white/20" />
                      <div>
                        <span className="block text-[10px] font-mono text-white/30 uppercase tracking-wider">{tech.label}</span>
                        <span className="text-sm font-medium text-white/80">{tech.value}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">{tech.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPLOAD DE MATERIAIS */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><UploadCloud className="w-4 h-4 text-white/50" /></div>
                <h3 className="text-lg font-bold">Arquivos & Materiais</h3>
              </div>
              <label className="w-full border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors rounded-2xl h-40 flex flex-col items-center justify-center cursor-pointer group">
                <UploadCloud className="w-8 h-8 text-white/20 group-hover:text-white/50 transition-colors mb-3" />
                <span className="text-sm font-medium text-white/70">Solte seus arquivos aqui</span>
                <span className="text-[11px] text-white/30 mt-1">Logo, fotos, textos ou referências.</span>
                <input type="file" multiple className="hidden" onChange={() => alert("Upload simulado. Na produção enviará ao servidor.")} />
              </label>
              <div className="mt-6 space-y-3">
                {['logo-final.svg', 'referencias.pdf', 'fotos-produtos.zip'].map((file, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/40 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/50" /> {file}
                  </div>
                ))}
              </div>
            </div>

            {/* ENTREGÁVEIS */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-emerald-500" /></div>
                  <h3 className="text-lg font-bold">Entrega Oficial</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-widest">Liberado no final</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 relative z-10">
                {['projeto.zip', 'documentacao.pdf', 'acessos-tecnicos.txt', 'contrato-assinado.pdf'].map((file, i) => (
                  <button key={i} className="flex items-center justify-between p-4 bg-black border border-white/5 hover:border-white/15 rounded-xl transition-colors group/btn">
                    <span className="text-sm font-medium text-white/60 group-hover/btn:text-white truncate pr-4">{file}</span>
                    <Download className="w-4 h-4 text-white/20 group-hover/btn:text-white/50 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-[#EDEDED]/30">
      {/* ── NAV ── */}
      <nav className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-6 lg:px-12 h-16 flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">
              {clientData.name.substring(0,2).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-sm block">{clientData.name}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Portal Privado</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-white/40 hover:text-white text-[11px] font-mono uppercase tracking-widest transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair do ambiente</span>
          </button>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main className="p-6 lg:p-12 w-full">
        {selectedProject ? renderProjectDetail() : renderProjectOverview()}
      </main>
    </div>
  );
}
