import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { Loader2, Search, Inbox, AlertCircle } from "lucide-react";

export const ModalLoader = ({ isLoading, message = "Processando..." }: { isLoading: boolean; message?: string }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-[inherit]"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4 p-6 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl"
          >
            <div className="relative">
               <div className="w-12 h-12 rounded-full border border-white/10" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                 className="absolute inset-0 rounded-full border border-transparent border-t-white"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
               </div>
            </div>
            <span className="text-sm font-medium text-white/90">{message}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EmptyState = ({ 
  icon: Icon = Inbox, 
  title, 
  description, 
  action,
  className = ""
}: { 
  icon?: any; 
  title: string; 
  description: string; 
  action?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-20 px-6 text-center w-full border border-white/5 rounded-2xl bg-white/[0.01] ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon className="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium text-white/90 mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-white/40 max-w-sm mb-8 leading-relaxed">{description}</p>
      {action && (
        <div className="mt-2">{action}</div>
      )}
    </motion.div>
  );
};

export const SearchLoader = ({ 
  isSearching, 
  placeholder = "Buscar...",
  value,
  onChange,
  className = ""
}: { 
  isSearching: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <div className={`relative flex items-center w-full max-w-md group ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/70 transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input 
        type="text" 
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Loader2 className="w-4 h-4 text-white/50 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AsyncState = ({ 
  isLoading, 
  error, 
  children, 
  skeleton, 
  emptyState 
}: { 
  isLoading: boolean; 
  error?: Error | null; 
  children: React.ReactNode; 
  skeleton: React.ReactNode;
  emptyState?: React.ReactNode;
}) => {
  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {skeleton}
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex gap-3 items-start"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-medium text-rose-300">Erro ao processar requisição</span>
              <span className="opacity-80">{error.message || "Ocorreu um erro inesperado."}</span>
            </div>
          </motion.div>
        ) : emptyState ? (
           <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
           >
             {emptyState}
           </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
