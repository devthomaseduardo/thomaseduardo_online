import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';

export const FAQSection = () => {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  
  const faqs = lang === "pt" ? [
    { q: "Qual o prazo médio de entrega?", a: "Depende da complexidade, mas uma Landing Page de alta performance costuma levar de 7 a 15 dias, enquanto um SaaS completo pode levar de 30 a 90 dias." },
    { q: "Você faz integração com qualquer gateway?", a: "Sim, tenho vasta experiência com Mercado Pago, Stripe e gateways nacionais como Infinity Pay, garantindo checkout transparente." },
    { q: "O software é entregue pronto para escalar?", a: "Sim, utilizo tecnologias modernas como Next.js e Cloud (AWS/Vercel) para garantir que seu sistema suporte picos de tráfego sem lentidão." },
    { q: "Como funciona o suporte pós-entrega?", a: "Ofereço pacotes de manutenção mensal que garantem segurança, atualizações e suporte prioritário para o seu ativo digital." }
  ] : [
    { q: "What is the average delivery time?", a: "It depends on complexity, but a high-performance Landing Page usually takes 7 to 15 days, while a full SaaS can take 30 to 90 days." },
    { q: "Do you integrate with any gateway?", a: "Yes, I have extensive experience with Mercado Pago, Stripe, and national gateways like Infinity Pay, ensuring transparent checkout." },
    { q: "Is the software delivered ready to scale?", a: "Yes, I use modern technologies like Next.js and Cloud (AWS/Vercel) to ensure your system handles traffic peaks without slowdowns." },
    { q: "How does post-delivery support work?", a: "I offer monthly maintenance packages that guarantee security, updates, and priority support for your digital asset." }
  ];

  return (
    <section className="relative py-10 px-6 md:px-12 max-w-full mx-auto bg-(--pg-bg)">
      <motion.div {...FADE_UP} className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] py-2 text-white">
          <TextReveal>{t.faq.h2a}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{t.faq.h2b}</TextReveal></span>
        </h2>
      </motion.div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            className="border-b border-white/5 overflow-hidden"
          >
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">{faq.q}</span>
              <ChevronRight className={`w-5 h-5 transition-transform ${open === i ? 'rotate-90' : ''}`} style={{ color: '#6E6E73' }} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="pb-6 leading-relaxed" style={{ color: '#A1A1A6' }}>{faq.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
