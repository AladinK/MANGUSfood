import type { Variants } from "framer-motion";

/** Otkrivanje pri skrolu: jednom, čim deo elementa uđe u prikaz */
export const VIEWPORT = { once: true, amount: "some" } as const;

/** Otkrivanje tek kada je element stvarno ušao u prikaz (naslovi, slike) */
export const VIEWPORT_DEEP = { once: true, margin: "0px 0px -12% 0px" } as const;

/** power4.out — podrazumevana kriva; ista kao --ease-out-expo u globals.css */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** power4.inOut — dramatični prelazi (zavesa, otkrivanje slika) */
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Roditelj koji decu otkriva jedno za drugim */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const fadeItem: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};
