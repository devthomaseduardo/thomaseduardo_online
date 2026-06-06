import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeviceMockupProps {
  desktopImg: string;
  mobileImg?: string;
  tabletImg?: string;
  altText?: string;
  iframeUrl?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ResponsiveIframeProps {
  src: string;
  title: string;
  targetWidth: number;
  targetHeight: number;
}

function ResponsiveIframe({ src, title, targetWidth, targetHeight }: ResponsiveIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / targetWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [targetWidth]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-zinc-900">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute top-0 left-0 origin-top-left border-none"
        style={{
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}

export function DeviceMockup({ desktopImg, mobileImg, tabletImg, altText = "Project Mockup", iframeUrl }: DeviceMockupProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-6">
      {/* Device Selector */}
      <div className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
        <button
          onClick={() => setDevice('desktop')}
          className={`p-2 rounded-full transition-all duration-300 ${
            device === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
          title="Desktop View"
        >
          <Monitor className="w-4 h-4" />
        </button>
        {(tabletImg || iframeUrl) && (
          <button
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-full transition-all duration-300 ${
              device === 'tablet' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
        )}
        {(mobileImg || iframeUrl) && (
          <button
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-full transition-all duration-300 ${
              device === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mockup Display */}
      <div className="relative flex justify-center items-center w-full min-h-[300px] lg:min-h-[400px]">
        <AnimatePresence mode="wait">
          {device === 'desktop' && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-5xl px-4 md:px-8 flex flex-col items-center"
            >
              {/* MacBook Screen Bezel */}
              <div className="relative w-full aspect-video bg-black rounded-t-xl rounded-b-sm border-[4px] md:border-[10px] border-[#1a1a1a] flex flex-col overflow-hidden shadow-2xl">
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-28 h-3 md:h-5 bg-[#1a1a1a] rounded-b-xl z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-blue-400" />
                  </div>
                </div>

                <div className="flex-1 relative overflow-hidden bg-zinc-900">
                  {iframeUrl ? (
                    <ResponsiveIframe src={iframeUrl} title={altText} targetWidth={1280} targetHeight={720} />
                  ) : (
                    <img src={desktopImg} className="w-full h-full object-cover object-top" alt={`${altText} Desktop`} />
                  )}
                </div>
              </div>

              {/* MacBook Base */}
              <div className="relative w-[105%] h-3 md:h-5 bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] rounded-t-sm rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-center mt-[-1px] z-10 border border-white/5 border-t-0">
                {/* Thumb Groove */}
                <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[#2c2c2e] rounded-b-lg shadow-inner" />
              </div>
            </motion.div>
          )}

          {device === 'tablet' && (
            <motion.div
              key="tablet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-[500px] px-4"
            >
              {/* iPad Pro frame */}
              <div className="relative w-full aspect-[3/4] md:aspect-[4/3] border-[12px] md:border-[16px] border-black bg-black rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Camera */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-900/30 ring-1 ring-white/5 z-30 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-blue-400" />
                </div>
                
                <div className="w-full h-full relative overflow-hidden bg-zinc-900 rounded-[1.25rem] md:rounded-[1.5rem]">
                  {iframeUrl ? (
                    <ResponsiveIframe src={iframeUrl} title={altText} targetWidth={810} targetHeight={1080} />
                  ) : (
                    <img src={tabletImg || desktopImg} className="w-full h-full object-cover object-top" alt={`${altText} Tablet`} />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {device === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-[300px] px-4"
            >
              {/* iPhone frame */}
              <div className="relative w-full aspect-[9/19.5] border-[10px] md:border-[12px] border-black bg-black rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-3 inset-x-0 h-6 bg-transparent z-30 flex justify-center">
                  <div className="w-20 md:w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 ring-1 ring-white/5">
                    <div className="w-2 h-2 rounded-full bg-blue-900/30 flex items-center justify-center">
                       <div className="w-1 h-1 rounded-full bg-blue-400/50" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-full relative overflow-hidden bg-zinc-900 rounded-[1.75rem] md:rounded-[2.25rem]">
                  {iframeUrl ? (
                    <ResponsiveIframe src={iframeUrl} title={altText} targetWidth={390} targetHeight={844} />
                  ) : (
                    <img src={mobileImg || desktopImg} className="w-full h-full object-cover object-top" alt={`${altText} Mobile`} />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
