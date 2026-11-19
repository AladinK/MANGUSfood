"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { UI } from "@/data/dictionary";
import { HERO_METRICS, LINKS, SECTION_MEDIA, getProduct, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { useIntroReady } from "@/lib/intro";
import { ProductVisual } from "./ProductVisual";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ContourLines } from "./ui/ContourLines";
import { ExternalLink } from "./ui/ExternalLink";
import { ExternalIcon, GlobeIcon, InstagramIcon, SnowflakeIcon } from "./ui/Icons";
import { Magnetic } from "./ui/Magnetic";
import { EASE_IN_OUT, EASE_OUT, VIEWPORT } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { Seal } from "./ui/Seal";
import { buttonOutlineLight, buttonPrimary } from "./ui/styles";

// Fotografija prikazuje liniju mesa; ispred nje lebde dva pakovanja iz linije testa.
const FEATURED_IDS = ["pita-sa-sirom", "pazarske-mantije"] as const;

/** Otkrivanje početnog ekrana: kreće kada uvodna zavesa počne da se diže */
const rise = (delay: number, y = 16): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE_OUT } },
});

const titleLine = (index: number): Variants => ({
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, delay: 0.08 + index * 0.12, ease: EASE_OUT } },
});

const pack = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 44, scale: 0.9, rotate: -6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.1, delay, ease: EASE_OUT },
  },
});

const channelLink =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-paper-50/20 bg-paper-50/5 py-1.5 pl-3 pr-3.5 text-sm font-medium text-paper-50 transition-colors duration-300 hover:border-paper-50/50 hover:bg-paper-50/10";

/** Tačka na kraju reda naslova dobija boju brenda */
function TitleText({ text }: { text: string }) {
  if (!text.endsWith(".")) return <>{text}</>;
  return (
    <>
      {text.slice(0, -1)}
      <span className="text-magnus-500">.</span>
    </>
  );
}

