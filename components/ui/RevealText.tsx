"use client";

import { motion } from "framer-motion";
import { EASE_OUT, VIEWPORT_DEEP } from "./motion";

interface RevealTextProps {
  text: string;
  /** Kašnjenje pre prve reči, u sekundama */
  delay?: number;
  /** Razmak između reči, u sekundama */
  stagger?: number;
  className?: string;
}

/**
 * Naslov koji izlazi iz maske, reč po reč, kada uđe u prikaz.
 *
 * Deli se po rečima (ne po redovima), pa prelom teksta ostaje prirodan na
 * svakoj širini. Čitači ekrana dobijaju ceo tekst odjednom; animirane reči su
 * za njih sakrivene. Uz smanjeno kretanje reči se prikažu odmah (MotionConfig
 * gasi pomeranje). Namenjeno kratkim naslovima (do desetak reči).
 */
export function RevealText({ text, delay = 0, stagger = 0.055, className = "" }: RevealTextProps) {
  const words = text.split(" ").filter(Boolean);

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_DEEP}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            {/* Maska ima dodatak gore i dole da ne odseče kvačice (Č, Š, Ž) ni repove slova */}
            <span className="-my-[0.16em] inline-block overflow-hidden py-[0.16em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "118%" },
                  show: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </>
  );
}
