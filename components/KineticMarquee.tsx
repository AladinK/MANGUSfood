"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import type { Localized } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { SnowflakeIcon } from "./ui/Icons";

interface KineticMarqueeProps {
  items: ReadonlyArray<Localized>;
  /** Osnovna brzina, u procentima širine trake u sekundi */
  baseVelocity?: number;
}

const COPIES = [0, 1, 2, 3];

/**
 * Traka sa sloganima brenda, od ivice do ivice ekrana. Teče sama, a skrol
 * joj daje brzinu i smer: brže skrolovanje, brža traka; skrol naviše je vraća.
 * Uz smanjeno kretanje traka miruje. Ukrasna je: slogani postoje i u tekstu
 * stranice, pa je čitači ekrana preskaču.
 */
export function KineticMarquee({ items, baseVelocity = 1.6 }: KineticMarqueeProps) {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "200px 0px" });

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [5, -5]);

  // Sadržaj je ponovljen četiri puta; pomeraj se vrti u okviru jedne kopije (25%).
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inView) return;

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;

    const step = baseVelocity * (Math.min(delta, 64) / 1000);
    baseX.set(baseX.get() + direction.current * step * (1 + Math.abs(factor)));
  });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="overflow-hidden bg-kraft-300 py-[clamp(1.1rem,2.6vw,2.2rem)] text-coal-900"
    >
      <motion.div
        style={{ x, skewX: reduceMotion ? 0 : skewX }}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {COPIES.map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item.sr} className="flex items-center">
                <span className="font-display px-[0.35em] text-[clamp(3rem,10.5vw,9.5rem)] uppercase">
                  {t(item)}
                </span>
                <SnowflakeIcon
                  strokeWidth={1.4}
                  className="h-[clamp(1.6rem,5vw,4.5rem)] w-[clamp(1.6rem,5vw,4.5rem)] shrink-0 text-magnus-600"
                />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
