"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT, VIEWPORT } from "./motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Trajanje brojanja u sekundama */
  duration?: number;
  /** Odlaganje početka, da se uklopi sa otkrivanjem okolnog sadržaja */
  delay?: number;
  className?: string;
}

/**
 * Broji od nule do vrednosti kada element uđe u prikaz.
 * Čitači ekrana dobijaju konačnu vrednost; uz smanjeno kretanje nema brojanja.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.3,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, VIEWPORT);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = numberRef.current;
    if (!node || !inView) return;

    // Broj, prefiks i sufiks su jedan tekstualni čvor: dok broj raste menja se
    // samo širina teksta, ništa se ne pomera, pa brojanje ne utiče na CLS.
    const format = (current: number) => `${prefix}${Math.round(current)}${suffix}`;

    if (reduceMotion) {
      node.textContent = format(value);
      return;
    }

    node.textContent = format(0);
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => {
      controls.stop();
      node.textContent = format(value);
    };
  }, [inView, reduceMotion, value, prefix, suffix, duration, delay]);

  const finalText = `${prefix}${value}${suffix}`;

  return (
    <span ref={rootRef} className={className}>
      <span className="sr-only">{finalText}</span>
      <span ref={numberRef} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
    </span>
  );
}
