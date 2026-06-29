import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag,
  ArrowUpRight,
  X,
  ChevronRight,
  ChevronLeft,
  Truck,
  ArrowLeft,
  Zap
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import STORE_PRODUCTS from "../data/store_products.json";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-pg-bg text-white py-20 px-6 selection:bg-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          {...FADE_UP}
          className="flex flex-col items-start mb-24"
        >
          <Link to="/links" className="group flex items-center gap-2 text-pg-muted hover:text-white transition-colors mb-12 text-[10px] font-mono uppercase tracking-[0.3em]">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </Link>
          
          <span className="text-[10px] font-mono text-pg-muted uppercase tracking-[0.5em] mb-4">
            Curadoria Técnica
          </span>
          <h1 className="text-[clamp(40px,8vw,90px)] font-medium tracking-tighter leading-none mb-8">
            Shop <span className="text-white/40">Seleção</span>
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl leading-relaxed">
            Equipamentos e ferramentas de alta performance selecionados para otimizar a operação de engenharia.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
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
              className="group cursor-pointer bg-pg-bg p-8 relative overflow-hidden transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="aspect-[4/5] w-full mb-8 overflow-hidden bg-black relative border border-white/5 rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/400x500/0A0A0A/FFFFFF?text=${product.title}`; }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium tracking-tight text-white mb-1">{product.title}</h4>
                    <span className="text-[10px] font-mono text-pg-muted uppercase tracking-widest">{product.stock}</span>
                  </div>
                  <span className="text-lg font-medium text-white/50">{product.price}</span>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Ver Detalhes</span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl bg-pg-bg border border-white/10 overflow-hidden shadow-2xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 h-10 w-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col lg:grid lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-hidden">
                {/* Image Gallery Side */}
                <div className="lg:col-span-7 bg-black/40 pt-20 pb-8 px-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="aspect-[4/5] overflow-hidden border border-white/5 bg-black relative mb-8 rounded-xl">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        src={selectedProduct.images[activeImageIndex]} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full object-cover" 
                        alt={selectedProduct.title}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between">
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                        className="h-10 w-10 bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                        className="h-10 w-10 bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto no-scrollbar">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-24 flex-shrink-0 border transition-all rounded-lg overflow-hidden ${activeImageIndex === idx ? 'border-white opacity-100' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-pg-muted uppercase tracking-[0.3em] mb-6 block">
                      {selectedProduct.badge || "Premium Selection"}
                    </span>
                    
                    <h2 className="text-4xl font-medium tracking-tighter mb-4">{selectedProduct.title}</h2>
                    <div className="text-2xl font-light text-white/40 mb-12">{selectedProduct.price}</div>

                    <div className="space-y-6 mb-12">
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-6 py-3 text-[10px] font-mono uppercase tracking-widest transition-all border rounded-lg ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-white/60 text-base font-light leading-relaxed mb-12">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4 mb-12">
                      {selectedProduct.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] text-pg-muted font-mono uppercase tracking-widest">
                          <Zap className="w-3.5 h-3.5" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/5511977070209?text=Olá Thomas! Tenho interesse no ${selectedProduct.title} (${selectedSize}) do Shop Seleção.`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/90 transition-all rounded-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Finalizar no WhatsApp
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
