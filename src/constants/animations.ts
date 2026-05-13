export const CUBIC_BEZIER = [0.25, 1, 0.5, 1]; // Fast ease out

export const SMOOTH_TRANSITION = {
  duration: 0.4,
  ease: CUBIC_BEZIER,
};

export const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: CUBIC_BEZIER }
  },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: CUBIC_BEZIER } },
};

export const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: CUBIC_BEZIER } },
};

export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const FADE_UP = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-40px" },
  variants: FADE_UP_VARIANT,
};
