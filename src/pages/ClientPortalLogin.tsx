import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowRight, User, UploadCloud, CreditCard, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <UploadCloud className="w-6 h-6 text-[#009EE3]" />,
    title: "Materiais do Projeto",
    description: "Envie logos, imagens, textos, vídeos, referências e arquivos necessários para o desenvolvimento."
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#009EE3]" />,
    title: "Financeiro Transparente",
    description: "Acesse pagamentos, saldo, serviços adicionais, invoices e notas fiscais quando solicitado."
  },
  {
    icon: <FileText className="w-6 h-6 text-[#009EE3]" />,
    title: "Infraestrutura Técnica",
    description: "Visualize repositórios, deploys, domínios, integrações, Meta Ads, Google Ads, GTM, analytics e dados técnicos do projeto."
  }
];

const ClientPortalLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: identifier,
          password: code
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // Save token and client to localStorage
      localStorage.setItem("clientToken", data.token);
      localStorage.setItem("clientId", data.client.id);
      
      navigate("/portal/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Tutorial & Showcase */}
      <div className="hidden lg:flex w-1/2 p-12 lg:p-20 flex-col justify-center relative border-r border-white/5 bg-gradient-to-br from-[#050505] to-[#0a0a0a]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#009EE3]/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#009EE3] font-mono text-[11px] tracking-widest uppercase mb-4 block">
              PORTAL DO CLIENTE
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Seu ambiente privado <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                de projeto.
              </span>
            </h2>
            <p className="text-white/50 text-lg mb-12">
              Acompanhe materiais, pagamentos, contratos, entregas e informações técnicas do seu projeto em um único ambiente organizado.
            </p>
          </motion.div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  activeFeature === index 
                    ? "bg-white/5 border-white/20 shadow-lg shadow-[#009EE3]/5" 
                    : "bg-transparent border-transparent opacity-40 hover:opacity-100 hover:bg-white/[0.02]"
                }`}
                onClick={() => setActiveFeature(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors duration-500 ${activeFeature === index ? "bg-[#009EE3]/10" : "bg-white/5"}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <AnimatePresence mode="wait">
                      {activeFeature === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-white/50 leading-relaxed text-sm"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#009EE3]/10 blur-[150px] rounded-full pointer-events-none lg:hidden" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-10 lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              Para clientes ativos
            </h1>
            <p className="text-white/50 text-sm">
              Insira suas credenciais para acessar a área privada do seu projeto.
            </p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">CNPJ, CPF ou e-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Seu identificador"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/20 outline-none focus:border-white/40 transition-colors focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider">Chave de acesso do projeto</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="••••••••••"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/20 outline-none focus:border-[#009EE3] transition-colors focus:ring-1 focus:ring-[#009EE3]"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2"
                >
                  {error}
                </motion.div>
              )}

              <button 
                type="submit"
                className="relative group w-full py-4 mt-2 bg-white text-black font-bold rounded-xl overflow-hidden flex justify-center items-center gap-2"
              >
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Acessar Projeto
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#009EE3]" />
            <a href="/" className="text-white/40 text-sm hover:text-white transition-colors">
              Voltar para thomaseduardo.online
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPortalLogin;
