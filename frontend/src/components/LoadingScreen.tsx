import React from "react";
import { motion } from "motion/react";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } }}
    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <p className="text-white/30 text-[11px] font-medium tracking-[0.3em] uppercase">Thomas Eduardo</p>
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
