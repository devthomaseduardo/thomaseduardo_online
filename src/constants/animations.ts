export const CUBIC_BEZIER = [0.4, 0, 0.2, 1];

export const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: CUBIC_BEZIER,
};

export const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: CUBIC_BEZIER }
  },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: CUBIC_BEZIER } },
};

export const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: CUBIC_BEZIER } },
};

export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const FADE_UP = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: FADE_UP_VARIANT,
};
