import React from "react";
import { motion } from "motion/react";
import { Loader2, Plus, Terminal } from "lucide-react";
import { LogoTE } from "../Icons";

// Shimmer effect classes for reusability
const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent";

export const PageLoader = () => (
  <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden">
    <motion.div 
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="w-1/2 h-full bg-[#009EE3]/50 blur-sm"
    />
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="w-full bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
    <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
      <div className={`h-5 w-32 bg-white/5 rounded-md ${shimmer}`} />
      <div className={`h-8 w-48 bg-white/5 rounded-lg ${shimmer}`} />
    </div>
    <div className="divide-y divide-white/[0.04]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-3 w-1/3">
            <div className={`w-8 h-8 rounded-full bg-white/5 shrink-0 ${shimmer}`} />
            <div className="space-y-2 flex-1">
              <div className={`h-4 w-3/4 bg-white/5 rounded ${shimmer}`} />
              <div className={`h-3 w-1/2 bg-white/5 rounded ${shimmer}`} />
            </div>
          </div>
          <div className={`h-4 w-1/4 bg-white/5 rounded ${shimmer}`} />
          <div className={`h-4 w-1/6 bg-white/5 rounded ${shimmer}`} />
          <div className={`h-8 w-16 bg-white/5 rounded-lg ml-auto ${shimmer}`} />
        </div>
      ))}
    </div>
  </div>
);

export const KanbanSkeleton = () => (
  <div className="flex gap-5 overflow-x-hidden pb-8 w-full">
    {Array.from({ length: 4 }).map((_, colIdx) => (
      <div key={colIdx} className="flex-1 min-w-[280px] flex flex-col gap-3 opacity-60" style={{ opacity: 1 - colIdx * 0.15 }}>
        <div className="flex justify-between items-center mb-1 px-1">
          <div className={`h-3 w-20 bg-white/10 rounded ${shimmer}`} />
          <div className={`h-4 w-6 bg-white/5 rounded ${shimmer}`} />
        </div>
        {Array.from({ length: colIdx === 0 ? 3 : colIdx === 1 ? 2 : 1 }).map((_, cardIdx) => (
          <div key={cardIdx} className="bg-[#0B0B0B] border border-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div className={`h-4 w-1/2 bg-white/5 rounded ${shimmer}`} />
              <div className={`h-4 w-8 bg-white/5 rounded ${shimmer}`} />
            </div>
            <div className={`h-3 w-3/4 bg-white/5 rounded mb-4 ${shimmer}`} />
            <div className="flex justify-between items-center mb-3">
              <div className={`h-3 w-16 bg-white/5 rounded ${shimmer}`} />
              <div className={`h-3 w-12 bg-white/5 rounded ${shimmer}`} />
            </div>
            <div className={`h-1.5 w-full bg-white/5 rounded-full ${shimmer}`} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const TimelineSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div className={`h-6 w-48 bg-white/5 rounded ${shimmer}`} />
      <div className={`h-8 w-32 bg-white/5 rounded-lg ${shimmer}`} />
    </div>
    <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/[0.06]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="relative">
          <div className="absolute left-[-29px] top-1.5 w-3 h-3 rounded-full bg-white/10" />
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-4">
            <div className={`h-4 w-3/4 bg-white/5 rounded mb-2 ${shimmer}`} />
            <div className={`h-3 w-1/3 bg-white/5 rounded ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DeployTerminalLoader = () => (
  <div className="bg-[#000] border border-white/[0.06] rounded-2xl overflow-hidden font-mono text-xs text-white/50 p-6 flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-4 border-b border-white/[0.06] pb-4">
      <Terminal className="w-4 h-4 text-white/40" />
      <span className="text-white/60">Building Infrastructure</span>
      <Loader2 className="w-3 h-3 animate-spin ml-auto" />
    </div>
    <p>&#10095; Preparing environment...</p>
    <p>&#10095; Installing dependencies...</p>
    <p>&#10095; Building production bundle...</p>
    <div className="flex items-center gap-2 mt-2">
      <span className="w-1.5 h-1.5 bg-[#009EE3] rounded-full animate-pulse" />
      <span className="text-[#009EE3]">Deploying to edge network...</span>
    </div>
  </div>
);

export const ButtonLoader = ({ label = "Processando" }: { label?: string }) => (
  <span className="flex items-center justify-center gap-2">
    <Loader2 className="w-4 h-4 animate-spin" /> {label}
  </span>
);

export const EmptyState = ({ icon: Icon, title, desc, actionLabel, onAction }: any) => (
  <div className="border border-white/[0.06] border-dashed rounded-2xl py-20 px-6 flex flex-col items-center justify-center text-center">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white/30" />
    </div>
    <h3 className="text-white font-medium mb-2">{title}</h3>
    <p className="text-white/40 text-sm max-w-sm mb-6">{desc}</p>
    {actionLabel && (
      <button onClick={onAction} className="text-sm font-semibold text-black bg-white hover:bg-white/90 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> {actionLabel}
      </button>
    )}
  </div>
);

export const FullscreenProcessing = ({ status }: { status: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
    <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-white/10 border-t-[#009EE3] rounded-full animate-spin" />
      <div className="absolute inset-2 border-2 border-white/5 border-b-white/50 rounded-full animate-spin direction-reverse" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      <LogoTE className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-xl font-bold text-white mb-2">Processando Operação</h2>
    <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{status}</p>
  </motion.div>
);
