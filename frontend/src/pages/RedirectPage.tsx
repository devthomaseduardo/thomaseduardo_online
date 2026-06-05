import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ArrowRight } from "lucide-react";
import { RotatingText } from "../components/RotatingText";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("checking"); 
  const target = searchParams.get("to") || "https://wa.me/5511977070209";

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("redirecting"), 1500);
    const timer2 = setTimeout(() => {
      window.location.href = target;
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [target]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {status === "checking" && (
            <motion.div
              key="checking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden">
                <Loader2 className="w-6 h-6 text-white/40 animate-spin" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                Estabelecendo conexão
              </h1>
              <p className="text-white/40 text-sm font-light">
                Preparando ambiente seguro de destino...
              </p>
            </motion.div>
          )}

          {status === "redirecting" && (
            <motion.div
              key="redirecting"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
               <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <ArrowRight className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                Redirecionando
              </h1>
              <p className="text-white/40 text-sm font-light">
                Encaminhando sua solicitação agora.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-white/40 tracking-widest uppercase">
              <span>Powered By</span>
              <span className="text-white/80"><RotatingText /></span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a 
        href={target}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-[10px] text-white/50 uppercase tracking-widest font-mono flex items-center gap-2 hover:text-white transition-colors z-20"
      >
        Clique se não for redirecionado <ArrowRight className="w-3 h-3" />
      </motion.a>
    </div>
  );
};

export default RedirectPage;
