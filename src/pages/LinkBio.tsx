
import { motion } from "motion/react";
import { 
  Globe, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight 
} from "lucide-react";
import React from "react";

const SMOOTH_TRANSITION = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: SMOOTH_TRANSITION,
};

const LinkBio = () => {
  const QUICK_LINKS = [
    {
      href: "#",
      icon: <Globe className="w-6 h-6" />,
      label: "Site Oficial",
      meta: "thomaseduardo.online",
      description: "Portfólio completo e serviços.",
    },
    {
      href: "#",
      icon: <FileText className="w-6 h-6" />,
      label: "Currículo",
      meta: "CV online",
      description: "Acesso livre · sem cadastro.",
    },
    {
      href: "https://linkedin.com/in/devthomaseduardo",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      meta: "Perfil profissional",
      description: "Networking, carreira e artigos.",
    },
    {
      href: "https://github.com/devthomaseduardo",
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      meta: "Repositórios",
      description: "Código aberto e arquitetura.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-20 px-6">
      <div className="absolute inset-0 bg-dot-mesh [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] opacity-30" />
      
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div 
          {...FADE_UP}
          className="text-center mb-16"
        >
          <div className="w-28 h-28 rounded-full border-2 border-brand-blue p-1 mx-auto mb-8">
             <img src="/thomas.png" alt="Thomas Eduardo" className="w-full h-full rounded-full object-cover shadow-2xl shadow-brand-blue/20" />
          </div>
          <h1 className="text-5xl font-black uppercase italic mb-4 tracking-tighter">Thomas Eduardo</h1>
          <p className="text-gray-400 text-xl font-medium">Engenharia de Software de Alta Performance</p>
        </motion.div>

        <div className="space-y-6">
          <motion.a
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
            href="https://wa.me/5511977070209"
            target="_blank"
            className="group flex w-full items-center justify-between gap-4 rounded-[32px] border border-brand-blue/30 bg-linear-to-br from-brand-blue via-brand-blue/80 to-brand-cyan px-8 py-7 text-left shadow-2xl shadow-brand-blue/20 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="block font-black text-2xl text-white uppercase tracking-tight">Fazer Diagnóstico</span>
                <span className="text-sm text-white/80">Me diga seu cenário. Eu devolvo o escopo.</span>
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>

          {QUICK_LINKS.map((link, i) => (
            <motion.a
              key={i}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.2 + (i * 0.1) }}
              href={link.href}
              target="_blank"
              className="group flex items-center justify-between gap-4 p-8 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 text-gray-400 group-hover:text-brand-cyan transition-colors">
                  {link.icon}
                </div>
                <div>
                  <span className="block font-bold text-xl text-white uppercase tracking-tight">{link.label}</span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-none">{link.meta}</span>
                  <span className="block text-sm text-gray-500 mt-1">{link.description}</span>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-brand-cyan transition-colors" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 text-xs uppercase tracking-widest font-mono">
            © 2026 thomaseduardo.online
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBio;
