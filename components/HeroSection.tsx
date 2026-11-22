"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UI } from "@/data/dictionary";
import { HERO_METRICS, ROUTES, SECTION_MEDIA, inquiryHref } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ContourLines } from "./ui/ContourLines";
import { riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { Seal } from "./ui/Seal";
import { buttonOutlineLight, buttonPrimary } from "./ui/styles";

/**
 * Prvi ekran: naslov i dve akcije levo, jedna fotografija proizvoda desno.
 * Pečat „100% Pešter“ je jedini ukras i stoji samo ovde. Sadržaj ulazi
 * jednom, pri učitavanju; posle toga ništa se ne pomera samo od sebe.
 */
export function HeroSection() {
  const { t } = useLang();

  return (
    <section id="pocetak" className="relative isolate bg-coal-900 text-paper-50">
      <div className="container-page grid items-center gap-x-12 gap-y-12 pb-16 pt-28 sm:pt-32 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12 lg:pb-20 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="lg:col-span-7"
        >
          <motion.h1
            variants={riseItem}
            className="font-display text-[clamp(3.5rem,14vw,9rem)] lg:text-[clamp(5rem,10.5vw,9rem)]"
          >
            {UI.hero.titleLines.map((line, index) => (
              <span key={index} className="block">
                {t(line)}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={riseItem}
            className="mt-8 max-w-[34rem] text-[1.06rem] leading-relaxed text-mist sm:text-lg"
          >
            {t(UI.hero.sub)}
          </motion.p>

          <motion.div variants={riseItem} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.products} className={`${buttonPrimary} px-7`}>
              {t(UI.hero.ctaPrimary)}
            </Link>
            <Link href={inquiryHref()} className={`${buttonOutlineLight} px-7`}>
              {t(UI.hero.ctaSecondary)}
            </Link>
          </motion.div>
        </motion.div>

        {/* Jedna fotografija: proizvodi na stolu, Pešter u pozadini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-none">
            <Photo
              src={SECTION_MEDIA.hero}
              alt={t(UI.hero.photoAlt)}
              sizes="(min-width: 1024px) 36vw, 90vw"
              eager
              className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-coal-800"
              imgClassName="object-[50%_58%]"
            >
              <ContourLines className="h-full w-full text-leaf-500/40" />
            </Photo>
            <div className="absolute -left-2 -top-5 w-24 text-kraft-300 sm:-left-8 sm:-top-8 sm:w-32">
              <Seal text={t(UI.hero.seal)} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tri činjenice sa ambalaže i iz proizvodnje */}
      <div className="border-t border-paper-50/10">
        <dl
          aria-label={t(UI.hero.metricsLabel)}
          className="container-page grid sm:grid-cols-3"
        >
          {HERO_METRICS.map((metric, index) => (
            <div
              key={metric.id}
              className={`flex flex-col-reverse justify-end gap-2 border-paper-50/10 py-6 sm:py-8 ${
                index > 0 ? "border-t sm:border-l sm:border-t-0 sm:pl-8" : ""
              } sm:pr-8`}
            >
              <dt className="max-w-[16rem] text-[0.94rem] leading-snug text-mist">
                {t(metric.label)}
              </dt>
              <dd className="font-display text-[clamp(2.25rem,5vw,3.5rem)] tabular-nums text-paper-50">
                {t(metric.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
