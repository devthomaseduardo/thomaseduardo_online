import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import aboutData from "../data/about.json";

const AboutSection = () => {
  const { t } = useLang();

  return (
    <section id="sobre" className="relative py-16 px-6 flex items-center justify-center overflow-hidden">
      <div className="max-w-full mx-auto relative z-10 w-full px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Column */}
          <motion.div {...FADE_UP} className="max-w-2xl">
            <span className="text-white/30 font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">
              {t.about.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter leading-[1.1] text-white">
              <TextReveal>{t.about.h2a}</TextReveal> <br />
              <TextReveal delay={0.2}>{t.about.h2b}</TextReveal>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-tight font-medium">
              <p>{t.about.p1}</p>
              <p>
                {t.about.p2a}{" "}
                <span className="text-white font-bold italic underline decoration-white/20 underline-offset-8">
                  {t.about.p2bold1}
                </span>{" "}
                {t.about.p2mid}{" "}
                <span className="text-white font-bold italic underline decoration-white/20 underline-offset-8">
                  {t.about.p2bold2}
                </span>{" "}
                {t.about.p2end}
              </p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">
                Thomas Eduardo · {t.about.statusValue}
              </span>
            </div>
          </motion.div>

          {/* Certifications Column - NO BOXES */}
          <div className="lg:pt-12 space-y-16">
            <div>
              <span className="text-white/20 font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-10 block">
                {t.about.certifications}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
                {aboutData.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 transition-colors duration-500 overflow-hidden relative">
                        {cert.logo ? (
                          <img 
                            src={cert.logo} 
                            alt={cert.issuer} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        ) : (
                          <span className="text-xs font-bold text-white/20">{cert.initials}</span>
                        )}
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white/90 tracking-tight group-hover:text-white transition-colors">
                          {cert.title}
                        </h4>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider">
                            {cert.issuer}
                          </p>
                          {cert.date && (
                            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                              {cert.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Operating Systems */}
            <div className="pt-8 border-t border-white/5">
              <span className="text-white/20 font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-8 block">
                {t.about.os}
              </span>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Linux", logo: "https://cdn.simpleicons.org/linux/white" },
                  { name: "Ubuntu", logo: "https://cdn.simpleicons.org/ubuntu/white" },
                  { name: "Windows", logo: "https://cdn.simpleicons.org/windows/white" }
                ].map((os, idx) => (
                  <motion.div
                    key={os.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-colors group"
                  >
                    <img 
                      src={os.logo} 
                      alt={os.name} 
                      className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity" 
                    />
                    <span className="text-xs font-medium text-white/50 group-hover:text-white/90 tracking-wide uppercase">
                      {os.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
