"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./motion";

/**
 * Pokreti unutrašnjih stranica, istim jezikom kao početna: grupa se pojavi
 * jednom kada uđe u prikaz, a njeni delovi ulaze jedan za drugim
 * (`staggerParent` i `riseItem` iz motion.ts).
 */

const TAGS = {
  div: motion.div,
  ul: motion.ul,
  dl: motion.dl,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  article: motion.article,
  header: motion.header,
} as const;

type Tag = keyof typeof TAGS;

interface RevealProps {
  as?: Tag;
  className?: string;
  children: ReactNode;
  id?: string;
}

/** Grupa: deca (`RevealItem`) ulaze jedno za drugim kada grupa uđe u prikaz */
export function RevealGroup({ as = "div", className, children, id }: RevealProps) {
  const Element = TAGS[as] as typeof motion.div;
  return (
    <Element
      id={id}
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Element>
  );
}

/** Deo grupe: blago podizanje i pojačavanje (`riseItem`) */
export function RevealItem({ as = "div", className, children, id }: RevealProps) {
  const Element = TAGS[as] as typeof motion.div;
  return (
    <Element id={id} className={className} variants={riseItem}>
      {children}
    </Element>
  );
}

/** Jedan element koji se sam pojavi kada uđe u prikaz (pasus u dugom tekstu) */
export function Reveal({ as = "div", className, children, id, delay = 0 }: RevealProps & { delay?: number }) {
  const Element = TAGS[as] as typeof motion.div;
  return (
    <Element
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      {children}
    </Element>
  );
}

/**
 * Ulaz pri učitavanju, za vrh stranice koji je odmah u prikazu. Isti
 * `rise` kao na prvom ekranu početne: providnost i pomak naviše. Radi kao
 * CSS animacija (klasa `enter` u globals.css), pa kreće čim se HTML
 * iscrta, bez čekanja na JavaScript; uz smanjeno kretanje je isključena.
 */
export function Enter({
  as = "div",
  className = "",
  children,
  id,
  delay = 0,
  y = 14,
  duration = 0.7,
}: RevealProps & { delay?: number; y?: number; duration?: number }) {
  const Element = as as ElementType;
  const timing = {
    "--enter-delay": `${delay}s`,
    "--enter-y": `${y}px`,
    "--enter-dur": `${duration}s`,
  } as CSSProperties;
  return (
    <Element id={id} className={`enter ${className}`} style={timing}>
      {children}
    </Element>
  );
}
