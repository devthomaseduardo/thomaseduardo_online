import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, X } from "lucide-react";
import projectsData from "../data/projects.json";

export function LiveProjectStack() {
  const [activeId, setActiveId] = useState(projectsData[0].id);

  return (
    <section className="py-20 bg-[#060606] text-white">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold tracking-tighter mb-12">Ambiente de Operação</h2>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-white/[0.03] p-1 rounded-t-2xl border-x border-t border-white/5">
          {projectsData.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`px-6 py-3 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all ${
                activeId === p.id 
                  ? 'bg-[#0a0a0a] text-white' 
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Browser Window */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-b-2xl rounded-tr-2xl overflow-hidden shadow-2xl min-h-[70vh] flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 mx-4 bg-black/50 rounded-lg px-4 py-1.5 text-[10px] font-mono text-white/40 flex items-center gap-2">
              <Globe className="w-3 h-3" />
              {projectsData.find(p => p.id === activeId)?.link || "localhost:3000"}
            </div>
          </div>

          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {projectsData.map((p) => (
                p.id === activeId && (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    {p.link && !p.link.includes('github.com') ? (
                      <iframe 
                        src={p.link} 
                        className="w-full h-full"
                        title={p.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 font-mono">
                        No Live Preview Available
                      </div>
                    )}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
