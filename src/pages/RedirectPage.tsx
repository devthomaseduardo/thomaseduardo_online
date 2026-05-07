
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("checking"); // checking, ready, redirecting
  const target = searchParams.get("to") || "https://wa.me/5511977070209?text=Olá Thomas, vi seu portfólio e gostaria de solicitar um orçamento.";
  const isWhatsApp = target.includes("wa.me") || target.includes("whatsapp.com");

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("ready"), 1500);
    const timer2 = setTimeout(() => {
      setStatus("redirecting");
      window.location.href = target;
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [target]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-brand-blue/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dot-mesh opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 text-center">
        <AnimatePresence mode="wait">
          {status === "checking" && (
            <motion.div
              key="checking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-8">
                <Loader2 className="w-16 h-16 text-brand-blue animate-spin" />
                <div className="absolute inset-0 blur-xl bg-brand-blue/20 animate-pulse" />
              </div>
              <h1 className="text-2xl font-black uppercase italic text-white tracking-tighter mb-2">
                Validando Conexão
              </h1>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                Otimizando ambiente de destino...
              </p>
            </motion.div>
          )}

          {status === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                {isWhatsApp ? (
                  <MessageCircle className="w-10 h-10 text-brand-cyan" />
                ) : (
                  <ShieldCheck className="w-10 h-10 text-brand-cyan" />
                )}
              </div>
              <h1 className="text-3xl font-black uppercase italic text-white tracking-tighter mb-2">
                {isWhatsApp ? "Iniciando Conversa" : "Ambiente Seguro"}
              </h1>
              <p className="text-gray-400 font-medium italic mb-8">
                {isWhatsApp ? "Preparando chat com Thomas Eduardo..." : "Você será redirecionado em instantes."}
              </p>
              
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="h-full bg-linear-to-r from-brand-blue to-brand-cyan"
                />
              </div>
            </motion.div>
          )}

          {status === "redirecting" && (
            <motion.div
              key="redirecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-xl font-bold text-white uppercase tracking-widest animate-pulse">
                Encaminhando...
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 font-mono text-[9px] uppercase tracking-widest">
            <span>Powering By</span>
            <span className="text-white font-black italic">Thomas Eduardo</span>
          </div>
        </motion.div>
      </div>

      {/* Manual Link fallback */}
      <motion.a 
        href={target}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-8 text-[10px] text-gray-500 uppercase tracking-widest font-mono flex items-center gap-2 hover:text-white transition-all"
      >
        Clique aqui se não for redirecionado <ArrowRight className="w-3 h-3" />
      </motion.a>
    </div>
  );
};

export default RedirectPage;
