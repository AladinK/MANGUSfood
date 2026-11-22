"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { UI } from "@/data/dictionary";
import { HERO_METRICS, SECTION_MEDIA, getProduct, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ArrowIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT } from "./ui/motion";
import { buttonPrimary } from "./ui/styles";

/**
 * Početni ekran kao scena u tri sloja, „od Peštera do trpeze“:
 *
 *  1. pejzaž Pešterske visoravni preko celog ekrana — pri skrolu najsporiji,
 *  2. naslov i akcije — srednja brzina, polako se povlače,
 *  3. prava pakovanja (providne fotografije) — najbrža, dolaze ka posetiocu.
 *
 * Razlika u brzinama daje dubinu. Na računaru slojevi se blago pomeraju i za
 * mišem (bliži više). Sve je transform (bez promene rasporeda), a uz smanjeno
 * kretanje slojevi miruju i nema ulaza.
 */

const rise = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  },
});

const titleLine = (index: number): Variants => ({
  hidden: { y: "105%" },
  show: {
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + index * 0.09, ease: EASE_OUT },
  },
});

const packIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 70 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: EASE_OUT },
  },
});

interface PackProps {
  product: Product;
  y: MotionValue<string>;
  /** Pomak za mišem (px) */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  delay: number;
  initial: "hidden" | "show";
  className: string;
  sizes: string;
}

