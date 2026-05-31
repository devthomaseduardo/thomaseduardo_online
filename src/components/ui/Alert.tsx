import React from "react";
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type AlertVariant = "info" | "warning" | "error" | "success" | "default";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  onClose?: () => void;
  className?: string;
}

const variantStyles = {
  default: {
    bg: "bg-white/[0.02]",
    border: "border-white/10",
    text: "text-white/80",
    icon: "text-white/50",
    DefaultIcon: Info,
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-200",
    icon: "text-blue-400",
    DefaultIcon: Info,
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-200",
    icon: "text-amber-400",
    DefaultIcon: AlertTriangle,
  },
  error: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-200",
    icon: "text-rose-400",
    DefaultIcon: XCircle,
  },
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-200",
    icon: "text-emerald-400",
    DefaultIcon: CheckCircle2,
  },
};

export const Alert = ({
  variant = "default",
  title,
  children,
  icon: CustomIcon,
  onClose,
  className = "",
}: AlertProps) => {
  const styles = variantStyles[variant];
  const Icon = CustomIcon || styles.DefaultIcon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative flex gap-3 p-4 rounded-xl border ${styles.bg} ${styles.border} ${styles.text} ${className}`}
      >
        <div className="shrink-0 mt-0.5">
          <Icon className={`w-5 h-5 ${styles.icon}`} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {title && <h5 className={`font-medium ${styles.icon}`}>{title}</h5>}
          <div className="text-sm opacity-90 leading-relaxed">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg opacity-50 hover:opacity-100 hover:bg-white/5 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
