import React from "react";
import { motion } from "motion/react";
import { CUBIC_BEZIER } from "../constants/animations";

const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(" ");
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
      }}
      className="inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-[0.1em] px-[0.15em] -mx-[0.15em]">
          <motion.span
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0, transition: { duration: 0.8, ease: CUBIC_BEZIER } }
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
