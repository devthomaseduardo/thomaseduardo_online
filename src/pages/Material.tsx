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
      id: "materiais",
      icon: <Palette className="w-6 h-6 text-white/70" />,
      title_pt: "Materiais necessários",
      title_en: "Required materials",
      desc_pt: "Para iniciar, precisaremos da sua logo, manual de identidade visual, textos institucionais, imagens em alta resolução, vídeos, referências visuais e acessos importantes (como painel de domínio).",
      desc_en: "To start, we'll need your logo, brand guidelines, institutional texts, high-resolution images, videos, visual references, and important access (such as domain panel).",
      solution_pt: "Se não tiver marca ou textos prontos, nós guiamos a produção, utilizamos bancos de imagens licenciados ou criamos uma identidade visual do zero.",
      solution_en: "If you don't have a brand or texts ready, we guide the production, use licensed stock images, or create a visual identity from scratch."
    },
    {
      id: "etapas",
      icon: <CheckCircle2 className="w-6 h-6 text-white/70" />,
      title_pt: "Etapas do projeto",
      title_en: "Project stages",
      desc_pt: "O processo segue um fluxo linear: briefing inicial, organização dos materiais, aprovação da proposta, pagamento inicial, design (UI/UX), desenvolvimento frontend/backend, rodada de revisão, publicação (deploy) e entrega final.",
      desc_en: "The process follows a linear flow: initial briefing, organization of materials, proposal approval, initial payment, design (UI/UX), frontend/backend development, review round, publication (deploy), and final delivery.",
      solution_pt: "Você será notificado a cada avanço através da sua Área Privada e não precisa se preocupar com cronograma, nós gerenciamos tudo.",
      solution_en: "You will be notified at every step through your Private Area and don't need to worry about the schedule, we manage everything."
    },
    {
      id: "pagamentos",
      icon: <FileText className="w-6 h-6 text-white/70" />,
      title_pt: "Pagamentos",
      title_en: "Payments",
      desc_pt: "Aceitamos pagamentos via PIX, checkout seguro via Mercado Pago (cartão de crédito em até 12x) e faturamento direto. Todo o saldo, invoices e contratação de serviços adicionais são gerenciados na sua Área do Cliente.",
      desc_en: "We accept payments via PIX, secure checkout via Mercado Pago (credit card up to 12x), and direct billing. All balance, invoices, and additional services are managed in your Client Area.",
      solution_pt: "Emitimos Notas Fiscais para todas as transações, disponíveis para download imediatamente após a confirmação.",
      solution_en: "We issue Invoices for all transactions, available for download immediately after confirmation."
    },
    {
      id: "entregas",
      icon: <ChevronDown className="w-6 h-6 text-white/70" />,
      title_pt: "Entregas",
      title_en: "Deliverables",
      desc_pt: "No fim do projeto, você recebe: o projeto publicado em alta performance, arquivos fonte em formato ZIP, acesso aos repositórios no GitHub, documentação técnica da arquitetura e todos os acessos administrativos configurados.",
      desc_en: "At the end of the project, you receive: the high-performance published project, source files in ZIP format, access to GitHub repositories, technical architecture documentation, and all administrative accesses configured.",
      solution_pt: "Você é 100% dono de todo o código fonte e da propriedade intelectual gerada.",
      solution_en: "You own 100% of the source code and intellectual property generated."
    },
    {
      id: "suporte",
      icon: <Info className="w-6 h-6 text-white/70" />,
      title_pt: "Suporte e próximos passos",
      title_en: "Support and next steps",
      desc_pt: "Após a entrega, você terá um período de ajustes finos. Oferecemos também planos de manutenção contínua, infraestrutura, melhorias futuras e prioridade na contratação de novos serviços.",
      desc_en: "After delivery, you'll have a fine-tuning period. We also offer ongoing maintenance plans, infrastructure, future improvements, and priority in hiring new services.",
      solution_pt: "Nossa parceria não acaba no deploy. Mantemos uma infraestrutura ativa para escalar sua operação.",
      solution_en: "Our partnership doesn't end at deploy. We maintain an active infrastructure to scale your operation."
    }
  ];

  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      
      <main className="section-padding px-6 max-w-5xl mx-auto pt-32 pb-32">
        {/* Page Header */}
        <motion.div {...FADE_UP} className="mb-16">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-6">
            {lang === "pt" ? "Portal de Novos Clientes" : "New Clients Portal"}
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold tracking-tighter leading-[1.1] text-white mb-6 uppercase">
            {lang === "pt" ? "Processo de Desenvolvimento" : "Development Process"}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
            {lang === "pt" 
              ? "Para garantir a excelência e rapidez na entrega, aqui está um guia completo de como o seu projeto será conduzido, desde o briefing até a publicação final."
              : "To ensure excellence and speed in delivery, here is a complete guide on how your project will be conducted, from briefing to final publication."}
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
                  className="w-full text-left p-8 sm:p-10 flex items-center justify-between gap-6 outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-white">
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
