import React, { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

const AnimatedCounter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => { 
        if (ref.current) ref.current.textContent = Math.round(v) + suffix; 
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export default AnimatedCounter;
