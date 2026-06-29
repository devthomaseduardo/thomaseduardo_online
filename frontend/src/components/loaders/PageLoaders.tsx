import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + (100 - prev) * 0.1 : 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-white"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          className="h-full bg-white/80"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-8 h-8 rounded-full border border-white/10" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-transparent border-t-white/80"
          />
        </div>
        <p className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase">
          Carregando Ambiente...
        </p>
      </div>
    </motion.div>
  );
};

export const RouteTransition = ({ children, isNavigating }: { children: React.ReactNode, isNavigating: boolean }) => {
  return (
    <div className="relative w-full h-full min-h-screen">
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-[100] bg-black/20 flex flex-col items-center pointer-events-none"
          >
             <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-white/80"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ 
          opacity: isNavigating ? 0.4 : 1, 
          scale: isNavigating ? 0.99 : 1,
          filter: isNavigating ? "blur(4px)" : "blur(0px)"
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const FullscreenLoader = ({ progress = 0, step, logs }: { progress?: number, step: string, logs?: string[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl text-white"
    >
      <div className="w-full max-w-md mx-auto flex flex-col gap-10 px-6">
        <div className="flex flex-col gap-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-light tracking-tight text-white/90"
          >
            {step}
          </motion.div>
          <div className="text-white/40 text-[11px] font-mono uppercase tracking-widest">{progress}% Processado</div>
        </div>

        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white/80"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>

        {logs && logs.length > 0 && (
          <div className="flex flex-col gap-1 text-[11px] font-mono text-white/30 h-24 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}>
            {logs.slice(-5).map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2"
              >
                <span className="text-white/20">{'>'}</span> {log}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
