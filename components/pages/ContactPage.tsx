"use client";

import type { ReactNode } from "react";
import { UI } from "@/data/dictionary";
import { COMPANY, LINKS, ROUTES, navLabel } from "@/data/magnusData";
import { CONTACT } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { B2BFunnelSection } from "../B2BFunnelSection";
import { FaqSection } from "../FaqSection";
import { ExternalLink } from "../ui/ExternalLink";
import { ExternalIcon } from "../ui/Icons";
import { PageHeader } from "../ui/PageHeader";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-paper-50/12 py-4">
      <dt className="text-sm text-mist">{label}</dt>
      <dd className="mt-1 text-[1.04rem] font-medium leading-snug text-paper-50">{children}</dd>
    </div>
  );
}

const inlineLink = "hover:text-kraft-300";

export function ContactPage() {
  const { t } = useLang();
  const { address } = COMPANY;

  const details = (
    <address id="kontakt-podaci" aria-label={t(CONTACT.detailsLabel)} className="not-italic">
      <dl className="grid gap-x-8 border-b border-paper-50/12 sm:grid-cols-2">
        <Row label={t(CONTACT.company)}>{COMPANY.legalName}</Row>
        <Row label={t(UI.footer.phone)}>
          <a href={COMPANY.phone.href} className={`whitespace-nowrap ${inlineLink}`}>
            {COMPANY.phone.display}
          </a>
        </Row>
        <Row label={t(UI.footer.email)}>
          <a href={`mailto:${COMPANY.email}`} className={`break-all ${inlineLink}`}>
            {COMPANY.email}
          </a>
        </Row>
        <Row label={t(UI.footer.hours)}>{t(COMPANY.hours)}</Row>
        <Row label={t(UI.footer.address)}>
          {address.street}
          <br />
          {address.postalCode} {address.city}, {t(address.country)}
          <br />
          <ExternalLink
            href={LINKS.maps}
            className="mt-1 inline-flex min-h-9 items-center gap-1 text-[0.92rem] font-semibold text-kraft-300 hover:text-kraft-100"
          >
            {t(UI.footer.map)}
            <ExternalIcon width={15} height={15} />
          </ExternalLink>
        </Row>
        <Row label={t(CONTACT.social)}>
          <span className="flex flex-col">
            <ExternalLink href={LINKS.instagram} className={`inline-flex min-h-9 items-center ${inlineLink}`}>
              Instagram
            </ExternalLink>
            <ExternalLink href={LINKS.facebook} className={`inline-flex min-h-9 items-center ${inlineLink}`}>
              Facebook
            </ExternalLink>
          </span>
        </Row>
      </dl>
    </address>
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(navLabel("kontakt")) }]}
        title={t(CONTACT.title)}
        intro={[t(CONTACT.intro)]}
        aside={details}
      />
      <B2BFunnelSection />
      <FaqSection />
    </>
  );
}
