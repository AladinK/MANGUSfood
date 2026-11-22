"use client";

import Image from "next/image";
import Link from "next/link";
import { UI, fill } from "@/data/dictionary";
import {
  PROCESS_STEPS,
  QUALITY_PILLARS,
  ROUTES,
  SECTION_MEDIA,
  type QualityIcon,
} from "@/data/magnusData";
import { HOME } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { ContourLines } from "./ui/ContourLines";
import { Photo } from "./ui/Photo";
import { ProductGlyph } from "./ui/ProductGlyph";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonOutlineLight } from "./ui/styles";

/* ------------------------------------------------------------------ */
/* Ikone stubova kvaliteta                                             */
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
      width="36"
      height="36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-mist"
    >
      {ICON_PATHS[icon].map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Faze proizvodnje: redosled je stvaran, pa su faze numerisane        */
/* ------------------------------------------------------------------ */

export function ProcessTimeline({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const total = PROCESS_STEPS.length;

  return (
    <ol aria-label={t(UI.quality.processLabel)} className={`relative lg:grid lg:grid-cols-5 ${className}`}>
      {/* Šina: uspravno na telefonu, vodoravno na širem ekranu */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[1.375rem] top-2 w-px -translate-x-1/2 bg-paper-50/15 lg:bottom-auto lg:left-0 lg:right-[20%] lg:top-[1.375rem] lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
      />
      {PROCESS_STEPS.map((step, index) => (
        <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0 lg:block lg:pb-0 lg:pr-6">
          <span
            aria-hidden="true"
            className="font-display relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper-50/25 bg-coal-900 text-[1.25rem] tabular-nums text-paper-50"
          >
            {index + 1}
          </span>
          <div className="pt-1.5 lg:pt-6">
            <h3 className="font-display text-[1.55rem] text-paper-50">
              <span className="sr-only">{fill(t(UI.quality.step), { n: index + 1, total })}: </span>
              {t(step.title)}
            </h3>
            <p className="mt-2 max-w-[30rem] text-[0.97rem] leading-relaxed text-mist">{t(step.body)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */

const tile = "border-t border-paper-50/12";

/**
 * Početna: „Kvalitet počinje pre proizvodnje“ sa stranice magnusfood.rs,
 * fotografije i četiri stuba kvaliteta u jednoj mreži, i link ka O nama.
 */
export function QualitySection() {
  const { t } = useLang();

  return (
    <section
      id="kvalitet"
      aria-labelledby="kvalitet-naslov"
      className="relative isolate overflow-hidden bg-coal-900 pb-[var(--space-2xl)] pt-[var(--space-3xl)] text-paper-50"
    >
      <div className="container-page">
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel surface="dark">{t(HOME.quality.label)}</SectionLabel>
            <h2
              id="kvalitet-naslov"
              className="font-display mt-4 text-[clamp(2.75rem,7.5vw,5.75rem)]"
            >
              {t(HOME.quality.title)}
            </h2>
          </div>
          <div className="grid max-w-[34rem] gap-4 text-[1.06rem] leading-relaxed text-mist lg:col-span-5 lg:pb-2">
            {HOME.quality.body.map((paragraph) => (
              <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
            ))}
          </div>
        </div>

        {/* Bento: fotografije i četiri stuba kvaliteta u jednoj mreži */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          <li className="relative col-span-2 min-h-[17rem] overflow-hidden rounded-2xl lg:row-span-2">
            <div className="absolute inset-0">
              <Photo
                src={SECTION_MEDIA.sourcingA}
                alt={t(UI.quality.cowsAlt)}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="h-full w-full bg-coal-800"
              >
                <ContourLines className="h-full w-full text-leaf-500/55" />
              </Photo>
            </div>
          </li>

          {QUALITY_PILLARS.map((pillar, index) => (
            <li
              key={pillar.id}
              className={`${tile} col-span-2 pb-4 pt-6 sm:col-span-1 sm:pr-4 lg:pb-0`}
            >
              <QualityGlyph icon={pillar.icon} />
              <h3 className="font-display mt-5 text-[1.6rem]">{t(pillar.title)}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{t(pillar.body)}</p>
            </li>
          ))}

          <li className="relative col-span-2 min-h-[15.5rem] overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <Photo
                src={SECTION_MEDIA.sourcingB}
                alt={t(UI.quality.mantijeAlt)}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="h-full w-full bg-coal-800"
              >
                <ProductGlyph
                  kind="mantije"
                  accent="#8f3b2e"
                  plate="rgb(255 255 255 / 0.1)"
                  className="h-full w-full p-[5%]"
                />
              </Photo>
            </div>
          </li>

          <li className="col-span-2 flex min-h-[13rem] flex-col justify-between rounded-2xl bg-kraft-300 p-6 text-coal-900 sm:p-8">
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
          </li>
        </ul>

        <div className="mt-10">
          <Link href={ROUTES.about} className={`${buttonOutlineLight} px-7`}>
            {t(HOME.quality.cta)}
          </Link>
        </div>
      </div>
    </section>
  );
}
