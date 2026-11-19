"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { COMPANY } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { VIEWPORT, riseItem } from "./ui/motion";
import { SectionLabel } from "./ui/SectionLabel";

interface WordProps {
  word: string;
  /** Deo skrola (0–1) u kome ova reč prelazi iz blede u punu */
  range: [number, number];
  progress: MotionValue<number>;
}

function Word({ word, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/**
 * Izjava brenda odmah posle početnog ekrana: rečenica o kompaniji se
 * „upisuje“ reč po reč dok posetilac skroluje.
 *
 * Tekst je isti opis kompanije koji stoji u podnožju i JSON-LD podacima.
 * Čitači ekrana ga dobijaju ceo; uz smanjeno kretanje sve reči su odmah pune.
 */
export function ManifestSection() {
  const { t } = useLang();
  const textRef = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 88%", "end 52%"],
  });
  const progress = useTransform(scrollYProgress, (value) => (reduceMotion ? 1 : value));

  const text = t(COMPANY.summary);
  const words = text.split(" ");

  return (
    <section
      aria-label={COMPANY.brand}
      className="sheet-top bg-paper-50 pb-[var(--space-xl)] pt-[var(--space-2xl)]"
    >
      <div className="container-page grid gap-x-12 gap-y-6 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={riseItem}
          className="lg:col-span-3 lg:pt-3"
        >
          <SectionLabel>{t(COMPANY.tagline)}</SectionLabel>
        </motion.div>

        <div className="lg:col-span-9">
          <p className="sr-only">{text}</p>
          <p
            ref={textRef}
            aria-hidden="true"
            className="font-condensed text-[clamp(1.75rem,4.7vw,4.1rem)] font-bold leading-[1.06] tracking-[-0.015em] text-coal-900"
          >
            {words.map((word, index) => (
              <Word
                key={`${word}-${index}`}
                word={word}
                progress={progress}
                range={[index / words.length, Math.min(1, (index + 1.6) / words.length)]}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