export function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const state = ready ? "show" : "hidden";

  // Paralaksa pri skrolu: slojevi se pomeraju različitom brzinom, a tekst
  // blago tone dok ga sledeća sekcija prekriva. Uz smanjeno kretanje sve miruje.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const depth = reduceMotion ? 0 : 1;
  const contourY = useTransform(scrollYProgress, [0, 1], [0, 160 * depth]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70 * depth]);
  const copyOpacity = useTransform(scrollYProgress, [0.1, 0.85], [1, reduceMotion ? 1 : 0.2]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, 52 * depth]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -40 * depth]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -96 * depth]);

  // Dubina na pomeraj miša: bliži slojevi se pomeraju više.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 18, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 18, mass: 0.6 });
  const photoX = useTransform(smoothX, (value) => value * 12);
  const photoShiftY = useTransform(smoothY, (value) => value * 10);
  const midX = useTransform(smoothX, (value) => value * -26);
  const midShiftY = useTransform(smoothY, (value) => value * -20);
  const frontX = useTransform(smoothX, (value) => value * 38);
  const frontShiftY = useTransform(smoothY, (value) => value * 28);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const [second, third] = FEATURED_IDS.map((id) => getProduct(id)).filter(
    (product): product is Product => product !== undefined,
  );

  return (
    <section
      ref={sectionRef}
      id="pocetak"
      onPointerMove={handlePointerMove}
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-coal-900 text-paper-50"
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
      {/* Topli odsjaj iza scene sa proizvodima */}
      <div
        aria-hidden="true"
        className="absolute -right-[20%] top-[8%] -z-10 aspect-square w-[70%] rounded-full bg-[radial-gradient(closest-side,oklch(0.754_0.214_133.3/0.13),transparent)] lg:w-[46%]"
      />

      <div className="container-page relative z-[2] grid flex-1 items-center gap-x-8 gap-y-12 pb-14 pt-28 sm:pt-32 lg:grid-cols-12 lg:pb-14 lg:pt-28">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial="hidden"
            animate={state}
            variants={rise(0, 10)}
            className="font-condensed flex items-center gap-3 text-[1.05rem] font-semibold text-kraft-300"
          >
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current opacity-60" />
            {t(UI.hero.lead)}
          </motion.p>

          {/* Svaki red naslova ostaje u jednom redu; na širokim ekranima sme da pređe u prostor scene */}
          <h1 className="font-display mt-4 whitespace-nowrap text-[clamp(3.4rem,19.5vw,9.5rem)] lg:text-[clamp(5rem,11.6vw,11rem)]">
            {UI.hero.titleLines.map((line, index) => (
              <span key={index} className="-my-[0.08em] block overflow-hidden py-[0.1em]">
                <motion.span
                  className="block will-change-transform"
                  initial="hidden"
                  animate={state}
                  variants={titleLine(index)}
                >
                  <TitleText text={t(line)} />
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate={state}
            variants={rise(0.42)}
            className="mt-7 max-w-[34rem] text-[1.06rem] leading-relaxed text-mist sm:text-lg"
          >
            {t(UI.hero.sub)}
          </motion.p>

          <motion.div
            initial="hidden"
            animate={state}
            variants={rise(0.54)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic className="max-sm:flex">
              <a href="#asortiman" className={`${buttonPrimary} px-8 max-sm:flex-1`}>
                {t(UI.hero.ctaPrimary)}
              </a>
            </Magnetic>
            <a href="#b2b" className={`${buttonOutlineLight} px-8`}>
              {t(UI.hero.ctaSecondary)}
            </a>
          </motion.div>

          <motion.div initial="hidden" animate={state} variants={rise(0.7, 0)} className="mt-9">
            <p className="text-sm text-mist">{t(UI.hero.channels)}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              <li>
                <ExternalLink href={LINKS.site} className={channelLink}>
                  <GlobeIcon width={17} height={17} />
                  {LINKS.siteLabel}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={LINKS.instagram} className={channelLink}>
                  <InstagramIcon width={17} height={17} />
                  {LINKS.instagramHandle}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Scena sa proizvodima */}
        <div className="lg:col-span-5">
          <div
            role="group"
            aria-label={t(UI.hero.stageLabel)}
            className="relative mx-auto aspect-[10/11] w-full max-w-[27rem] lg:max-w-none"
          >
            {/* Originalna fotografija proizvoda: okvir se podiže, slika izlazi iz maske */}
            <motion.div style={{ y: backY }} className="absolute inset-[3%_0_9%_13%]">
              <motion.div style={{ x: photoX, y: photoShiftY }} className="h-full">
                <motion.a
                  href="#asortiman"
                  data-cursor={t(UI.cursor.products)}
                  initial="hidden"
                  animate={state}
                  variants={rise(0.2, 48)}
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-paper-50/12 bg-coal-800 shadow-lift"
                >
                  <motion.span
                    className="absolute inset-0 block"
                    initial="hidden"
                    animate={state}
                    variants={{
                      hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                      show: {
                        clipPath: "inset(0% 0% 0% 0%)",
                        transition: reduceMotion
                          ? { duration: 0 }
                          : { duration: 1.25, delay: 0.3, ease: EASE_IN_OUT },
                      },
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 block"
                      initial="hidden"
                      animate={state}
                      variants={{
                        hidden: { scale: 1.28 },
                        show: { scale: 1, transition: { duration: 1.9, delay: 0.3, ease: EASE_OUT } },
                      }}
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
                    </motion.span>
                  </motion.span>
                  <motion.span
                    initial="hidden"
                    animate={state}
                    variants={rise(1.05, 12)}
                    className="absolute inset-x-0 bottom-0 block bg-[linear-gradient(to_top,rgb(18_18_17/0.92)_35%,transparent)] pb-5 pl-[42%] pr-5 pt-16 text-right"
                  >
                    <span className="font-display block text-[clamp(1.25rem,5.2vw,1.75rem)] text-paper-50">
                      {t(UI.hero.photoCaption)}
                    </span>
                    <span className="mt-1 block text-[0.82rem] text-mist sm:text-sm">
                      {t(UI.hero.photoSub)}
                    </span>
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Ambalaža u prvom planu */}
            {second ? (
              <motion.div style={{ y: midY }} className="absolute bottom-[-2%] left-[-2%] w-[40%]">
                <motion.div style={{ x: midX, y: midShiftY }}>
                  <motion.a
                    href="#asortiman"
                    data-cursor={t(UI.cursor.products)}
                    aria-label={t(second.name)}
                    initial="hidden"
                    animate={state}
                    variants={pack(0.75)}
                    className="block"
                  >
                    <span className="animate-float-a block">
                      <ProductVisual product={second} sizes="(min-width: 1024px) 16vw, 36vw" eager bare className="aspect-square" />
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            ) : null}

            {third ? (
              <motion.div style={{ y: frontY }} className="absolute right-[-5%] top-[-4%] w-[34%]">
                <motion.div style={{ x: frontX, y: frontShiftY }}>
                  <motion.a
                    href="#asortiman"
                    data-cursor={t(UI.cursor.products)}
                    aria-label={t(third.name)}
                    initial="hidden"
                    animate={state}
                    variants={pack(0.88)}
                    className="block"
                  >
                    <span className="animate-float-b block">
                      <ProductVisual product={third} sizes="(min-width: 1024px) 15vw, 34vw" eager bare className="aspect-square" />
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            ) : null}

            <motion.div
              initial="hidden"
              animate={state}
              variants={{
                hidden: { opacity: 0, scale: 0.5, rotate: -40 },
                show: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { duration: 1.1, delay: 1, ease: EASE_OUT },
                },
              }}
              className="absolute left-[3%] top-[-1%] w-[30%] max-w-[8.5rem] text-kraft-300 drop-shadow-[0_12px_18px_rgb(18_18_17/0.45)]"
            >
              <Seal text={t(UI.hero.seal)} />
            </motion.div>

            <motion.p
              initial="hidden"
              animate={state}
              variants={{
                hidden: { opacity: 0, x: 18 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 1.15, ease: EASE_OUT } },
              }}
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

      {/* Brojke. Donji dodatak je mesto na koje naleže sledeća sekcija. */}
      <div className="relative z-[2] border-t border-paper-50/12 bg-coal-950/55 pb-[var(--sheet-radius)]">
        <dl
          aria-label={t(UI.hero.metricsLabel)}
          className="container-page grid grid-cols-2 lg:grid-cols-4"
        >
          {HERO_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={ready ? { opacity: 1, y: 0 } : undefined}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: EASE_OUT }}
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
                  delay={0.35 + index * 0.08}
                  start={ready}
                />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
