"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UI, fill } from "@/data/dictionary";
import {
  PROCESS_STEPS,
  QUALITY_PILLARS,
  SECTION_MEDIA,
  navLabel,
  type ProcessStep,
  type QualityIcon,
} from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ContourLines } from "./ui/ContourLines";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { ProductGlyph } from "./ui/ProductGlyph";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";

/* ------------------------------------------------------------------ */
/* Ikone stubova kvaliteta (jedna linija, jedna boja)                  */
/* ------------------------------------------------------------------ */

const ICON_PATHS: Record<QualityIcon, ReadonlyArray<string>> = {
  // Visoravan: greben i izohipse
  origin: [
    "M4 30c7-2 9-16 16-16s7 8 12 8 6-5 12-5",
    "M4 37c8-1 11-11 17-11s8 6 12 6 6-3 11-3",
    "M4 43c9 0 13-7 18-7s8 4 12 4 6-2 10-2",
    "M33 9.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0",
  ],
  // Kontrola: lupa i potvrda
  control: ["M8 21a13 13 0 1 0 26 0 13 13 0 1 0-26 0", "M30.5 30.5 42 42", "m15 21 4.5 4.5 8-9"],
  // Standardi: štit i potvrda
  standards: [
    "M24 5 8 11v11c0 10 6.5 17 16 21 9.5-4 16-11 16-21V11L24 5z",
    "m17 23 5 5 9.5-10",
  ],
  // Doslednost: tri jednaka oblika
  consistency: [
    "M5 17a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0",
    "M17.5 17a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0",
    "M30 17a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0",
    "M8 33h32M8 40h32",
  ],
};

function QualityGlyph({ icon }: { icon: QualityIcon }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 text-mist"
    >
      {ICON_PATHS[icon].map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Faze proizvodnje: mirna lista sa brojevima na jednoj šini           */
/* ------------------------------------------------------------------ */

function ProcessTimeline() {
  const { t } = useLang();
  const total = PROCESS_STEPS.length;

  return (
    <ol aria-label={t(UI.quality.processLabel)} className="relative mt-10 lg:mt-12 lg:grid lg:grid-cols-5">
      {/* Šina: uspravno na telefonu, vodoravno na širem ekranu */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-5 top-2 w-px -translate-x-1/2 bg-paper-50/15 lg:bottom-auto lg:left-0 lg:right-[20%] lg:top-5 lg:h-px lg:w-auto lg:translate-x-0"
      />
      {PROCESS_STEPS.map((step: ProcessStep, index) => (
        <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0 lg:block lg:pb-0 lg:pr-6">
          <span
            aria-hidden="true"
            className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper-50/20 bg-coal-900 text-[0.9375rem] font-semibold tabular-nums text-paper-50"
          >
            {index + 1}
          </span>
          <div className="pt-1.5 lg:pt-6">
            <h4 className="font-display text-[1.5rem] text-paper-50">
              <span className="sr-only">{fill(t(UI.quality.step), { n: index + 1, total })}: </span>
              {t(step.title)}
            </h4>
            <p className="mt-2 max-w-[30rem] text-[0.9375rem] leading-relaxed text-mist">{t(step.body)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */

export function QualityAndProcessSection() {
  const { t } = useLang();

  return (
    <section
      id="kvalitet"
      aria-labelledby="kvalitet-naslov"
      className="relative isolate overflow-hidden bg-coal-900 pb-[var(--space-2xl)] pt-[var(--space-2xl)] text-paper-50"
    >
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerParent}
          className="grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={riseItem}>
              <SectionLabel surface="dark">{t(navLabel("kvalitet"))}</SectionLabel>
            </motion.div>
            <h2
              id="kvalitet-naslov"
              className="font-display mt-4 text-[clamp(2.75rem,8vw,6.75rem)]"
            >
              <RevealText text={t(UI.quality.title)} />
            </h2>
          </div>
          <motion.p
            variants={riseItem}
            className="max-w-[34rem] text-[1.06rem] leading-relaxed text-mist lg:col-span-5 lg:pb-2"
          >
            {t(UI.quality.intro)}
          </motion.p>
        </motion.div>

        {/* Dve fotografije iz sveta brenda: krave na ispaši i mantije iz linije testa */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-12"
        >
          <Photo
            src={SECTION_MEDIA.sourcingA}
            alt={t(UI.quality.cowsAlt)}
            sizes="(min-width: 1024px) 40vw, 46vw"
            parallax={10}
            className="aspect-[3/4] rounded-2xl bg-coal-800 sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-[30rem]"
          >
            <ContourLines className="h-full w-full text-paper-50/10" />
          </Photo>
          <Photo
            src={SECTION_MEDIA.sourcingB}
            alt={t(UI.quality.mantijeAlt)}
            sizes="(min-width: 1024px) 56vw, 46vw"
            parallax={6}
            className="aspect-[3/4] rounded-2xl bg-coal-800 sm:aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:h-[30rem]"
          >
            <ProductGlyph
              kind="mantije"
              accent="#8f3b2e"
              plate="rgb(255 255 255 / 0.1)"
              className="h-full w-full p-[5%]"
            />
          </Photo>
        </motion.div>

        {/* Četiri stuba kvaliteta: lista sa tankim linijama umesto kutija */}
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {QUALITY_PILLARS.map((pillar) => (
            <li key={pillar.id} className="flex gap-4 border-t border-paper-50/10 py-6 lg:flex-col lg:gap-5">
              <QualityGlyph icon={pillar.icon} />
              <div>
                <h3 className="font-display text-[1.5rem]">{t(pillar.title)}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{t(pillar.body)}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Zvanične oznake sa ambalaže */}
        <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-kraft-300 p-6 text-coal-900 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="font-display text-[clamp(1.75rem,4vw,3rem)]">{t(UI.quality.closing)}</p>
          <Image
            src={SECTION_MEDIA.qualityBadges}
            alt={t(UI.quality.badgesAlt)}
            width={256}
            height={54}
            unoptimized
            className="h-12 w-auto shrink-0 self-start sm:h-14 sm:self-center"
          />
        </div>
      </div>

      {/* Pešter: fotografija visoravni od ivice do ivice ekrana */}
      <figure className="relative mt-[var(--space-xl)]">
        <Photo
          src={SECTION_MEDIA.pester}
          alt={t(UI.quality.pesterAlt)}
          sizes="100vw"
          parallax={14}
          className="h-[min(78svh,50rem)] min-h-[28rem] bg-coal-800"
        >
          <ContourLines className="h-full w-full text-paper-50/10" />
        </Photo>
        <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(18_18_17/0.96)_8%,rgb(18_18_17/0.62)_55%,transparent)] pb-[var(--space-xl)] pt-32">
          <div className="container-page">
            <p className="font-display max-w-[16ch] text-[clamp(2.6rem,9vw,8rem)]">
              <RevealText text={t(UI.quality.pesterTitle)} />
            </p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
              className="mt-4 max-w-[36rem] text-[1.02rem] leading-relaxed text-paper-100 sm:text-lg"
            >
              {t(UI.quality.pesterBody)}
            </motion.p>
          </div>
        </figcaption>
      </figure>

      <div className="container-page">
        <div className="mt-[var(--space-2xl)]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerParent}
            className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
          >
            <h3 className="font-display max-w-[34rem] text-[clamp(2rem,5vw,4rem)]">
              <RevealText text={t(UI.quality.processTitle)} />
            </h3>
            <motion.p variants={riseItem} className="text-mist lg:pb-2">
              {t(UI.quality.processIntro)}
            </motion.p>
          </motion.div>

          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
