import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Image as ImageIcon, FileText, Palette, Key, CheckCircle2, HelpCircle, ChevronDown, Info } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { FADE_UP } from "../constants/animations";

const MaterialPage = () => {
  const { lang } = useLang();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const materials = [
    {
      id: "brand",
      icon: <Palette className="w-6 h-6 text-white/70" />,
      title_pt: "Identidade Visual & Marca",
      title_en: "Visual Identity & Branding",
      desc_pt: "Logotipo em alta resolução (Vetor, SVG ou PNG transparente), paleta de cores oficial e tipografias (fontes) da sua marca.",
      desc_en: "High resolution logo (Vector, SVG or transparent PNG), official color palette and typography (fonts) of your brand.",
      solution_pt: "Não tem uma marca? Nós desenvolvemos uma identidade visual premium do zero ou modernizamos a sua atual para o projeto.",
      solution_en: "Don't have a brand? We can develop a premium visual identity from scratch or modernize your current one for the project."
    },
    {
      id: "copy",
      icon: <FileText className="w-6 h-6 text-white/70" />,
      title_pt: "Textos & Copywriting",
      title_en: "Texts & Copywriting",
      desc_pt: "Textos institucionais (quem somos), descrições de serviços/produtos, diferenciais, depoimentos de clientes e informações de contato.",
      desc_en: "Institutional texts (about us), service/product descriptions, differentials, client testimonials, and contact information.",
      solution_pt: "Se não tiver textos prontos, não se preocupe. Contamos com um processo guiado para extrair essas informações e redatores para criar uma comunicação focada em conversão.",
      solution_en: "If you don't have texts ready, don't worry. We have a guided process to extract this information and copywriters to create conversion-focused communication."
    },
    {
      id: "media",
      icon: <ImageIcon className="w-6 h-6 text-white/70" />,
      title_pt: "Imagens, Mídia & Referências",
      title_en: "Images, Media & References",
      desc_pt: "Fotos do seu espaço, equipe, produtos ou serviços realizados. Vídeos institucionais ou materiais gráficos. Para melhor qualidade, envie imagens em alta resolução (mínimo de 1920x1080px para banners horizontais e 1080x1080px para formatos quadrados). Por favor, forneça também links de referência (sites, perfis ou moodboards) que inspirem o estilo visual que você deseja.",
      desc_en: "Photos of your space, team, products or services provided. Institutional videos or graphic materials. For best quality, please send high-resolution images (minimum 1920x1080px for horizontal banners and 1080x1080px for square formats). Please also provide reference links (websites, profiles, or moodboards) that inspire the visual style you desire.",
      solution_pt: "Caso não possua fotos profissionais, podemos utilizar bancos de imagens premium (licenciados) de alta qualidade ou orientar sua equipe na produção das fotos ideais.",
      solution_en: "If you don't have professional photos, we can use premium high-quality stock images (licensed) or guide your team in producing the ideal photos."
    },
    {
      id: "access",
      icon: <Key className="w-6 h-6 text-white/70" />,
      title_pt: "Acessos & Credenciais",
      title_en: "Access & Credentials",
      desc_pt: "Acesso ao provedor de domínio (Registro.br, GoDaddy, HostGator), acessos a redes sociais (para links) e contas de ferramentas como Google Analytics ou Pixel da Meta.",
      desc_en: "Access to the domain provider (GoDaddy, Namecheap, etc), social media access (for links) and accounts for tools like Google Analytics or Meta Pixel.",
      solution_pt: "Se for o seu primeiro site, nós criamos e configuramos absolutamente tudo: desde o registro do domínio até a hospedagem em nossos servidores de alta performance.",
      solution_en: "If it's your first site, we create and configure absolutely everything: from domain registration to hosting on our high-performance servers."
    }
  ];

  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      
      <main className="section-padding px-6 max-w-4xl mx-auto pt-32 pb-24">
        {/* Page Header */}
        <motion.div {...FADE_UP} className="mb-16">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-6">
            {lang === "pt" ? "Onboarding do Cliente" : "Client Onboarding"}
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold tracking-tighter leading-[1.1] text-white mb-6 uppercase">
            {lang === "pt" ? "Materiais para iniciar o projeto" : "Materials to start the project"}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
            {lang === "pt" 
              ? "Para garantir a excelência e rapidez na entrega, precisamos de alguns insumos essenciais. Veja abaixo o que é necessário e o que fazemos caso você não os tenha."
              : "To ensure excellence and speed in delivery, we need some essential inputs. See below what is required and what we do if you don't have them."}
          </p>
        </motion.div>

        {/* Material List (Accordion) */}
        <div className="flex flex-col gap-4">
          {materials.map((item, index) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'}`}
              >
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-white">
                      {lang === "pt" ? item.title_pt : item.title_en}
                    </h3>
                  </div>
                  
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }} 
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2">
                        <div className="flex flex-col gap-6 pl-0 md:pl-20">
                          <p className="text-white/60 leading-relaxed font-light flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500/70 mt-0.5 flex-shrink-0" />
                            <span>{lang === "pt" ? item.desc_pt : item.desc_en}</span>
                          </p>
                          
                          <div className="pt-6 mt-2 border-t border-white/5">
                            <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <HelpCircle className="w-3.5 h-3.5" />
                              {lang === "pt" ? "E se eu não tiver?" : "What if I don't have it?"}
                            </h4>
                            <p className="text-white/50 font-light leading-relaxed text-sm md:text-base">
                              {lang === "pt" ? item.solution_pt : item.solution_en}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Importance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 mt-1">
            <Info className="w-5 h-5 text-white/70" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              {lang === "pt" ? "Por que isso é importante?" : "Why is this important?"}
            </h3>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              {lang === "pt" 
                ? "O envio completo e correto destes materiais logo no início nos permite focar 100% na qualidade do design e no resultado, evitando pausas no desenvolvimento e garantindo que o seu projeto seja entregue com o nível de excelência que sua marca merece."
                : "The complete and correct submission of these materials right at the beginning allows us to focus 100% on the quality of the design and the result, avoiding pauses in development and ensuring your project is delivered with the level of excellence your brand deserves."}
            </p>
          </div>
        </motion.div>
        
        {/* Next Steps CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center border-t border-white/10 pt-16"
        >
          <h2 className="text-2xl text-white font-medium mb-4">
            {lang === "pt" ? "Tudo pronto para começar?" : "Ready to get started?"}
          </h2>
          <p className="text-white/50 font-light mb-8 max-w-md mx-auto">
            {lang === "pt" 
              ? "Reúna o que tiver disponível e nos envie. O que faltar, nós resolvemos em conjunto durante o projeto."
              : "Gather what you have available and send it to us. What is missing, we will solve together during the project."}
          </p>
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 bg-white text-black font-medium text-sm tracking-wide rounded-full hover:bg-white/90 transition-colors"
          >
            {lang === "pt" ? "ENVIAR MATERIAIS" : "SEND MATERIALS"}
          </a>
        </motion.div>

      </main>
    </div>
  );
};

export default MaterialPage;
