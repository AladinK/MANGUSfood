"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
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
/* Ikone koje se iscrtavaju kada uđu u prikaz                          */
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
  const reduceMotion = useReducedMotion();
  return (
    <svg
      viewBox="0 0 48 48"
      width="52"
      height="52"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-kraft-300"
    >
      {ICON_PATHS[icon].map((d, index) => (
        <motion.path
          key={index}
          d={d}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: {
              pathLength: 1,
              opacity: 1,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.9, delay: 0.15 + index * 0.14, ease: EASE_OUT },
            },
          }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Faze proizvodnje: linija se popunjava dok skrolujete                */
/* ------------------------------------------------------------------ */

interface StepItemProps {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StepItem({ step, index, total, progress }: StepItemProps) {
  const { t } = useLang();
  // Faza se „pali“ kada linija stigne do njenog čvora.
  const threshold = (index / (total - 1)) * 0.94;
  const start = Math.max(0, threshold - 0.07);
  const end = Math.max(0.01, threshold);

  const nodeBackground = useTransform(progress, [start, end], ["#2a2a27", "#74ca00"]);
  const nodeColor = useTransform(progress, [start, end], ["#bdb9ac", "#1d1d1b"]);
  const textOpacity = useTransform(progress, [start, end], [0.55, 1]);

  return (
    <li className="relative flex gap-5 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
      <motion.span
        aria-hidden="true"
        style={{ backgroundColor: nodeBackground, color: nodeColor }}
        className="font-display relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper-50/25 text-[1.25rem]"
      >
        {index + 1}
      </motion.span>
      <motion.div style={{ opacity: textOpacity }} className="pt-1.5 lg:pt-6">
        <h4 className="font-display text-[1.55rem] text-paper-50">
          <span className="sr-only">
            {fill(t(UI.quality.step), { n: index + 1, total })}:{" "}
          </span>
          {t(step.title)}
        </h4>
        <p className="mt-2 max-w-[30rem] text-[0.97rem] leading-relaxed text-mist">{t(step.body)}</p>
      </motion.div>
    </li>
  );
}

function ProcessTimeline() {
  const { t } = useLang();
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 82%", "end 58%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  // Uz smanjeno kretanje linija je odmah puna i sve faze su istaknute.
  const progress = useTransform(smooth, (value) => (reduceMotion ? 1 : value));

  return (
    <ol
      ref={listRef}
      aria-label={t(UI.quality.processLabel)}
      className="relative mt-12 lg:grid lg:grid-cols-5"
    >
      {/* Šina i popuna: uspravno na telefonu, vodoravno na širem ekranu */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[1.375rem] top-2 w-px -translate-x-1/2 bg-paper-50/15 lg:bottom-auto lg:left-0 lg:right-[20%] lg:top-[1.375rem] lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="absolute bottom-6 left-[1.375rem] top-2 w-0.5 origin-top -translate-x-1/2 bg-kraft-300 lg:hidden"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute left-0 right-[20%] top-[1.375rem] hidden h-0.5 origin-left -translate-y-1/2 bg-kraft-300 lg:block"
      />
      {PROCESS_STEPS.map((step, index) => (
        <StepItem
          key={step.id}
          step={step}
          index={index}
          total={PROCESS_STEPS.length}
          progress={progress}
        />
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */

const tile =
  "rounded-3xl border border-paper-50/8 bg-coal-800/55 transition-[border-color,background-color] duration-500 hover:border-kraft-300/35 hover:bg-coal-800/85";

export function QualityAndProcessSection() {
  const { t } = useLang();

  return (
    <section
      id="kvalitet"
      aria-labelledby="kvalitet-naslov"
      className="grain relative isolate overflow-hidden bg-coal-900 pb-[calc(var(--space-2xl)+var(--sheet-radius))] pt-[var(--space-3xl)] text-paper-50"
    >
      <ContourLines className="pointer-events-none absolute -left-[55%] top-[2%] -z-10 h-[46%] w-[150%] text-leaf-500/20 lg:-left-[28%] lg:w-[80%]" />

      <div className="container-page relative z-[2]">
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

        {/* Bento: fotografije i četiri stuba kvaliteta u jednoj mreži */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:auto-rows-[minmax(15.5rem,auto)]">
          <motion.li
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="relative col-span-2 min-h-[17rem] overflow-hidden rounded-3xl lg:row-span-2"
          >
            <div className="absolute inset-0">
              <Photo
                src={SECTION_MEDIA.sourcingA}
                alt={t(UI.quality.cowsAlt)}
                sizes="(min-width: 1024px) 48vw, 92vw"
                reveal
                parallax={7}
                className="h-full w-full bg-coal-800"
                imgClassName="transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.04]"
              >
                <ContourLines className="h-full w-full text-leaf-500/55" />
              </Photo>
            </div>
          </motion.li>

          {QUALITY_PILLARS.map((pillar, index) => (
            <motion.li
              key={pillar.id}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.06 + (index % 2) * 0.07, ease: EASE_OUT },
                },
              }}
              className={`${tile} col-span-2 flex flex-col p-5 sm:col-span-1 sm:p-6`}
            >
              <QualityGlyph icon={pillar.icon} />
              <h3 className="font-display mt-auto pt-6 text-[1.6rem]">{t(pillar.title)}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{t(pillar.body)}</p>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="relative col-span-2 min-h-[15.5rem] overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0">
              <Photo
                src={SECTION_MEDIA.sourcingB}
                alt={t(UI.quality.mantijeAlt)}
                sizes="(min-width: 1024px) 48vw, 92vw"
                reveal
                parallax={7}
                className="h-full w-full bg-coal-800"
                imgClassName="transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.04]"
              >
                <ProductGlyph
                  kind="mantije"
                  accent="#8f3b2e"
                  plate="rgb(255 255 255 / 0.1)"
                  className="h-full w-full p-[5%]"
                />
              </Photo>
            </div>
          </motion.li>

          <motion.li
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
            className="col-span-2 flex min-h-[13rem] flex-col justify-between rounded-3xl bg-kraft-300 p-6 text-coal-900 sm:p-8"
          >
            {/* Zvanične oznake sa ambalaže */}
            <Image
              src={SECTION_MEDIA.qualityBadges}
              alt={t(UI.quality.badgesAlt)}
              width={256}
              height={54}
              unoptimized
              className="h-12 w-auto self-start sm:h-14"
            />
            <p className="font-display text-[clamp(2rem,4.4vw,3.4rem)]">{t(UI.quality.closing)}</p>
          </motion.li>
        </ul>

      </div>

      {/* Pešter: fotografija visoravni od ivice do ivice ekrana. Slika se pri
          skrolu pomera sporije od stranice, pa prizor dobija dubinu. */}
      <figure className="relative z-[2] mt-[var(--space-xl)]">
        <Photo
          src={SECTION_MEDIA.pester}
          alt={t(UI.quality.pesterAlt)}
          sizes="100vw"
          reveal
          parallax={9}
          className="h-[min(86svh,54rem)] min-h-[26rem] bg-coal-800"
        >
          <ContourLines className="h-full w-full text-leaf-500/55" />
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

      <div className="container-page relative z-[2]">
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
