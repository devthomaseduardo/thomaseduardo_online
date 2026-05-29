import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, QrCode, CreditCard, Building, Copy, Check, Lock, Info } from "lucide-react";
import { useLang } from "../contexts/LangContext";
const PaymentPage = () => {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<"pix" | "card" | "wire">("pix");
  const [copiedPix, setCopiedPix] = React.useState(false);
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('admin_projects_v2');
    if (saved) {
      const projects = JSON.parse(saved);
      // Pega o mesmo projeto padrão mockado, futuramente vindo de Params/Auth
      const current = projects.find((p: any) => p.id === "PROJ-SLP01") || projects[0];
      setProject(current);
    }
  }, []);

  const pixKey = "th.eduardo210@gmail.com";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const amountToPay = project ? ((project.financial.includes("100%") || project.financial.includes("Final") ? project.value : (project.value / 2) + (project.domainHostingValue || 0))) : 5000;

  return (
    <div className="min-h-screen bg-[#050505] text-white transition-colors duration-500 overflow-x-hidden">
      
      <main className="px-6 max-w-6xl mx-auto pt-32 pb-24">
        
        <div className="max-w-3xl mx-auto">
          
          {/* Payment Methods */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                {lang === "pt" ? "Forma de Pagamento" : "Payment Method"}
              </h1>
              <p className="text-white/50">
                Selecione a forma de pagamento desejada para prosseguir.
              </p>
            </div>
            {/* Tabs */}
            <div className="flex p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl mb-8 w-fit mx-auto">
              <button
                onClick={() => setActiveTab("pix")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "pix" ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"
                }`}
              >
                <QrCode className="w-4 h-4" />
                Pix
              </button>
              <button
                onClick={() => setActiveTab("card")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "card" ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Cartão
              </button>
              <button
                onClick={() => setActiveTab("wire")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "wire" ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"
                }`}
              >
                <Building className="w-4 h-4" />
                Transferência
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm min-h-[400px]">
              <AnimatePresence mode="wait">
                
                {/* PIX TAB */}
                {activeTab === "pix" && (
                  <motion.div
                    key="pix"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Pague com Pix</h3>
                    <p className="text-white/50 mb-6">
                      Escaneie o QR Code no seu aplicativo do banco ou copie a chave abaixo para pagamento instantâneo.
                    </p>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 5 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      transition={{ delay: 0.2 }}
                      className="bg-[#009EE3]/10 border border-[#009EE3]/20 rounded-xl p-4 mb-8 flex items-start gap-3"
                    >
                      <Info className="w-5 h-5 text-[#009EE3] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#009EE3]/90">
                        <strong>Pagamento Rápido e Sem Taxas.</strong> Sua liberação é feita de forma instantânea assim que o pagamento for confirmado em nosso sistema.
                      </p>
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      {/* Fake QR Code Placeholder */}
                      <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <QrCode className="w-16 h-16 text-white/20" />
                      </div>
                      
                      <div className="w-full">
                        <label className="block text-sm font-medium text-white/50 mb-2">Chave Pix (E-mail)</label>
                        <div className="flex bg-black/40 border border-white/10 rounded-xl p-2 items-center">
                          <input 
                            readOnly
                            value={pixKey}
                            className="bg-transparent text-white px-3 py-2 w-full outline-none font-mono text-sm"
                          />
                          <button 
                            onClick={handleCopyPix}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0"
                          >
                            {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedPix ? "Copiado" : "Copiar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* CREDIT CARD TAB - 100% Custom Editable UI */}
                {activeTab === "card" && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">Cartão de Crédito</h3>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white/50">VISA</div>
                        <div className="w-10 h-6 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white/50">MASTER</div>
                      </div>
                    </div>
                    <p className="text-white/50 mb-6 text-sm">
                      Pagamento processado de forma segura via API do Mercado Pago.
                    </p>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 5 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      transition={{ delay: 0.2 }}
                      className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8 flex items-start gap-3"
                    >
                      <Info className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-500/90">
                        <strong>Atenção às Taxas:</strong> Os pagamentos via cartão de crédito ou parcelamentos possuem acréscimo das taxas da operadora financeira (Mercado Pago), que são repassadas ao valor final.
                      </p>
                    </motion.div>

                    {/* Formulário 100% Editável (Tailwind) */}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      {/* Card Number & Name Group */}
                      <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
                        <div className="bg-[#0a0a0a] rounded-2xl p-6 space-y-6">
                          <div>
                            <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">Número do Cartão</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                placeholder="0000 0000 0000 0000"
                                className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-mono text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">Nome impresso no Cartão</label>
                            <input 
                              type="text" 
                              placeholder="Ex: THOMAS E R S"
                              className="w-full bg-transparent border-b border-white/10 pb-3 text-lg text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors uppercase"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Details Group */}
                      <div className="grid grid-cols-2 gap-5">
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                          <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">Validade</label>
                          <input 
                            type="text" 
                            placeholder="MM/AA"
                            className="w-full bg-transparent border-b border-white/10 pb-3 text-lg font-mono text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors"
                          />
                        </div>
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                          <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">CVV</label>
                          <input 
                            type="text" 
                            placeholder="123"
                            className="w-full bg-transparent border-b border-white/10 pb-3 text-lg font-mono text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Document & Installments Group */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                          <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">CPF do Titular</label>
                          <input 
                            type="text" 
                            placeholder="000.000.000-00"
                            className="w-full bg-transparent border-b border-white/10 pb-3 text-lg font-mono text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors"
                          />
                        </div>
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                          <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">Parcelas</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-transparent border-b border-white/10 pb-3 text-lg text-white outline-none focus:border-[#009EE3] transition-colors appearance-none cursor-pointer"
                            >
                              <option value="1" className="bg-[#050505]">1x de R$ {amountToPay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                              <option value="2" className="bg-[#050505]">2x de R$ {(amountToPay / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                              <option value="3" className="bg-[#050505]">3x de R$ {(amountToPay / 3).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button className="relative group w-full py-5 mt-8 bg-white text-black font-bold rounded-xl overflow-hidden flex justify-center items-center gap-2">
                        <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          <Lock className="w-4 h-4" />
                          Processar Pagamento de R$ {amountToPay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* WIRE TRANSFER TAB */}
                {activeTab === "wire" && (
                  <motion.div
                    key="wire"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Transferência Bancária</h3>
                    <p className="text-white/50 mb-6">
                      Dados para realizar TED/DOC diretamente da conta da sua empresa.
                    </p>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 5 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      transition={{ delay: 0.2 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 flex items-start gap-3"
                    >
                      <Info className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/70">
                        <strong>Tempo de Compensação:</strong> Transferências via TED/DOC podem levar até 1 dia útil para serem confirmadas. Se você precisa de urgência na liberação, recomendamos o pagamento via <strong>Pix</strong>.
                      </p>
                    </motion.div>
                    
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <span className="block text-sm text-white/40 mb-1">Banco</span>
                          <span className="block text-lg font-medium">Nubank (260)</span>
                        </div>
                        <div>
                          <span className="block text-sm text-white/40 mb-1">Agência</span>
                          <span className="block text-lg font-medium">0001</span>
                        </div>
                        <div>
                          <span className="block text-sm text-white/40 mb-1">Conta Corrente</span>
                          <span className="block text-lg font-medium">34220261-3</span>
                        </div>
                        <div>
                          <span className="block text-sm text-white/40 mb-1">Favorecido</span>
                          <span className="block text-lg font-medium">Thomas Eduardo R. S.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