/** Jedno pakovanje u prvom planu: spoljni sloj prati skrol, unutrašnji radi ulaz */
function Pack({ product, y, pointerX, pointerY, delay, initial, className, sizes }: PackProps) {
  if (!product.imageSrc) return null;
  return (
    <motion.div style={{ y }} className={`absolute will-change-transform ${className}`}>
      <motion.div style={{ x: pointerX, y: pointerY }}>
        <motion.div initial={initial} animate="show" variants={packIn(delay)}>
          <Image
            src={product.imageSrc}
            alt=""
            width={1000}
            height={747}
            sizes={sizes}
            priority
            className="h-auto w-full drop-shadow-[0_28px_32px_rgb(10_10_9/0.6)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  // Uz smanjeno kretanje HTML sa servera već nosi krajnje stanje.
  const initial = reduceMotion ? "show" : "hidden";

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end start"],
  });
  const depth = reduceMotion ? 0 : 1;
  // Vrednosti se računaju funkcijom: tako ostaju u JavaScript-u i rade isto
  // u svakom pregledaču (bez ubrzanih vremenskih linija skrola).
  const shift = (amount: number) => (value: number) => `${value * amount * depth}%`;
  // Pejzaž zaostaje (ide naniže u odnosu na stranicu) i blago se približava.
  const landscapeY = useTransform(scrollYProgress, shift(32));
  const landscapeScale = useTransform(scrollYProgress, (value) => 1 + value * 0.1 * depth);
  // Tekst zaostaje manje od pejzaža i gasi se pre nego što scena ode.
  const copyY = useTransform(scrollYProgress, shift(22));
  const copyOpacity = useTransform(scrollYProgress, (value) =>
    reduceMotion ? 1 : Math.max(0, 1 - value / 0.65),
  );
  // Pakovanja idu naviše brže od stranice; zadnje sporije od prednjeg.
  const backPackY = useTransform(scrollYProgress, shift(-38));
  const frontPackY = useTransform(scrollYProgress, shift(-78));

  // Dubina za mišem: opruga bez odskoka (prigušena), bliži slojevi idu više.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });
  const landscapeShiftX = useTransform(smoothX, (value) => value * -14);
  const landscapeShiftY = useTransform(smoothY, (value) => value * -10);
  const backPackShiftX = useTransform(smoothX, (value) => value * 18);
  const backPackShiftY = useTransform(smoothY, (value) => value * 12);
  const frontPackShiftX = useTransform(smoothX, (value) => value * 34);
  const frontPackShiftY = useTransform(smoothY, (value) => value * 22);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const cevapi = getProduct("pazarski-cevapi");
  const burger = getProduct("premium-burger");

  return (
    <section id="pocetak" className="relative isolate overflow-hidden bg-coal-950 text-paper-50">
      <div
        ref={sceneRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex min-h-svh flex-col"
      >
        {/* 1. Pejzaž: spoljni sloj prati skrol, unutrašnji se pri učitavanju smiruje */}
        <motion.div
          aria-hidden="true"
          style={{ y: landscapeY, scale: landscapeScale }}
          className="absolute inset-0 -z-20 origin-top will-change-transform"
        >
          {/* Blago uvećan sloj, da pomak za mišem nikada ne otkrije ivicu */}
          <motion.div
            style={{ x: landscapeShiftX, y: landscapeShiftY }}
            className="absolute inset-0 scale-[1.04]"
          >
            <motion.div
              className="absolute inset-0"
              initial={reduceMotion ? false : { scale: 1.14, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: EASE_OUT }}
            >
              <Image
                src={SECTION_MEDIA.hero}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[34%_50%] lg:object-[50%_58%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Zatamnjenje za čitljivost: odozgo (meni), sa strane teksta i odozdo ka brojkama */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(18_18_17/0.82)_0%,rgb(18_18_17/0.62)_42%,rgb(18_18_17/0.25)_68%,rgb(18_18_17/0.9)_100%)] lg:bg-[linear-gradient(to_right,rgb(18_18_17/0.86)_0%,rgb(18_18_17/0.6)_38%,rgb(18_18_17/0.08)_70%),linear-gradient(to_top,rgb(18_18_17)_0%,rgb(18_18_17/0)_30%),linear-gradient(to_bottom,rgb(18_18_17/0.55)_0%,rgb(18_18_17/0)_22%)]"
        />

        {/* 2. Naslov i akcije */}
        <motion.div
          style={{ y: copyY }}
          className="container-page relative pt-24 sm:pt-32 lg:pt-[max(9rem,18svh)]"
        >
          <motion.div style={{ opacity: copyOpacity }} className="max-w-[40rem]">
            <motion.p
              initial={initial}
              animate="show"
              variants={rise(0.05)}
              className="text-[0.9375rem] font-medium text-paper-100/85"
            >
              {t(UI.hero.lead)}
            </motion.p>

            <h1 className="font-display mt-4 whitespace-nowrap text-[clamp(3.25rem,16.5vw,7rem)] lg:text-[clamp(5.5rem,9vw,9.5rem)]">
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
              variants={rise(0.35)}
              className="mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed text-paper-100/85"
            >
              {t(UI.hero.sub)}
            </motion.p>

            <motion.div
              initial={initial}
              animate="show"
              variants={rise(0.45)}
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
                  className="text-paper-100/70 transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 3. Pakovanja u prvom planu. Na telefonu su ispod teksta (u toku
            stranice), na širem ekranu u donjem desnom uglu scene. */}
        <div className="relative mt-auto pt-10 lg:absolute lg:inset-0 lg:mt-0 lg:pt-0">
          <div
            role="img"
            aria-label={t(UI.hero.packsLabel)}
            className="relative mx-auto aspect-[16/10] w-[min(100%,34rem)] lg:absolute lg:bottom-[7%] lg:right-[max(2rem,calc((100vw-80rem)/2+1rem))] lg:mx-0 lg:w-[min(44vw,44rem)]"
          >
            {cevapi ? (
              <Pack
                product={cevapi}
                y={backPackY}
                pointerX={backPackShiftX}
                pointerY={backPackShiftY}
                delay={0.55}
                initial={initial}
                sizes="(min-width: 1024px) 26vw, 58vw"
                className="left-[2%] top-[2%] w-[60%] -rotate-[5deg]"
              />
            ) : null}
            {burger ? (
              <Pack
                product={burger}
                y={frontPackY}
                pointerX={frontPackShiftX}
                pointerY={frontPackShiftY}
                delay={0.7}
                initial={initial}
                sizes="(min-width: 1024px) 28vw, 64vw"
                className="bottom-[-4%] right-[0%] w-[66%] rotate-[3deg]"
              />
            ) : null}
          </div>
        </div>

        {/* Natpis uz pakovanja: šta je na slici i potpis sa deklaracije */}
        <motion.div
          initial={initial}
          animate="show"
          variants={rise(0.9)}
          className="container-page relative hidden pb-10 pt-12 lg:mt-auto lg:block"
        >
          <p className="flex items-end gap-6 text-sm text-paper-100/75">
            <span>
              <span className="font-display block text-[1.5rem] text-paper-50">
                {t(UI.hero.photoCaption)}
              </span>
              {t(UI.hero.photoSub)}
            </span>
            <span className="font-condensed border-l border-paper-50/20 pl-6 leading-tight">
              <span className="block text-[1.0625rem] font-semibold tabular-nums text-paper-50">
                −18 °C
              </span>
              {t(UI.hero.chipFrozen)}
            </span>
          </p>
        </motion.div>
      </div>

      {/* Brojke */}
      <div className="relative z-10 border-t border-paper-50/10 bg-coal-950">
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
              <dt className="max-w-[16rem] text-[0.875rem] leading-snug text-mist">
                {t(metric.label)}
              </dt>
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
