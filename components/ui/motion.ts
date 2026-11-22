import type { Variants } from "framer-motion";

/** power4.out — podrazumevana kriva; ista kao --ease-out-expo u globals.css */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Jedini ulaz na stranici: sadržaj prvog ekrana, jedan za drugim */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
