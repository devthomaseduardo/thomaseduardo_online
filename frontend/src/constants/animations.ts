export const CUBIC_BEZIER = [0.16, 1, 0.3, 1] as const;

export const SMOOTH_TRANSITION = {
  duration: 0.25,
  ease: CUBIC_BEZIER,
};

export const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 6 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: CUBIC_BEZIER }
  },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: CUBIC_BEZIER } },
};

export const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: CUBIC_BEZIER } },
};

export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

export const FADE_UP = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: false, margin: "0px" },
  variants: FADE_UP_VARIANT,
};

export const HERO_FADE_UP = {
  initial: "hidden",
  animate: "visible",
  variants: FADE_UP_VARIANT,
};
