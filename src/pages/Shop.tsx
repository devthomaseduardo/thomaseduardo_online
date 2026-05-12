
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag,
  Zap,
  ArrowUpRight,
  X,
  ChevronRight,
  ChevronLeft,
  Truck,
  ArrowLeft
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SMOOTH_TRANSITION = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: SMOOTH_TRANSITION,
};

import STORE_PRODUCTS from "../data/store_products.json";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-6 selection:bg-brand-blue/30">
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
      `}} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          {...FADE_UP}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <Link to="/links" className="group flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors mb-6 text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-blue" />
              <h1 className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-blue">
                E-commerce
              </h1>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              Shop <span className="text-brand-blue">Seleção</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-8 border-l border-white/10 pl-8">
            <div className="text-left">
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Curadoria</p>
              <p className="text-xs font-black uppercase tracking-tight">Thomas Eduardo</p>
            </div>
            <div className="text-left">
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Status</p>
              <p className="text-xs text-green-500 font-black uppercase tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Loja Ativa
              </p>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {STORE_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: i * 0.05 }}
              onClick={() => {
                setSelectedProduct(product);
                setActiveImageIndex(0);
                setSelectedSize(product.sizes[0]);
              }}
              className="group cursor-pointer flex-shrink-0 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 relative overflow-hidden transition-all duration-700 hover:border-brand-blue/50 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)]"
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
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white text-[10px] font-black uppercase group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 group/btn shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Ver Detalhes
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Gallery Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0F0F0F] rounded-[48px] border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
                {/* Image Gallery Side */}
                <div className="w-full lg:w-3/5 bg-black/20 p-8 flex flex-col gap-6">
                  <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/5 shadow-inner bg-[#0A0A0A] relative group/main">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        src={selectedProduct.images[activeImageIndex]} 
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover" 
                        alt={`${selectedProduct.title}`}
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/600x750/0A0A0A/FFFFFF?text=${selectedProduct.title}`; }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/main:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                        className="h-12 w-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-brand-blue transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                        className="h-12 w-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-brand-blue transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border transition-all duration-300 ${activeImageIndex === idx ? 'border-brand-blue ring-2 ring-brand-blue/20' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-2/5 p-10 flex flex-col justify-between border-l border-white/5 bg-white/[0.01]">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase tracking-[0.2em] border border-brand-blue/20">
                        {selectedProduct.badge}
                      </span>
                      <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                        {selectedProduct.stock}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 leading-none">{selectedProduct.title}</h2>
                    
                    <div className="flex items-end gap-3 mb-8">
                      <span className="text-3xl font-black text-white">{selectedProduct.price}</span>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5">+ Frete</span>
                    </div>

                    <div className="space-y-4 mb-8">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Tamanhos</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-3 rounded-2xl text-[11px] font-black transition-all duration-300 border ${selectedSize === size ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {selectedProduct.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] text-gray-300 font-bold uppercase tracking-tight">
                          <Zap className="w-3.5 h-3.5 text-brand-blue" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 mb-10">
                      <div className="h-12 w-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                        <Truck className="w-6 h-6 text-brand-blue" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-tight">Envio Internacional 1.1</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Rastreio e Seguro Inclusos</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/5511977070209?text=Olá Thomas! Tenho interesse no ${selectedProduct.title} (${selectedSize}) do Shop Seleção.%0A%0AValor: ${selectedProduct.price}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-brand-blue text-white text-xs font-black uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-brand-blue/40"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Finalizar Pedido no WhatsApp
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

export default Shop;
