"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UI } from "@/data/dictionary";
import { HERO_METRICS, LINKS, SECTION_MEDIA, getProduct, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ProductVisual } from "./ProductVisual";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ContourLines } from "./ui/ContourLines";
import { ExternalLink } from "./ui/ExternalLink";
import { ExternalIcon, GlobeIcon, InstagramIcon, SnowflakeIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { Seal } from "./ui/Seal";
import { buttonOutlineLight, buttonPrimary } from "./ui/styles";

// Fotografija prikazuje liniju mesa; ispred nje lebde dva pakovanja iz linije testa.
const FEATURED_IDS = ["pita-sa-sirom", "pazarske-mantije"] as const;

export function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Paralaksa: slojevi se pri skrolu pomeraju različitom brzinom.
  // Uz smanjeno kretanje svi pomaci su nula.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const depth = reduceMotion ? 0 : 1;
  const contourY = useTransform(scrollYProgress, [0, 1], [0, 140 * depth]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, 46 * depth]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -34 * depth]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -84 * depth]);

  const [second, third] = FEATURED_IDS.map((id) => getProduct(id)).filter(
    (product): product is Product => product !== undefined,
  );

  return (
    <section
      ref={sectionRef}
      id="pocetak"
      className="relative isolate overflow-hidden bg-coal-900 text-paper-50"
    >
      {/* Izohipse Pešterske visoravni */}
      <motion.div
        style={{ y: contourY }}
        className="pointer-events-none absolute -right-[45%] -top-[6%] -z-10 h-[105%] w-[170%] text-leaf-500/40 sm:-right-[30%] sm:w-[130%] lg:-right-[14%] lg:w-[84%]"
      >
        <ContourLines draw className="h-full w-full" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-coal-900)_18%,transparent_72%)]"
      />

      <div className="container-page grid items-center gap-x-8 gap-y-12 pb-14 pt-28 sm:pt-32 lg:grid-cols-12 lg:pb-20 lg:pt-36">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="font-condensed text-[1.05rem] font-semibold text-kraft-300"
          >
            {t(UI.hero.lead)}
          </motion.p>

          <h1 className="font-display mt-3 text-[clamp(3.6rem,15vw,9.5rem)] lg:text-[clamp(5rem,12vw,9.5rem)]">
            {UI.hero.titleLines.map((line, index) => (
              <span key={index} className="-mb-[0.06em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.12 + index * 0.13, ease: EASE_OUT }}
                >
                  {t(line)}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
            className="mt-6 max-w-[34rem] text-[1.06rem] leading-relaxed text-mist sm:text-lg"
          >
            {t(UI.hero.sub)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE_OUT }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#asortiman" className={`${buttonPrimary} px-7`}>
              {t(UI.hero.ctaPrimary)}
            </a>
            <a href="#b2b" className={`${buttonOutlineLight} px-7`}>
              {t(UI.hero.ctaSecondary)}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8"
          >
            <p className="text-sm text-mist">{t(UI.hero.channels)}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              <li>
                <ExternalLink
                  href={LINKS.site}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-paper-50/20 bg-paper-50/5 py-1.5 pl-3 pr-3.5 text-sm font-medium text-paper-50 transition-colors hover:border-paper-50/50 hover:bg-paper-50/10"
                >
                  <GlobeIcon width={17} height={17} />
                  {LINKS.siteLabel}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={LINKS.instagram}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-paper-50/20 bg-paper-50/5 py-1.5 pl-3 pr-3.5 text-sm font-medium text-paper-50 transition-colors hover:border-paper-50/50 hover:bg-paper-50/10"
                >
                  <InstagramIcon width={17} height={17} />
                  {LINKS.instagramHandle}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Scena sa proizvodima */}
        <div className="lg:col-span-5">
          <div
            role="group"
            aria-label={t(UI.hero.stageLabel)}
            className="relative mx-auto aspect-[10/11] w-full max-w-[27rem] lg:max-w-none"
          >
            {/* Originalna fotografija proizvoda */}
            <motion.div style={{ y: backY }} className="absolute inset-[3%_0_9%_13%]">
              <motion.a
                href="#asortiman"
                data-cursor={t(UI.cursor.products)}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
                className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-paper-50/12 shadow-lift"
              >
                <Photo
                  src={SECTION_MEDIA.hero}
                  alt={t(UI.hero.photoAlt)}
                  sizes="(min-width: 1024px) 36vw, 82vw"
                  eager
                  className="h-full w-full bg-coal-800"
                  imgClassName="object-[50%_62%] transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
                >
                  <ContourLines className="h-full w-full text-leaf-500/40" />
                </Photo>
                <span className="absolute inset-x-0 bottom-0 block bg-[linear-gradient(to_top,rgb(18_18_17/0.92)_35%,transparent)] pb-5 pl-[42%] pr-5 pt-16 text-right">
                  <span className="font-display block text-[clamp(1.25rem,5.2vw,1.75rem)] text-paper-50">
                    {t(UI.hero.photoCaption)}
                  </span>
                  <span className="mt-1 block text-[0.82rem] text-mist sm:text-sm">
                    {t(UI.hero.photoSub)}
                  </span>
                </span>
              </motion.a>
            </motion.div>

            {/* Ambalaža u prvom planu */}
            {second ? (
              <motion.div style={{ y: midY }} className="absolute bottom-[-2%] left-[-2%] w-[40%]">
                <motion.a
                  href="#asortiman"
                  data-cursor={t(UI.cursor.products)}
                  aria-label={t(second.name)}
                  initial={{ opacity: 0, y: 36, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
                  className="block"
                >
                  <span className="animate-float-a block">
                    <ProductVisual product={second} sizes="(min-width: 1024px) 16vw, 36vw" eager bare className="aspect-square" />
                  </span>
                </motion.a>
              </motion.div>
            ) : null}

            {third ? (
              <motion.div style={{ y: frontY }} className="absolute right-[-5%] top-[-4%] w-[34%]">
                <motion.a
                  href="#asortiman"
                  data-cursor={t(UI.cursor.products)}
                  aria-label={t(third.name)}
                  initial={{ opacity: 0, y: 36, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.62, ease: EASE_OUT }}
                  className="block"
                >
                  <span className="animate-float-b block">
                    <ProductVisual product={third} sizes="(min-width: 1024px) 15vw, 34vw" eager bare className="aspect-square" />
                  </span>
                </motion.a>
              </motion.div>
            ) : null}

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT }}
              className="absolute left-[3%] top-[-1%] w-[30%] max-w-[8.5rem] text-kraft-300 drop-shadow-[0_12px_18px_rgb(18_18_17/0.45)]"
            >
              <Seal text={t(UI.hero.seal)} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE_OUT }}
              className="absolute bottom-[3%] right-0 flex items-center gap-2 rounded-full bg-coal-950 py-2 pl-3 pr-4 text-sm font-semibold text-paper-50 shadow-lift ring-1 ring-paper-50/15"
            >
              <SnowflakeIcon width={18} height={18} className="text-leaf-300" />
              <span>
                −18 °C <span className="font-normal text-mist">{t(UI.hero.chipFrozen)}</span>
              </span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Brojke */}
      <div className="border-t border-paper-50/12 bg-coal-950/55">
        <dl
          aria-label={t(UI.hero.metricsLabel)}
          className="container-page grid grid-cols-2 lg:grid-cols-4"
        >
          {HERO_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: EASE_OUT }}
              className={`flex flex-col-reverse justify-end gap-1 border-paper-50/12 py-6 sm:py-7 ${
                index % 2 === 0 ? "pr-4" : "border-l pl-4"
              } ${index < 2 ? "border-b lg:border-b-0" : ""} ${
                index > 0 ? "lg:border-l lg:pl-7" : "lg:pl-0"
              } lg:pr-6`}
            >
              <dt className="max-w-[16rem] text-[0.9rem] leading-snug text-mist">{t(metric.label)}</dt>
              <dd className="font-display text-[clamp(2.6rem,9vw,4.25rem)] text-paper-50">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  delay={0.25 + index * 0.08}
                />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
