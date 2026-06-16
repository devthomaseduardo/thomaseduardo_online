import React from 'react';
import { motion } from 'motion/react';

export function MotionExperience() {
  return (
    <section className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-60 grayscale brightness-50"
        >
          {/* Vídeo abstrato de tecnologia de alta qualidade */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-at-night-23023-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="w-24 h-[1px] bg-white/20 absolute top-1/2 left-10 md:left-24" />
        <div className="w-24 h-[1px] bg-white/20 absolute top-1/2 right-10 md:right-24" />
      </div>
    </section>
  );
}