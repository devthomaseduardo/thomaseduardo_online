import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import aboutData from "../data/about.json";

const AboutSection = () => {
  const { t } = useLang();

  return (
    <section id="sobre" className="relative section-padding px-6 flex items-center justify-center overflow-hidden bg-pg-bg">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Text Column */}
          <motion.div {...FADE_UP} className="max-w-2xl">
            <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
              {t.about.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] text-white">
              <TextReveal>{t.about.h2a}</TextReveal> <br className="hidden sm:block" />
              <span className="text-white/40"><TextReveal delay={0.2}>{t.about.h2b}</TextReveal></span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-12">
              {t.about.p1}
            </p>

          </motion.div>

          {/* Certifications & Infra Column */}
          <div className="lg:pt-12 space-y-16">
            <div>
              <span className="text-white/30 font-mono text-xs uppercase font-medium tracking-widest mb-10 block">
                {t.about.certifications}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {aboutData.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="group flex items-start gap-5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                      {cert.logo ? (
                        <img 
                          src={cert.logo} 
                          alt={cert.issuer} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500" 
                        />
                      ) : (
                        <span className="text-xs font-bold text-white/20">{cert.initials}</span>
                      )}
                    </div>
                    <div className="space-y-1.5 pt-0.5">
                      <h4 className="text-sm font-medium text-white/80 tracking-tight group-hover:text-white transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                        {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Operating Systems & Cloud -> Infraestrutura Base */}
            <div className="pt-10">
              <span className="text-white/30 font-mono text-xs uppercase font-medium tracking-widest mb-8 block">
                Infraestrutura & Cloud
              </span>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Linux", logo: "https://cdn.simpleicons.org/linux/white" },
                  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/white" },
                  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/white" },
                  { name: "CI/CD", logo: "https://cdn.simpleicons.org/githubactions/white" },
                  { name: "Ubuntu", logo: "https://cdn.simpleicons.org/ubuntu/white" }
                ].map((os, idx) => (
                  <motion.div
                    key={os.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <img 
                      src={os.logo} 
                      alt={os.name} 
                      className="w-4 h-4 object-contain opacity-50" 
                    />
                    <span className="text-[11px] font-mono font-medium text-white/60 tracking-widest uppercase">
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
