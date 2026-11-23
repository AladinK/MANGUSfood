"use client";

import Image from "next/image";
import Link from "next/link";
import { UI } from "@/data/dictionary";
import { GROUP, ROUTES, SECTION_MEDIA, media, navLabel } from "@/data/magnusData";
import { ABOUT } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { ProcessTimeline } from "../QualityAndProcessSection";
import { ExternalLink } from "../ui/ExternalLink";
import { CheckIcon, ExternalIcon } from "../ui/Icons";
import { PageHeader } from "../ui/PageHeader";
import { Photo } from "../ui/Photo";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";
import { buttonDark } from "../ui/styles";

const h2Large = "font-display text-[clamp(2.4rem,6vw,4.5rem)]";

export function AboutPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        crumbs={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(navLabel("o-nama")) }]}
        title={t(ABOUT.title)}
        intro={ABOUT.intro.map((paragraph) => t(paragraph))}
        image={{ src: media("mantijeTable"), alt: t(ABOUT.headerAlt), position: "object-[38%_50%]" }}
      />

      {/* Procesi i oznake kvaliteta */}
      <section aria-labelledby="procesi-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
        <RevealGroup className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="procesi-naslov" className={`${h2Large} text-coal-900`}>
              <RevealText text={t(ABOUT.processes.title)} />
            </h2>
            <div className="mt-6 grid max-w-[40rem] gap-4 text-[1.04rem] leading-relaxed text-muted">
              {ABOUT.processes.body.map((paragraph) => (
                <RevealItem as="p" key={paragraph.sr.slice(0, 24)}>
                  {t(paragraph)}
                </RevealItem>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <RevealItem className="flex min-h-[15rem] flex-col justify-between gap-8 rounded-2xl bg-kraft-300 p-6 text-coal-900 sm:p-8">
              <Image
                src={SECTION_MEDIA.qualityBadges}
                alt={t(UI.quality.badgesAlt)}
                width={256}
                height={54}
                unoptimized
                className="h-12 w-auto self-start sm:h-14"
              />
              <p className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)]">{t(UI.quality.closing)}</p>
            </RevealItem>
          </div>
        </RevealGroup>
      </section>

      {/* Proizvodnja: fotografije i faze */}
      <section
        aria-labelledby="proizvodnja-naslov"
        className="bg-coal-900 py-[var(--space-2xl)] text-paper-50"
      >
        <div className="container-page">
          <RevealGroup className="grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <RevealItem>
                <SectionLabel surface="dark">{t(ABOUT.production.label)}</SectionLabel>
              </RevealItem>
              <h2 id="proizvodnja-naslov" className="font-display mt-4 text-[clamp(2.75rem,7.5vw,5.75rem)]">
                <RevealText text={t(ABOUT.production.title)} />
              </h2>
            </div>
            <div className="grid max-w-[36rem] gap-4 text-[1.04rem] leading-relaxed text-mist lg:col-span-6 lg:pb-2">
              {ABOUT.production.body.map((paragraph) => (
                <RevealItem as="p" key={paragraph.sr.slice(0, 24)}>
                  {t(paragraph)}
                </RevealItem>
              ))}
            </div>
          </RevealGroup>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <Photo
              src={media("production")}
              alt={t(ABOUT.production.burgersAlt)}
              sizes="(min-width: 640px) 46vw, 92vw"
              reveal="view"
              parallax={8}
              className="aspect-[4/3] rounded-2xl bg-coal-800"
            />
            <Photo
              src={media("productionPies")}
              alt={t(ABOUT.production.piesAlt)}
              sizes="(min-width: 640px) 46vw, 92vw"
              reveal="view"
              revealDelay={0.12}
              parallax={8}
              className="aspect-[4/3] rounded-2xl bg-coal-800"
            />
          </div>

          <RevealGroup className="mt-[var(--space-xl)] flex flex-col gap-2 border-t border-paper-50/12 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <RevealItem as="p" className="font-display text-[clamp(1.9rem,4vw,2.75rem)]">
              {t(UI.quality.processTitle)}
            </RevealItem>
            <RevealItem as="p" className="text-mist lg:pb-1">
              {t(UI.quality.processIntro)}
            </RevealItem>
          </RevealGroup>
          <ProcessTimeline className="mt-10" />
        </div>
      </section>

      {/* Tehnologija i tradicija */}
      <section aria-labelledby="tradicija-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
        <div className="container-page">
          <RevealGroup>
            <RevealItem>
              <SectionLabel>{t(ABOUT.tradition.label)}</SectionLabel>
            </RevealItem>
          </RevealGroup>
          <h2 id="tradicija-naslov" className={`${h2Large} mt-4 max-w-[22ch] text-coal-900`}>
            <RevealText text={t(ABOUT.tradition.title)} />
          </h2>
          <RevealGroup as="ul" className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {ABOUT.tradition.items.map((item) => (
              <RevealItem as="li" key={item.title.sr} className="border-t border-paper-300 pt-6">
                <h3 className="font-display text-[1.6rem] text-coal-900">{t(item.title)}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-muted">{t(item.body)}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-[var(--space-xl)] grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Photo
                src={media("aboutPoster")}
                alt={t(ABOUT.tradition.posterAlt)}
                sizes="(min-width: 1024px) 26rem, 80vw"
                reveal="view"
                parallax={6}
                className="aspect-[585/750] max-w-[26rem] rounded-2xl bg-kraft-300"
              />
            </div>
            <RevealGroup className="lg:col-span-7">
              <RevealItem>
                <h3 className="font-condensed text-[1.25rem] font-semibold text-coal-900">
                  {t(ABOUT.tradition.strengthsLabel)}
                </h3>
              </RevealItem>
              <ul className="mt-5 border-t border-paper-300">
                {ABOUT.tradition.strengths.map((strength) => (
                  <RevealItem
                    as="li"
                    key={strength.sr}
                    className="flex items-start gap-4 border-b border-paper-300 py-4 text-[1.1rem] text-ink"
                  >
                    <CheckIcon width={20} height={20} strokeWidth={1.8} className="mt-0.5 shrink-0 text-leaf-600" />
                    {t(strength)}
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Konzistentnost */}
      <section aria-labelledby="konzistentnost-naslov" className="bg-paper-100 py-[var(--space-2xl)]">
        <div className="container-page">
          <RevealGroup className="grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <h2 id="konzistentnost-naslov" className={`${h2Large} text-coal-900`}>
                <RevealText text={t(ABOUT.consistency.title)} />
              </h2>
              <RevealItem
                as="p"
                className="font-condensed mt-4 text-[1.3rem] font-semibold leading-snug text-coal-700"
              >
                {t(ABOUT.consistency.lead)}
              </RevealItem>
            </div>
            <div className="grid max-w-[38rem] gap-4 text-[1.04rem] leading-relaxed text-muted lg:col-span-6 lg:pb-1">
              {ABOUT.consistency.body.map((paragraph) => (
                <RevealItem as="p" key={paragraph.sr.slice(0, 24)}>
                  {t(paragraph)}
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
          <div className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
            <Photo
              src={media("burgerEvening")}
              alt={t(ABOUT.consistency.photos.burger)}
              sizes="(min-width: 640px) 31vw, 92vw"
              reveal="view"
              parallax={8}
              className="aspect-[4/5] rounded-2xl bg-coal-800"
              imgClassName="object-[72%_50%]"
            />
            <Photo
              src={media("dough")}
              alt={t(ABOUT.consistency.photos.dough)}
              sizes="(min-width: 640px) 31vw, 92vw"
              reveal="view"
              revealDelay={0.1}
              parallax={8}
              className="aspect-[4/5] rounded-2xl bg-paper-200"
            />
            <Photo
              src={media("sceneCevapi")}
              alt={t(ABOUT.consistency.photos.cevapi)}
              sizes="(min-width: 640px) 31vw, 92vw"
              reveal="view"
              revealDelay={0.2}
              parallax={8}
              className="aspect-[4/5] rounded-2xl bg-coal-800"
            />
          </div>
        </div>
      </section>

      {/* Razvijeno za realne potrebe tržišta */}
      <section aria-labelledby="trziste-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Photo
              src={media("aboutPie")}
              alt={t(ABOUT.market.alt)}
              sizes="(min-width: 1024px) 36vw, 92vw"
              reveal="view"
              parallax={10}
              className="aspect-[585/525] rounded-2xl bg-coal-800"
            />
          </div>
          <RevealGroup className="lg:col-span-7">
            <h2 id="trziste-naslov" className={`${h2Large} text-coal-900`}>
              <RevealText text={t(ABOUT.market.title)} />
            </h2>
            <RevealItem
              as="p"
              className="font-condensed mt-4 text-[1.3rem] font-semibold leading-snug text-coal-700"
            >
              {t(ABOUT.market.lead)}
            </RevealItem>
            <div className="mt-5 grid max-w-[40rem] gap-4 text-[1.04rem] leading-relaxed text-muted">
              {ABOUT.market.body.map((paragraph) => (
                <RevealItem as="p" key={paragraph.sr.slice(0, 24)}>
                  {t(paragraph)}
                </RevealItem>
              ))}
            </div>
            <RevealItem className="mt-8">
              <Link href={ROUTES.products} className={`${buttonDark} px-7`}>
                {t(ABOUT.market.cta)}
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Grupacija */}
      <section
        aria-labelledby="grupacija-naslov"
        className="border-t border-paper-200 bg-paper-50 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
      >
        <RevealGroup className="container-page grid gap-x-14 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealItem>
              <SectionLabel>{t(GROUP.label)}</SectionLabel>
            </RevealItem>
            <h2 id="grupacija-naslov" className={`${h2Large} mt-4 text-coal-900`}>
              <RevealText text={GROUP.name} />
            </h2>
          </div>
          <div className="lg:col-span-7">
            <RevealItem as="p" className="max-w-[42rem] text-[1.06rem] leading-relaxed text-muted">
              {t(GROUP.body)}
            </RevealItem>
            <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
              <RevealItem as="li">
                <Image
                  src={GROUP.logo}
                  alt={GROUP.name}
                  width={286}
                  height={90}
                  unoptimized
                  className="h-12 w-auto"
                />
              </RevealItem>
              {GROUP.members.map((member) => (
                <RevealItem as="li" key={member.name}>
                  <ExternalLink
                    href={member.href}
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-coal-800 transition-colors hover:text-coal-950"
                  >
                    {member.logo ? (
                      <Image
                        src={member.logo}
                        alt={member.name}
                        width={196}
                        height={155}
                        unoptimized
                        className="h-16 w-auto"
                      />
                    ) : (
                      <>
                        {member.name}
                        <ExternalIcon width={15} height={15} className="opacity-60" />
                      </>
                    )}
                  </ExternalLink>
                </RevealItem>
              ))}
            </ul>
          </div>
        </RevealGroup>
      </section>
    </>
  );
}
