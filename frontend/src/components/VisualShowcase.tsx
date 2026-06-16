import React from 'react';
import { motion } from 'motion/react';

export function VisualShowcase() {
  const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <section className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl border border-white/5"
          >
            <img src={img} alt="Visual inspiration" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}