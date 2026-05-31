import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { Loader2, CheckCircle2, XCircle, Terminal } from "lucide-react";

export const ButtonLoader = ({ 
  isLoading, 
  loadingText, 
  children, 
  className = "",
  disabled = false,
  ...props
}: { 
  isLoading: boolean; 
  loadingText?: string; 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative overflow-hidden transition-all duration-300 flex items-center justify-center ${isLoading ? "opacity-90 cursor-wait" : ""} ${className}`}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 w-full absolute inset-0"
          >
            <Loader2 className="w-4 h-4 animate-spin text-current opacity-70" />
            {loadingText && <span className="font-medium text-sm">{loadingText}</span>}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      {isLoading && (
        <div className="invisible flex items-center justify-center gap-2">
           <Loader2 className="w-4 h-4" />
           {loadingText && <span className="font-medium text-sm">{loadingText}</span>}
        </div>
      )}
    </button>
  );
};

export const UploadLoader = ({ 
  progress, 
  status, 
  filename, 
  speed, 
  size 
}: { 
  progress: number;
  status: "uploading" | "processing" | "success" | "error";
  filename: string;
  speed?: string;
  size?: string;
}) => {
  return (
    <div className="w-full p-4 rounded-xl border border-white/10 bg-[#0A0A0A] flex flex-col gap-4 relative overflow-hidden group">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent z-0"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex justify-between items-start text-sm z-10">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-white/90 truncate max-w-[200px] sm:max-w-[300px]">{filename}</span>
          <span className="text-xs text-white/40 font-mono flex items-center gap-2">
            {status === 'uploading' ? `Uploading... ${speed || ''}` : status === 'processing' ? 'Processing...' : status}
            {size && <><span className="w-1 h-1 rounded-full bg-white/20" /> {size}</>}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(status === "uploading" || status === "processing") && (
            <span className="text-white/60 font-mono text-xs bg-white/5 px-2 py-0.5 rounded-full">{progress}%</span>
          )}
          {status === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          {status === "error" && <XCircle className="w-5 h-5 text-rose-500" />}
        </div>
      </div>
      
      <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative z-10">
        <motion.div
          className={`h-full ${status === 'error' ? 'bg-rose-500' : status === 'success' ? 'bg-emerald-500' : 'bg-white'}`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
    </div>
  );
};

export const DeployLoader = ({ status, logs }: { status: "building" | "deploying" | "verifying" | "online" | "error", logs: string[] }) => {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-black overflow-hidden flex flex-col font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-3 p-3 border-b border-white/10 bg-white/[0.02]">
        <Terminal className="w-4 h-4 text-white/40" />
        <span className="text-white/70 tracking-wide uppercase text-[10px] sm:text-xs font-semibold">Deployment Status</span>
        <div className="ml-auto flex items-center gap-2">
           <span className={`text-[10px] sm:text-xs uppercase font-semibold ${status === 'online' ? 'text-emerald-500' : status === 'error' ? 'text-rose-500' : 'text-blue-400'}`}>
             {status}
           </span>
          <motion.div 
            animate={status !== 'online' && status !== 'error' ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} 
            transition={{ repeat: Infinity, duration: 1.5 }} 
            className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-500' : status === 'error' ? 'bg-rose-500' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'}`} 
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5 text-white/50 h-56 overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <span className="text-white/20 shrink-0 select-none">{new Date().toLocaleTimeString().split(' ')[0]}</span>
            <span className={log.includes('ERR') ? 'text-rose-400' : log.includes('WARN') ? 'text-amber-400' : 'text-white/60'}>
              {log}
            </span>
          </motion.div>
        ))}
        {status !== 'online' && status !== 'error' && (
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="mt-2 text-white/40">
             █
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const FinancialLoader = ({ isProcessing, message = "Processando pagamento..." }: { isProcessing: boolean, message?: string }) => {
  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          className="w-full rounded-xl bg-white/[0.02] border border-white/10 p-5 flex items-center justify-between overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent">
             <motion.div 
               className="w-1/3 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
               animate={{ x: ["-100%", "300%"] }}
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
             />
          </div>
          <div className="flex items-center gap-4 w-full relative z-10">
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-white/5" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 w-10 h-10 rounded-full border-2 border-transparent border-t-white"
              />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-white/90">{message}</span>
              <span className="text-xs text-white/40 mt-0.5">Por favor, aguarde. Ambiente seguro.</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
