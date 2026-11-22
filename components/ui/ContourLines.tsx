"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CONTOURS } from "./contours";

interface ContourLinesProps {
  className?: string;
  /** Crtanje linija pri prvom prikazu (koristi se samo u hero sekciji) */
  draw?: boolean;
}

export function ContourLines({ className, draw = false }: ContourLinesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1000 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {CONTOURS.map((d, index) => {
        const delay = 0.15 + index * 0.09;
        return (
          <motion.path
            key={index}
            d={d}
            stroke="currentColor"
            strokeWidth={index % 4 === 3 ? 1.6 : 1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            // `initial` je isti na serveru i u pregledaču; uz smanjeno kretanje
            // linije se prikazuju odmah, bez crtanja.
            initial={draw ? { pathLength: 0, opacity: 0 } : false}
            animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    pathLength: { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, delay },
                  }
            }
          />
        );
      })}
    </svg>
  );
}
