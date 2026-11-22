"use client";

import Link from "next/link";
import { postHref } from "@/data/blog";
import { ROUTES, media, navLabel } from "@/data/magnusData";
import { PESTER } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "../ui/PageHeader";
import { Photo } from "../ui/Photo";
import { SectionLabel } from "../ui/SectionLabel";
import { buttonDark, buttonOutlineDark } from "../ui/styles";

const h2Large = "font-display text-[clamp(2.4rem,6vw,4.5rem)]";

export function PesterPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        crumbs={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(navLabel("pester")) }]}
        title={t(PESTER.title)}
        lead={t(PESTER.lead)}
        intro={[t(PESTER.sub)]}
        image={{ src: media("pesterSunset"), alt: t(PESTER.headerAlt), position: "object-[50%_62%]" }}
      />

      {/* Prirodni uslovi */}
      <section aria-labelledby="uslovi-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 id="uslovi-naslov" className={`${h2Large} text-coal-900`}>
              {t(PESTER.conditions.title)}
            </h2>
            <div className="mt-6 grid max-w-[38rem] gap-4 text-[1.04rem] leading-relaxed text-muted">
              {PESTER.conditions.body.map((paragraph) => (
                <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            <Photo
              src={media("pesterStream")}
              alt={t(PESTER.conditions.streamAlt)}
              sizes="(min-width: 1024px) 28vw, 46vw"
              className="aspect-[3/4] rounded-2xl bg-coal-800"
              imgClassName="object-[50%_70%]"
            />
            <Photo
              src={media("pesterPasture")}
              alt={t(PESTER.conditions.pastureAlt)}
              sizes="(min-width: 1024px) 28vw, 46vw"
              className="mt-10 aspect-[3/4] rounded-2xl bg-coal-800 sm:mt-16"
            />
          </div>
        </div>
      </section>

      {/* Klima, visina, ishrana */}
      <section
        aria-labelledby="klima-naslov"
        className="bg-coal-900 py-[var(--space-2xl)] text-paper-50"
      >
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionLabel surface="dark">{t(PESTER.climate.label)}</SectionLabel>
            <h2 id="klima-naslov" className={`${h2Large} mt-4`}>
              {t(PESTER.climate.title)}
            </h2>
            <div className="mt-6 grid max-w-[40rem] gap-4 text-[1.04rem] leading-relaxed text-mist">
              {PESTER.climate.body.map((paragraph) => (
                <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo
              src={media("pesterCows")}
              alt={t(PESTER.climate.alt)}
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="aspect-[4/5] rounded-2xl bg-coal-800"
            />
          </div>
        </div>
      </section>

      {/* Razlika je u osnovi */}
      <section aria-labelledby="osnova-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
        <div className="container-page">
          <h2 id="osnova-naslov" className={`${h2Large} text-coal-900`}>
            {t(PESTER.core.title)}
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {PESTER.core.items.map((item) => (
              <li key={item.title.sr} className="border-t border-paper-300 pt-6">
                <h3 className="font-display text-[1.6rem] text-coal-900">{t(item.title)}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-muted">{t(item.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Od izvora do proizvoda */}
      <section
        aria-labelledby="izvor-naslov"
        className="bg-paper-100 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
      >
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionLabel>{t(PESTER.source.label)}</SectionLabel>
            <h2 id="izvor-naslov" className={`${h2Large} mt-4 text-coal-900`}>
              {t(PESTER.source.title)}
            </h2>
            <p className="font-condensed mt-5 max-w-[40rem] text-[1.3rem] font-semibold leading-snug text-coal-700">
              {t(PESTER.source.lead)}
            </p>
            <div className="mt-5 grid max-w-[40rem] gap-4 text-[1.04rem] leading-relaxed text-muted">
              {PESTER.source.body.map((paragraph) => (
                <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={ROUTES.products} className={`${buttonDark} px-7`}>
                {t(PESTER.source.cta)}
              </Link>
              <Link href={postHref("poreklo-mesa-pester")} className={`${buttonOutlineDark} px-7`}>
                {t(PESTER.source.article)}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo
              src={media("sceneCevapi")}
              alt={t(PESTER.source.alt)}
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="aspect-square rounded-2xl bg-coal-800"
            />
          </div>
        </div>
      </section>
    </>
  );
}
