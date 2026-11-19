"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { COMPANY } from "@/data/magnusData";
import { markIntroReady } from "@/lib/intro";
import { INTRO_SESSION_KEY } from "@/lib/introKey";
import { EASE_IN_OUT } from "./ui/motion";

type Phase = "counting" | "lifting" | "done";

const COUNT_SECONDS = 1.05;
const LIFT_SECONDS = 0.95;

/** null dok se ne proveri; zatim da li je uvod u ovoj poseti već prikazan */
let seenBefore: boolean | null = null;

/**
 * Uvodna zavesa: brojač do 100, pa se zavesa diže i predaje scenu početnom
 * ekranu, koji u tom trenutku počinje svoje otkrivanje.
 *
 * - Prikazuje se jednom po poseti (sessionStorage); skripta u <head> je pri
 *   ponovnom učitavanju sakrije pre prvog iscrtavanja.
 * - Uz `prefers-reduced-motion` se ne prikazuje.
 * - Ako JavaScript ne krene, CSS je sam sklanja posle nekoliko sekundi
 *   (vidi `.intro` u globals.css), pa sadržaj nikada ne ostaje zaklonjen.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("counting");
  const progress = useMotionValue(0);
  const label = useTransform(progress, (value) => String(Math.round(value)).padStart(3, "0"));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Odluka se donosi jednom po učitavanju stranice (efekat u razvoju ide dvaput).
    if (seenBefore === null) {
      seenBefore = false;
      try {
        seenBefore = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {
        // Bez pristupa skladištu uvod se prikazuje pri svakom učitavanju.
      }
    }

    if (reduceMotion || seenBefore) {
      markIntroReady();
      setPhase("done");
      return;
    }

    const controls = animate(progress, 100, {
      duration: COUNT_SECONDS,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setPhase("lifting");
        markIntroReady();
      },
    });
    return () => controls.stop();
  }, [progress]);

  if (phase === "done") return null;

  const lifting = phase === "lifting";

  return (
    <motion.div
      aria-hidden="true"
      className="intro grain"
      initial={false}
      animate={{ y: lifting ? "-100%" : "0%" }}
      transition={{ duration: LIFT_SECONDS, ease: EASE_IN_OUT }}
      onAnimationComplete={() => {
        if (lifting) setPhase("done");
      }}
    >
      <motion.span className="intro__bar" style={{ scaleX: barScale }} />

      <motion.div
        className="intro__inner"
        animate={{ y: lifting ? "18%" : "0%", opacity: lifting ? 0 : 1 }}
        transition={{ duration: LIFT_SECONDS * 0.8, ease: EASE_IN_OUT }}
      >
        <p className="label-caps flex items-center gap-3 text-kraft-300">
          <span className="h-px w-8 bg-current opacity-60" />
          {COMPANY.brand}
        </p>
        <div className="flex items-end justify-between gap-6">
          <motion.span className="font-display intro__count tabular-nums">{label}</motion.span>
          <span className="font-condensed pb-[0.6em] text-right text-[clamp(0.95rem,1.6vw,1.25rem)] font-semibold leading-tight text-mist">
            100% Pešter
            <br />
            −18 °C
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
