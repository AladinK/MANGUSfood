"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { UI } from "@/data/dictionary";
import { HERO_METRICS, SECTION_MEDIA } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ContourLines } from "./ui/ContourLines";
import { ArrowIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { buttonPrimary } from "./ui/styles";

/**
 * Jedini ulaz pri učitavanju: redovi naslova izlaze iz maske, ostatak se
 * kratko pojavi za njima. Ništa se ne ponavlja i ništa ne prati skrol.
 */
const rise = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE_OUT } },
});

const titleLine = (index: number): Variants => ({
  hidden: { y: "105%" },
  show: { y: 0, transition: { duration: 0.8, delay: 0.05 + index * 0.08, ease: EASE_OUT } },
});

export function HeroSection() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  // Uz smanjeno kretanje HTML sa servera već nosi krajnje stanje.
  const initial = reduceMotion ? "show" : "hidden";

  return (
    <section
      id="pocetak"
      className="relative isolate overflow-hidden bg-coal-900 text-paper-50 lg:flex lg:min-h-svh lg:flex-col"
    >
      {/* Izohipse Pešterske visoravni: tiha podloga, bez boje i bez kretanja */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[60%] -top-[4%] -z-10 h-[70%] w-[200%] text-paper-50/[0.06] sm:-right-[30%] sm:w-[130%] lg:-right-[12%] lg:h-[100%] lg:w-[80%]"
      >
        <ContourLines className="h-full w-full" />
      </div>

      <div className="container-page grid flex-1 items-center gap-x-12 gap-y-10 pb-12 pt-24 sm:pt-28 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-6">
          <motion.p
            initial={initial}
            animate="show"
            variants={rise(0)}
            className="text-[0.9375rem] font-medium text-mist"
          >
            {t(UI.hero.lead)}
          </motion.p>

          <h1 className="font-display mt-4 whitespace-nowrap text-[clamp(3.25rem,16.5vw,7rem)] lg:text-[clamp(5rem,8.6vw,9rem)]">
            {UI.hero.titleLines.map((line, index) => (
              <span key={index} className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                <motion.span
                  className="block"
                  initial={initial}
                  animate="show"
                  variants={titleLine(index)}
                >
                  {t(line)}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={initial}
            animate="show"
            variants={rise(0.2)}
            className="mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed text-mist"
          >
            {t(UI.hero.sub)}
          </motion.p>

          <motion.div
            initial={initial}
            animate="show"
            variants={rise(0.28)}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2"
          >
            <a href="#asortiman" className={buttonPrimary}>
              {t(UI.hero.ctaPrimary)}
            </a>
            <a
              href="#b2b"
              className="group inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-semibold text-paper-50 transition-colors duration-150 hover:text-paper-50/75"
            >
              {t(UI.hero.ctaSecondary)}
              <ArrowIcon
                width={16}
                height={16}
                className="text-mist transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Jedina bogata slika na ekranu: prava fotografija proizvoda */}
        <motion.figure
          initial={initial}
          animate="show"
          variants={rise(0.16)}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-2xl border border-paper-50/10 bg-coal-800">
            <Photo
              src={SECTION_MEDIA.hero}
              alt={t(UI.hero.photoAlt)}
              sizes="(min-width: 1024px) 46vw, 92vw"
              eager
              className="aspect-[4/3] w-full sm:aspect-[16/11] lg:aspect-[5/5.4]"
              imgClassName="object-[50%_62%]"
            >
              <ContourLines className="h-full w-full text-paper-50/10" />
            </Photo>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(to_top,rgb(18_18_17/0.88),rgb(18_18_17/0))] px-4 pb-4 pt-14 sm:px-6 sm:pb-5">
              <span>
                <span className="font-display block text-[1.375rem] sm:text-[1.75rem]">
                  {t(UI.hero.photoCaption)}
                </span>
                <span className="mt-1 block text-sm text-mist">{t(UI.hero.photoSub)}</span>
              </span>
              <span className="font-condensed shrink-0 pb-0.5 text-right text-sm leading-tight text-mist">
                <span className="block text-[1.0625rem] font-semibold tabular-nums text-paper-50">
                  −18 °C
                </span>
                {t(UI.hero.chipFrozen)}
              </span>
            </figcaption>
          </div>
        </motion.figure>
      </div>

      <div className="border-t border-paper-50/10 bg-coal-950/50">
        <dl
          aria-label={t(UI.hero.metricsLabel)}
          className="container-page grid grid-cols-2 lg:grid-cols-4"
        >
          {HERO_METRICS.map((metric, index) => (
            <div
              key={metric.id}
              className={`flex flex-col-reverse justify-end gap-1 border-paper-50/10 py-6 sm:py-7 ${
                index % 2 === 0 ? "pr-4" : "border-l pl-4"
              } ${index < 2 ? "border-b lg:border-b-0" : ""} ${
                index > 0 ? "lg:border-l lg:pl-8" : "lg:pl-0"
              } lg:pr-6`}
            >
              <dt className="max-w-[16rem] text-[0.875rem] leading-snug text-mist">{t(metric.label)}</dt>
              <dd className="font-display text-[clamp(2.25rem,8vw,3.75rem)] tabular-nums text-paper-50">
                <motion.span
                  className="block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    delay={0.1 + index * 0.05}
                  />
                </motion.span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
