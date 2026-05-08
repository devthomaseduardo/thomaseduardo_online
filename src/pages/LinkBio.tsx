
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight,
  ShoppingBag,
  Zap,
  Instagram,
  X,
  ChevronRight,
  ChevronLeft,
  Truck
} from "lucide-react";
import React, { useState } from "react";

const SMOOTH_TRANSITION = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: SMOOTH_TRANSITION,
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77a7.07 7.07 0 01-1.48 4.31c-1.41 1.76-3.8 2.58-5.99 2.11-2.43-.53-4.47-2.6-4.9-5.07a7.07 7.07 0 012.33-6.64c1.19-.89 2.68-1.29 4.16-1.15v4.11c-.72-.11-1.47.06-2.07.47a3.03 3.03 0 00-1.28 2.6c.11.96.79 1.83 1.71 2.11 1.09.33 2.37-.15 2.87-1.18.15-.3.21-.63.21-.96V.02z" />
  </svg>
);

const SpotlightCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative group rounded-[32px] overflow-hidden ${className}`}>
    <div className="relative bg-[#0F0F0F] rounded-[31px] h-full w-full">
      {children}
    </div>
  </div>
);

const LinkBio = () => {
  const QUICK_LINKS = [
    {
      href: "/",
      icon: <Globe className="w-6 h-6" />,
      label: "Site Oficial",
      meta: "thomaseduardo.online",
      description: "Portfólio completo e serviços.",
      isFull: true
    },
    {
      href: "https://linkedin.com/in/devthomaseduardo",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      meta: "Perfil profissional",
    },
    {
      href: "https://github.com/devthomaseduardo",
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      meta: "Repositórios",
    },
    {
      href: "https://instagram.com/devthomaseduardo",
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      meta: "@devthomaseduardo",
    },
    {
      href: "/cv-thomas.pdf",
      icon: <FileText className="w-6 h-6" />,
      label: "Currículo",
      meta: "CV online",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const STORE_PRODUCTS = [
    {
      id: "cropped-brasil",
      title: "Cropped Brasil",
      price: "R$ 79,90",
      description: "Estilo e conforto · Tamanho Único. O queridinho para os dias de jogo e para o lifestyle feminino.",
      image: "/produtos/cropped-brasil-amarelo-bordado0.png",
      images: [
        "/produtos/cropped-brasil-amarelo-bordado0.png",
        "/produtos/cropped-brasil-amarelo-bordado1.png",
        "/produtos/cropped-brasil-amarelo-bordado2.png",
        "/produtos/cropped-brasil-amarelo-bordado3.png",
        "/produtos/cropped-brasil-verde-bordado0.png",
        "/produtos/cropped-brasil-verde-bordado1.png",
        "/produtos/cropped-brasil-verde-bordado2.png"
      ],
      color: "from-pink-500/10 to-transparent",
      border: "border-pink-500/20",
      badge: "Tendência",
      stock: "Disponível",
      sizes: ["Único"],
      features: ["Tecido Confort", "Bordado Exclusivo", "Modelagem Ajustada", "Cores Vibrantes"]
    },
    {
      id: "jogador-1.1-amarela",
      title: "Jogador 1.1 Amarela",
      price: "R$ 220",
      description: "Modelo Profissional · Alta Performance. A mesma tecnologia usada em campo, com ajuste anatômico e tecido respirável.",
      image: "/produtos/camisa-brasil-2026-jogador-titular_3.jpg",
      images: Array.from({ length: 6 }, (_, i) => `/produtos/camisa-brasil-2026-jogador-titular_${i + 3}.jpg`),
      color: "from-yellow-500/10 to-transparent",
      border: "border-yellow-500/20",
      badge: "Pro Level",
      stock: "Disponível",
      isHot: true,
      sizes: ["GG", "2XL (G1 - XXL)"],
      features: ["Tecologia Vaporknit", "Escudo Termo-transferido", "Corte Atleta", "Alta Elasticidade"]
    },
    {
      id: "jogador-1.1-azul",
      title: "Jogador 1.1 Azul",
      price: "R$ 220",
      description: "Modelo Profissional · Blue Edition. Design moderno com a máxima tecnologia têxtil para performance superior.",
      image: "/produtos/camisa-brasil-2026-jogador-reserva0.jpg",
      images: Array.from({ length: 12 }, (_, i) => `/produtos/camisa-brasil-2026-jogador-reserva${i}.jpg`),
      color: "from-blue-600/10 to-transparent",
      border: "border-blue-600/20",
      badge: "Pro Level",
      stock: "Disponível",
      sizes: ["GG", "2XL (G1 - XXL)"],
      features: ["Leveza Extrema", "Gestão de Calor", "Corte Atleta", "Tecido Premium"]
    },
    {
      id: "torcedor-amarela",
      title: "Tailandesa Torcedor Amarela",
      price: "R$ 189,90",
      description: "Qualidade 1.1 · Torcedor. Conforto e fidelidade em cada detalhe do manto titular.",
      image: "/produtos/camisa-brasil-2026-torcedor-titular0.jpg",
      images: Array.from({ length: 10 }, (_, i) => `/produtos/camisa-brasil-2026-torcedor-titular${i === 9 ? '9.jpg' : i + '.jpg'}`),
      color: "from-yellow-400/10 to-transparent",
      border: "border-yellow-400/20",
      badge: "Top Seller",
      stock: "Disponível",
      sizes: ["P", "M", "G", "GG"],
      features: ["Qualidade Tailandesa", "Bordados Precisos", "Tecido Standard", "Etiquetas Oficiais"]
    },
    {
      id: "torcedor-azul-jordan",
      title: "Brasil Azul Jordan",
      price: "R$ 189,90",
      description: "Edição Especial · Jordan Brand. O estilo icônico da Jordan no manto mais pesado do mundo.",
      image: "/produtos/camisa-brasil-2026-torcedor-reserva0.jpg",
      images: Array.from({ length: 10 }, (_, i) => `/produtos/camisa-brasil-2026-torcedor-reserva${i}.jpg`),
      color: "from-blue-700/10 to-transparent",
      border: "border-blue-700/20",
      badge: "Especial",
      stock: "Disponível",
      sizes: ["P", "M", "G", "GG"],
      features: ["Jumpman Logo", "Design Exclusivo", "Qualidade 1.1", "Conforto Premium"]
    },
    {
      id: "retro-98",
      title: "Retro Brasil 1998",
      price: "R$ 189,90",
      description: "Copa 98 · Relíquia. A clássica amarela da Copa da França com acabamento impecável.",
      image: "/produtos/camisa-brasil-1998-amarela0.jpg",
      images: Array.from({ length: 12 }, (_, i) => `/produtos/camisa-brasil-1998-amarela${i}.jpg`),
      color: "from-emerald-600/10 to-transparent",
      border: "border-emerald-600/20",
      badge: "Clássico",
      stock: "Disponível",
      sizes: ["M", "G", "GG"],
      features: ["Fidelidade 1.1", "Etiquetas de Época", "Bordados Retrô", "Tecido Original"]
    },
    {
      id: "retro-06-amarela",
      title: "Retro 2006 Amarela",
      price: "R$ 189,90",
      description: "Quadrado Mágico · 2006. Relembre o time de estrelas com esta peça histórica.",
      image: "https://placehold.co/400x500/0A0A0A/EAB308?text=RETRO+06+AM",
      images: ["https://placehold.co/400x500/0A0A0A/EAB308?text=RETRO+06+AM"],
      color: "from-yellow-500/10 to-transparent",
      border: "border-yellow-500/20",
      badge: "Mágico",
      stock: "Esgotado",
      sizes: ["M", "GG", "2XL (G1 - XXL)"],
      features: ["Gola V Icônica", "Material Respirável", "Escudo Bordado", "Selo de Autenticidade"]
    },
    {
      id: "retro-06-azul",
      title: "Retro 2006 Azul",
      price: "R$ 189,90",
      description: "Tailandesa Premium · Blue. O design clássico de 2006 na versão reserva.",
      image: "/produtos/camisa-brasil-2006-azul-ronaldinho0.png",
      images: Array.from({ length: 9 }, (_, i) => `/produtos/camisa-brasil-2006-azul-ronaldinho${i}.png`),
      color: "from-blue-800/10 to-transparent",
      border: "border-blue-800/20",
      badge: "Elegante",
      stock: "Disponível",
      sizes: ["M", "GG", "2XL (G1 - XXL)"],
      features: ["Acabamento Slim", "Tecido Heavy", "Detalhes em Prata", "Qualidade Tailandesa"]
    },
    {
      id: "ronaldinho-06",
      title: "Ronaldinho 2006",
      price: "R$ 199,90",
      description: "R10 Edition · O Bruxo. Camisa personalizada do melhor do mundo no auge.",
      image: "/produtos/camisa-brasil-2006-azul-ronaldinho0.png",
      images: Array.from({ length: 9 }, (_, i) => `/produtos/camisa-brasil-2006-azul-ronaldinho${i}.png`),
      color: "from-blue-600/10 to-transparent",
      border: "border-blue-600/20",
      badge: "O Bruxo",
      stock: "Últimas unidades",
      isHot: true,
      sizes: ["M"],
      features: ["Nome e Número 10", "Fonte Original", "Patch da Copa", "Edição de Colecionador"]
    },
    {
      id: "retro-94",
      title: "Retro Brasil 94",
      price: "R$ 199,90",
      description: "Tetra 94 · Romário. O manto da conquista histórica com o brasão central e as três estrelas.",
      image: "/produtos/camisa-brasil-1994-sem-nome0.png",
      images: [
        ...Array.from({ length: 9 }, (_, i) => `/produtos/camisa-brasil-1994-sem-nome${i}.png`),
        ...Array.from({ length: 9 }, (_, i) => `/produtos/camisa-brasil-azul-romario${i}.png`)
      ],
      color: "from-yellow-600/10 to-transparent",
      border: "border-yellow-600/20",
      badge: "Tetra",
      stock: "Disponível",
      sizes: ["M", "G", "GG"],
      features: ["Escudo Bordado", "Tecido Jacquard", "Selo Comemorativo", "Gola Polo Retrô"]
    },
    {
      id: "bone-nike-sb-amarelo",
      title: "Boné Nike SB Amarelo",
      price: "R$ 89,90",
      description: "Edição Streetwear · Amarelo. Conforto e estilo com a qualidade Nike SB para representar o Brasil.",
      image: "/produtos/bone-brasil-nike-sb-amarelo-01.png",
      images: ["/produtos/bone-brasil-nike-sb-amarelo-01.png"],
      color: "from-yellow-400/10 to-transparent",
      border: "border-yellow-400/20",
      badge: "Streetwear",
      stock: "Disponível",
      sizes: ["Único"],
      features: ["Aba Reta", "Ajuste Snapback", "Tecido Resistente", "Logo Bordado"]
    },
    {
      id: "bone-nike-sb-branco",
      title: "Boné Nike SB Branco",
      price: "R$ 89,90",
      description: "Clean Style · Branco. Design minimalista com o toque esportivo da Nike SB.",
      image: "/produtos/bone-brasil-nike-sb-branco-01.png",
      images: ["/produtos/bone-brasil-nike-sb-branco-01.png"],
      color: "from-gray-100/10 to-transparent",
      border: "border-gray-100/20",
      badge: "Novo",
      stock: "Disponível",
      sizes: ["Único"],
      features: ["Aba Reta", "Ajuste Snapback", "Design Clean", "Material Premium"]
    },
    {
      id: "bone-nike-sb-azul",
      title: "Boné Nike SB Azul",
      price: "R$ 89,90",
      description: "Heritage86 · Azul. Modelo clássico com ajuste confortável e aba curva.",
      image: "/produtos/bone-brasil-nike-sb-heritage86-azul-01.png",
      images: ["/produtos/bone-brasil-nike-sb-heritage86-azul-01.png"],
      color: "from-blue-600/10 to-transparent",
      border: "border-blue-600/20",
      badge: "Heritage",
      stock: "Disponível",
      sizes: ["Único"],
      features: ["Aba Curva", "Fivela Ajustável", "Estilo Clássico", "Respirável"]
    },
    {
      id: "bone-nike-sb-preto",
      title: "Boné Nike SB Preto",
      price: "R$ 89,90",
      description: "Essential · Preto. O boné indispensável para qualquer look, com a durabilidade Nike SB.",
      image: "/produtos/bone-brasil-nike-sb-preto-01.png",
      images: ["/produtos/bone-brasil-nike-sb-preto-01.png"],
      color: "from-gray-900/10 to-transparent",
      border: "border-gray-900/20",
      badge: "Essencial",
      stock: "Disponível",
      sizes: ["Único"],
      features: ["Aba Reta", "Ajuste Snapback", "Cor Versátil", "Alta Durabilidade"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8 px-6 selection:bg-brand-blue/30">
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes mesh-shift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}} />

      <div className="fixed inset-0 bg-dot-mesh opacity-10 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 50%)',
          backgroundSize: '100% 100%',
          animation: 'mesh-shift 20s infinite linear'
        }}
      />
      
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div 
          {...FADE_UP}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full border-2 border-brand-blue p-1.5 mx-auto mb-4 relative group">
            <div className="absolute inset-0 rounded-full bg-brand-blue/30 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
             <img src="/avatar-linkbio.png" alt="Thomas Eduardo" className="w-full h-full rounded-full object-cover shadow-2xl relative z-10 border border-white/10" />
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-blue rounded-full border-2 border-[#0A0A0A] flex items-center justify-center z-20">
               <Zap className="w-3 h-3 text-white fill-white" />
             </div>
          </div>
          <h1 className="text-4xl font-black uppercase italic mb-1 tracking-tighter">Thomas Eduardo</h1>
          <p className="text-brand-blue text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-1">Senior Fullstack Engineer</p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-[8px] font-bold uppercase tracking-widest">
            <Globe className="w-2.5 h-2.5" />
            <span>São Paulo, Brasil</span>
          </div>
        </motion.div>

        <div className="space-y-3 mb-10">
          <motion.a
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
            href="https://wa.me/5511977070209"
            target="_blank"
            className="group flex w-full items-center justify-between gap-4 rounded-[32px] border border-brand-blue/40 bg-linear-to-br from-brand-blue via-brand-blue/90 to-brand-cyan px-7 py-5 text-left shadow-2xl shadow-brand-blue/20 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-inner">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block font-black text-lg text-white uppercase tracking-tight leading-none mb-1">Diagnóstico Grátis</span>
                <span className="text-[9px] text-white/80 uppercase font-bold tracking-widest">Vamos escalar seu produto</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
          </motion.a>

          {/* Primary Site Link - Full Width */}
          {QUICK_LINKS.filter(l => l.isFull).map((link, i) => (
            <motion.a
              key={i}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.15 }}
              href={link.href}
              target="_blank"
              className="group flex w-full items-center justify-between gap-4 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-2xl px-7 py-5 text-left hover:border-brand-blue/40 hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-all duration-300">
                  {link.icon}
                </div>
                <div>
                  <span className="block font-black text-lg text-white uppercase tracking-tight leading-none mb-1">{link.label}</span>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{link.meta}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-800 group-hover:text-brand-cyan transition-colors" />
            </motion.a>
          ))}

          {/* Social Links - 2x2 Grid for Balance */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.filter(l => !l.isFull).map((link, i) => (
              <motion.a
                key={i}
                {...FADE_UP}
                transition={{ ...SMOOTH_TRANSITION, delay: 0.2 + (i * 0.05) }}
                href={link.href}
                target="_blank"
                className="group flex flex-col p-5 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-2xl hover:border-brand-blue/40 hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-all duration-300">
                    {React.cloneElement(link.icon as React.ReactElement, { className: "w-5 h-5" })}
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-800 group-hover:text-brand-cyan transition-all" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white uppercase tracking-tight mb-0.5">{link.label}</span>
                  <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{link.meta}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* TikTok Spotlight - High Conversion & Dedicated */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.4 }}
            className="mt-4"
          >
            <SpotlightCard>
              <a 
                href="https://www.tiktok.com/@devthomaseduardo" 
                target="_blank"
                className="flex items-center gap-5 p-5 group/tiktok"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 group-hover/tiktok:opacity-40 transition-opacity" />
                  <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center relative z-10">
                    <TikTokIcon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-mono font-bold text-brand-blue uppercase tracking-widest">Em Destaque</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                  </div>
                  <h4 className="text-base font-black uppercase italic tracking-tighter leading-none mb-1">Dicas no TikTok</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">@devthomaseduardo</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover/tiktok:text-brand-blue transition-colors" />
              </a>
            </SpotlightCard>
          </motion.div>
        </div>

        <motion.div
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.6 }}
          className="relative mt-12 pt-8 border-t border-white/5 overflow-hidden"
        >
          <div className="flex items-center justify-between px-2 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px w-6 bg-brand-blue/50" />
                <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-blue">
                  Shop Seleção
                </h2>
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">Equipamentos <span className="text-brand-blue text-lg">PRO</span></h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[7px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Status</p>
                <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  Loja Ativa
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-visible -mx-6">
            <motion.div 
              className="flex gap-5 px-6 w-fit will-change-transform pb-10"
              animate={{
                x: [0, -3920], // 14 products * (260px width + 20px gap) = 3920
              }}
              transition={{
                duration: 30, // Slightly slower for more items
                ease: "linear",
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...STORE_PRODUCTS, ...STORE_PRODUCTS].map((product, i) => (
                <div
                  key={`${product.id}-${i}`}
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveImageIndex(0);
                    setSelectedSize(product.sizes[0]);
                  }}
                  className="w-[260px] cursor-pointer flex-shrink-0 rounded-[40px] border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 relative overflow-hidden group transition-all duration-700 hover:border-brand-blue/50 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent pointer-events-none" />
                  
                  <div className="aspect-[4/5] w-full mb-6 rounded-3xl overflow-hidden bg-[#0F0F0F] relative border border-white/5 shadow-2xl">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      onError={(e) => { e.currentTarget.src = `https://placehold.co/400x500/0A0A0A/FFFFFF?text=${product.title}`; }}
                    />
                  </div>

                  <div className="space-y-3 mb-6 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-black uppercase italic tracking-tight text-white group-hover:text-brand-blue transition-colors duration-500 line-clamp-1">{product.title}</h4>
                      <span className="text-xs font-black text-brand-blue shrink-0">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.badge && (
                        <span className="px-2 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-[7px] font-black uppercase tracking-widest border border-brand-blue/20">
                          {product.badge}
                        </span>
                      )}
                      <span className="text-[7px] text-gray-500 font-bold uppercase tracking-widest">{product.stock}</span>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white text-[10px] font-black uppercase group-hover:bg-white group-hover:text-black transition-all duration-500 group/btn shadow-xl"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Ver Detalhes
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Fade overlays for depth */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
          </div>
        </motion.div>

        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.8 }}
          className="mt-8 text-center pb-10"
        >
          <div className="w-10 h-1 bg-white/5 mx-auto mb-6 rounded-full" />
          <p className="text-gray-800 text-[8px] uppercase tracking-[0.5em] font-mono font-bold">
            Handcrafted by Thomas Eduardo © 2026
          </p>
        </motion.div>
      </div>

      {/* Product Gallery Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0F0F0F] rounded-[40px] border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Image Gallery Side */}
                <div className="w-full md:w-3/5 bg-black/20 p-6 flex flex-col gap-4">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 shadow-inner bg-[#0A0A0A] relative group/main">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        src={selectedProduct.images[activeImageIndex]} 
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover" 
                        alt={`${selectedProduct.title} - View ${activeImageIndex + 1}`}
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/600x750/0A0A0A/FFFFFF?text=${selectedProduct.title}+${activeImageIndex + 1}`; }}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation Arrows */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/main:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                        className="h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-brand-blue transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                        className="h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-brand-blue transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${activeImageIndex === idx ? 'border-brand-blue ring-2 ring-brand-blue/20 scale-95' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                      >
                        <img 
                          src={img} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = `https://placehold.co/100x100/0A0A0A/FFFFFF?text=D${idx+1}`; }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-between border-l border-white/5 bg-white/[0.01]">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-[8px] font-black uppercase tracking-widest border border-brand-blue/20">
                        {selectedProduct.badge}
                      </span>
                      <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                        {selectedProduct.stock}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{selectedProduct.title}</h2>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-2xl font-black text-white">{selectedProduct.price}</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-xs text-gray-600 line-through font-bold mb-1">{selectedProduct.oldPrice}</span>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Tamanhos Disponíveis</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all duration-300 border ${selectedSize === size ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="space-y-2 mb-8">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3">Destaques</p>
                      {selectedProduct.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300 font-bold uppercase tracking-tight">
                          <Zap className="w-3 h-3 text-brand-blue" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-8">
                      <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-tight">Frete Fixo: R$ 35,00</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Entrega em todo o Brasil</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-0.5">Total</p>
                        <p className="text-sm font-black text-brand-blue">
                          {(() => {
                            const price = parseFloat(selectedProduct.price.replace("R$", "").replace(".", "").replace(",", ".").trim());
                            return `R$ ${(price + 35).toFixed(2).replace(".", ",")}`;
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/5511977070209?text=Olá Thomas! Tenho interesse no ${selectedProduct.title} (${selectedSize}) da Loja Seleção.%0A%0AValor do Produto: ${selectedProduct.price}%0AFrete Fixo: R$ 35,00%0ATotal: ${(() => {
                      const price = parseFloat(selectedProduct.price.replace("R$", "").replace(".", "").replace(",", ".").trim());
                      return `R$ ${(price + 35).toFixed(2).replace(".", ",")}`;
                    })()}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-brand-blue text-white text-xs font-black uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-brand-blue/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Comprar Agora via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinkBio;
