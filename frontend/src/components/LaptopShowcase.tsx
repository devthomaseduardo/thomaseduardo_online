import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronRight, ArrowUpRight, Globe, Image as ImageIcon, Loader2 } from "lucide-react";
import projectsData from "../data/projects.json";
import { useLang } from "../contexts/LangContext";

export function LaptopShowcase() {
  const [i, setI] = useState(0);
  const [showLive, setShowLive] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  
  // Assuming desktop environment for simplicity, or add a hook if needed.
  const isMobile = false; 
  
  const total = projectsData.length;
  
  const prev = () => { setI((p) => (p - 1 + total) % total); setShowLive(false); };
  const next = () => { setI((p) => (p + 1) % total); setShowLive(false); };
  
  const project = projectsData[i];

  useEffect(() => {
    setIframeLoading(true);
  }, [i, showLive]);

  return (
    <section
      id="trabalhos"
      className="relative overflow-hidden bg-(--pg-bg) py-20 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500 sm:text-xs"> 
              <ChevronRight className="h-3 w-3" /> Trabalhos {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white uppercase leading-[0.95] sm:mt-4 sm:text-6xl">
              Sistemas que <br />reduzem gargalos.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 backdrop-blur-md sm:p-1.5">
            <button
              onClick={prev}
              aria-label="Projeto anterior"
              className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white hover:text-black sm:h-9 sm:w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Próximo projeto"
              className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white hover:text-black sm:h-9 sm:w-9"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* laptop */}
        <div className="relative mx-auto w-full max-w-5xl">
          {/* halo */}
          <div className="pointer-events-none absolute inset-x-10 -top-10 h-40 rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="relative rounded-t-xl bg-gradient-to-b from-white/[0.04] to-transparent p-1 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:rounded-t-2xl sm:p-2">
            {/* top bar */}
            <div className="flex items-center gap-1.5 pb-2 pl-2 sm:pb-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500/40 sm:h-2 sm:w-2" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/40 sm:h-2 sm:w-2" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500/40 sm:h-2 sm:w-2" />
              </div>
              <span className="ml-2 truncate rounded-full bg-white/5 px-2 py-0.5 font-mono text-[8px] text-white/50 sm:ml-3 sm:px-3 sm:text-[9px]">
                {project.link}
              </span>
              
              {project.link && !isMobile && (
                <button 
                  onClick={() => setShowLive(!showLive)}
                  className="ml-auto mr-2 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-emerald-500 transition-colors hover:bg-emerald-500/20"
                >
                  {showLive ? (
                    <><ImageIcon className="h-2 w-2" /> Ver Print</>
                  ) : (
                    <><Globe className="h-2 w-2" /> Preview Real</>
                  )}
                </button>
              )}
            </div>

            {/* screen */}
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg sm:aspect-[16/10] bg-zinc-900">
              <AnimatePresence mode="wait">
                {showLive && project.link && !isMobile ? (
                  <motion.div
                    key="live-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 h-full w-full"
                  >
                    {iframeLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-10">
                        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                      </div>
                    )}
                    <iframe 
                      src={project.link} 
                      className="h-full w-full border-0" 
                      title={project.title}
                      onLoad={() => setIframeLoading(false)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-zinc-900"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
                        {/* No logo placeholder */}
                      </div>
                    )}
                    
                    {/* Overlay gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-12 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="mt-2 text-2xl font-bold leading-[0.95] text-white sm:mt-3 sm:text-5xl">
                          {project.title}
                        </p>
                        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/80 sm:mt-4 sm:text-base">
                          {project.descricao}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* laptop base */}
          <div className="relative mx-auto h-2 w-[102%] -translate-x-[1%] rounded-b-xl bg-gradient-to-b from-white/10 to-white/[0.02] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] sm:h-2.5 sm:w-[104%] sm:-translate-x-[2%] sm:rounded-b-2xl" />
        </div>
      </div>
    </section>
  );
}
