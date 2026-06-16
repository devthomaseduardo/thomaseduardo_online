import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';

export function AvailabilitySection() {
  const { t, lang } = useLang();

  const calendarData = useMemo(() => {
    const now = new Date();
    // Projeta o calendário para o próximo mês
    const displayMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthName = displayMonth.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'long' });
    const year = displayMonth.getFullYear();
    
    const daysInMonth = new Date(year, displayMonth.getMonth() + 1, 0).getDate();
    const firstDayIdx = displayMonth.getDay(); // 0 (Dom) a 6 (Sab)

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isAvailable: (i + 1) > 15 // Primeiros 15 dias sempre indisponíveis
    }));

    const padding = Array.from({ length: firstDayIdx }, () => null);

    return { monthName, year, days, padding };
  }, [lang]);

  const weekDays = lang === 'pt' 
    ? ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section id="disponibilidade" className="py-20 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div {...FADE_UP} transition={SMOOTH_TRANSITION}>
            <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.3em] uppercase mb-6 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/5 inline-block">
              {t.availability.eyebrow}
            </span>
            <div className="flex items-center gap-4 mb-6">
              <div className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-mono uppercase tracking-widest animate-pulse">Indisponível agora</div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 uppercase">
              {t.availability.h2}
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-8 max-w-md">
              {t.availability.desc}
            </p>
            
            <div className="flex items-center gap-6 mb-10 border-l border-white/10 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-mono text-white/40 uppercase">{t.availability.available}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="text-xs font-mono text-white/40 uppercase">{t.availability.unavailable}</span>
              </div>
            </div>

            <a 
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, vi sua disponibilidade no site e gostaria de reservar um slot.")}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              <CalendarIcon className="w-4 h-4" />
              {t.availability.cta}
            </a>
          </motion.div>

          <motion.div 
            {...FADE_UP} 
            transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
            className="bg-neutral-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white capitalize font-mono">
                {calendarData.monthName} <span className="text-white/20">{calendarData.year}</span>
              </h3>
              <Info className="w-4 h-4 text-white/20" />
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {weekDays.map(d => (
                <div key={d} className="text-[10px] font-mono text-white/20 text-center uppercase mb-2">
                  {d}
                </div>
              ))}
              
              {calendarData.padding.map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}

              {calendarData.days.map(({ day, isAvailable }) => (
                <div 
                  key={day}
                  className={`
                    aspect-square rounded-xl border flex items-center justify-center text-[11px] font-mono transition-all duration-500
                    ${isAvailable 
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                      : 'bg-white/5 border-white/5 text-white/20'
                    }
                  `}
                >
                  {day.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}