"use client";

import { ROUTES, navLabel } from "@/data/magnusData";
import { PRIVACY } from "@/data/pages";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/i18n";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { AlertIcon } from "../ui/Icons";
import { Enter } from "../ui/Reveal";
import { RevealText } from "../ui/RevealText";

/**
 * Politika privatnosti. Dok je `draft` u pages.ts, stranica nosi oznaku
 * nacrta; uklanja se kada Magnus potvrdi tekst.
 */
export function PrivacyPage() {
  const { t } = useLang();

  return (
    <article className="bg-paper-50 pb-[var(--space-3xl)] pt-24 sm:pt-28 lg:pt-32">
      <div className="container-page">
        <div className="mx-auto max-w-[44rem]">
          <Enter>
            <Breadcrumbs
              items={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(UI.common.privacy) }]}
            />
          </Enter>
          <Enter
            as="h1"
            delay={0.08}
            y={28}
            duration={0.9}
            className="font-display mt-6 text-[clamp(2.6rem,7vw,4.75rem)] text-coal-900"
          >
            {t(PRIVACY.title)}
          </Enter>

          <Enter delay={0.2} className="mt-8">
            <div
              role="note"
              className="flex gap-3 rounded-xl border border-kraft-500/40 bg-kraft-100 p-4 text-[0.95rem] leading-relaxed text-ink"
            >
              <AlertIcon className="mt-0.5 shrink-0 text-kraft-500" />
              <p>
                <strong className="font-semibold">{t(PRIVACY.draft.title)}.</strong> {t(PRIVACY.draft.body)}
              </p>
            </div>
          </Enter>

          <div className="mt-10 text-[1.04rem] leading-relaxed text-ink/90">
            {PRIVACY.sections.map((section) => (
              <section key={section.title.sr} className="mt-10 first:mt-0">
                <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.15rem)] leading-[1] text-coal-900">
                  <RevealText text={t(section.title)} />
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.sr.slice(0, 24)} className="mt-4">
                    {t(paragraph)}
                  </p>
                ))}
                {"list" in section && section.list ? (
                  <ul className="mt-4 grid list-disc gap-2 pl-6 marker:text-muted">
                    {section.list.map((item) => (
                      <li key={item.sr.slice(0, 24)}>{t(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
