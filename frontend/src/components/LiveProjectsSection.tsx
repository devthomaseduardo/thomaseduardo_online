import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, ArrowRight, ChevronRight, ArrowUpRight, 
  Loader2, AlertCircle, Code2, Cpu, Zap, Activity, Layers 
} from "lucide-react";
import { PRODUCTION_PROJECTS, CONTACT } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function LiveProjectsSection() {
  const [i, setI] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const total = PRODUCTION_PROJECTS.length;
  const project = PRODUCTION_PROJECTS[i];

  const prev = () => {
    setI((p) => (p - 1 + total) % total);
    setIframeLoading(true);
    setIframeError(false);
  };

  const next = () => {
    setI((p) => (p + 1) % total);
    setIframeLoading(true);
    setIframeError(false);
  };

  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);
  }, [i]);

  return (
    <section
      id="sistemas"
      className="relative overflow-hidden border-y border-[#18181B] bg-[#050505] py-20 sm:py-32"
    >
      {/* Ghost text marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden">
        <motion.div
          key={`marquee-${i}`}
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex w-max gap-8 font-bold text-[25vw] uppercase leading-none tracking-tighter text-white/[0.01] sm:gap-16 sm:text-[20vw]"
        >
          {[...PRODUCTION_PROJECTS, ...PRODUCTION_PROJECTS].map((p, idx) => (
            <span key={idx} className="whitespace-nowrap">
              {p.name} /
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8 sm:mb-20">
          <div className="max-w-3xl">
            <span className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#A1A1AA]">
              <Code2 className="h-3 w-3" /> Systems_Repository // {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-6 font-bold text-[clamp(2.5rem,8vw,5rem)] tracking-tighter leading-[0.9] text-white">
              Sistemas que <br />
              <span className="text-white/20">escalam.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#18181B] bg-[#0A0A0A] p-2 backdrop-blur-xl">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-xl text-[#71717A] transition-all hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-xl text-[#71717A] transition-all hover:bg-white/5 hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Device Display */}
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="relative rounded-2xl border border-[#18181B] bg-[#0A0A0A] p-2 shadow-2xl backdrop-blur-3xl sm:p-4">
            {/* Top Bar */}
            <div className="flex items-center gap-2 pb-4 pl-2">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-rose-500/20" />
                <div className="h-2 w-2 rounded-full bg-amber-500/20" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/20" />
              </div>
              <div className="ml-4 truncate rounded-full bg-white/[0.03] px-4 py-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                {project.domain}
              </div>
              {project.liveUrl && (
                <div className="ml-auto flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live_Process
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0a0a0a] ring-1 ring-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Iframe Logic */}
                  {project.liveUrl ? (
                    <div className="h-full w-full relative">
                      {iframeLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]">
                          <Loader2 className="h-8 w-8 animate-spin text-white/10" />
                        </div>
                      )}
                      {iframeError ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] p-8 text-center">
                          <AlertCircle className="h-12 w-12 text-rose-500/20 mb-4" />
                          <p className="text-sm font-mono text-white/40 uppercase tracking-widest">Falha na conexão com o sistema</p>
                        </div>
                      ) : (
                        <iframe
                          src={project.liveUrl}
                          className="h-full w-full border-none"
                          loading="lazy"
                          onLoad={() => setIframeLoading(false)}
                          onError={() => setIframeError(true)}
                          title={project.name}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="h-full w-full">
                       <img src={project.image} alt={project.name} className="h-full w-full object-cover grayscale opacity-40" />
                    </div>
                  )}

                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 sm:p-16 flex flex-col justify-end pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="max-w-2xl"
                    >
                      <h3 className="font-bold text-4xl sm:text-6xl tracking-tighter text-white uppercase mb-4">
                        {project.name}
                      </h3>
                      <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed mb-8">
                        {project.tagline}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          <Cpu className="h-3 w-3" /> System
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          <Zap className="h-3 w-3" /> Auto
                        </div>
                        {project.tech.map((t) => (
                          <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.01] border border-white/[0.03] text-[9px] font-mono text-white/20 uppercase tracking-widest">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Base Decor */}
          <div className="mx-auto h-2 w-[98%] rounded-b-2xl bg-white/5 opacity-50 blur-[2px]" />
        </div>

        {/* Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-[#FAFAFA] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:scale-[1.02] active:scale-95"
          >
            <WhatsAppIcon size={16} /> Discutir Operação
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/5"
            >
              Abrir ao vivo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
