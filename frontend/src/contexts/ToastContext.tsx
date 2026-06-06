import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, X, Activity } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-24 right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`
                pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl min-w-[300px] max-w-md relative overflow-hidden
                ${t.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
                ${t.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : ''}
                ${t.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : ''}
                ${t.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
              `}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                t.type === 'success' ? 'bg-emerald-500' :
                t.type === 'error' ? 'bg-rose-500' :
                t.type === 'info' ? 'bg-blue-500' :
                'bg-amber-500'
              }`} />
              <div className="shrink-0">
                {t.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {t.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {t.type === 'info' && <Activity className="w-5 h-5 animate-pulse" />}
                {t.type === 'warning' && <Info className="w-5 h-5" />}
              </div>
              
              <div className="flex-1 text-sm font-bold tracking-tight leading-tight">
                {t.message}
              </div>

              <button 
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors opacity-40 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
