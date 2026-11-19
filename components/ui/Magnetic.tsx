"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** Koliko element prati kursor (0–1). Manje od 0.4, da ne napusti polje za klik. */
  strength?: number;
  className?: string;
}

/**
 * Magnetni omotač: element blago prati kursor dok je miš iznad njega i vraća
 * se oprugom. Samo za miš; na dodir i uz smanjeno kretanje miruje.
 * Koristiti štedljivo: jedan do dva ključna poziva po ekranu.
 */
export function Magnetic({ children, strength = 0.28, className = "" }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </motion.span>
  );
}
