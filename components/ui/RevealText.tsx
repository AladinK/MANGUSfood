"use client";

import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT_DEEP } from "./motion";

interface RevealTextProps {
  text: string;
  /** Kašnjenje pre pojave, u sekundama */
  delay?: number;
  className?: string;
}

/**
 * Naslov sekcije koji se jednom, kratko pojavi kada uđe u prikaz:
 * blago podizanje i pojačavanje, bez razbijanja na reči. Tekst ostaje jedan
 * čvor, pa ga čitači ekrana čitaju normalno. Uz smanjeno kretanje
 * (MotionConfig) naslov je odmah na mestu.
 */
export function RevealText({ text, delay = 0, className = "" }: RevealTextProps) {
  return (
    <motion.span
      className={`block ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEEP}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {text}
    </motion.span>
  );
}
