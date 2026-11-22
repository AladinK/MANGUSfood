"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { UI } from "@/data/dictionary";
import { COMPANY, GROUP, LINKS, NAV_ITEMS, ROUTES, inquiryHref } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { useCatalog } from "./SiteShell";
import { BrandMark } from "./ui/BrandMark";
import { ExternalLink } from "./ui/ExternalLink";
import {
  ClockIcon,
  ExternalIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./ui/Icons";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonOutlineLight, buttonPrimary } from "./ui/styles";

interface FooterProps {
  /** Blok sa kontakt podacima; na stranici Kontakt su isti podaci već na vrhu */
  showContact: boolean;
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    // U <dl> smeju samo dt i dd, pa ikona stoji u dt, a obe kolone poravnava uvlačenje.
    <div className="border-t border-paper-50/12 py-5">
      <dt className="relative pl-10 text-sm text-mist">
        <span aria-hidden="true" className="absolute left-0 top-0.5 text-kraft-300">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1 pl-10 text-[1.05rem] font-medium leading-snug text-paper-50">{children}</dd>
    </div>
  );
}

const footerLink = "text-paper-50/85 transition-colors hover:text-kraft-300";

export function Footer({ showContact }: FooterProps) {
  const { t } = useLang();
  const { openCatalog } = useCatalog();
  const year = new Date().getFullYear();
  const { address } = COMPANY;

  return (
    <footer className="bg-coal-950 text-paper-50">
      {/* Kontakt */}
      {showContact ? (
      <section id="kontakt" aria-labelledby="kontakt-naslov" className="border-b border-paper-50/10">
        <div className="container-page grid gap-x-14 gap-y-10 pb-[var(--space-2xl)] pt-[var(--space-3xl)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div>
              <SectionLabel surface="dark">{t(UI.sections.contact)}</SectionLabel>
              <h2 id="kontakt-naslov" className="font-display mt-4 text-[clamp(2.75rem,7.5vw,5.5rem)]">
                {t(UI.footer.contactLead)}
              </h2>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openCatalog}
                aria-haspopup="dialog"
                className={`${buttonPrimary} px-7`}
              >
                {t(UI.common.requestCatalog)}
              </button>
              <Link href={inquiryHref()} className={`${buttonOutlineLight} px-7`}>
                {t(UI.common.b2bInquiry)}
              </Link>
            </div>
          </div>

          <address className="not-italic lg:col-span-7">
            <dl className="grid gap-x-10 border-b border-paper-50/12 sm:grid-cols-2">
              <ContactRow icon={<PinIcon />} label={t(UI.footer.address)}>
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
              </ContactRow>
              <ContactRow icon={<PhoneIcon />} label={t(UI.footer.phone)}>
                <a href={COMPANY.phone.href} className="whitespace-nowrap hover:text-kraft-300">
                  {COMPANY.phone.display}
                </a>
              </ContactRow>
              <ContactRow icon={<MailIcon />} label={t(UI.footer.email)}>
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-kraft-300">
                  {COMPANY.email}
                </a>
              </ContactRow>
              <ContactRow icon={<ClockIcon />} label={t(UI.footer.hours)}>
                {t(COMPANY.hours)}
              </ContactRow>
            </dl>
          </address>
        </div>
      </section>
      ) : null}

      {/* Linkovi */}
      <div className="container-page grid gap-x-10 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label={t(UI.common.home)} className="block w-fit text-paper-50">
            <BrandMark surface="dark" size="lg" />
          </Link>
          <p className="font-condensed mt-4 text-[1.1rem] font-semibold text-kraft-300">
            {t(COMPANY.tagline)}
          </p>
          <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-mist">
            {t(COMPANY.summary)}
          </p>
          <p className="mt-5 text-[0.92rem] text-mist">
            {t(GROUP.label)}:{" "}
            {GROUP.members.map((member, index) => (
              <span key={member.name}>
                {index > 0 ? ", " : ""}
                <ExternalLink
                  href={member.href}
                  className="font-medium text-paper-50/90 underline decoration-paper-50/30 underline-offset-4 hover:text-kraft-300"
                >
                  {member.name}
                </ExternalLink>
              </span>
            ))}
          </p>
        </div>

        <nav aria-label={t(UI.footer.navTitle)} className="lg:col-span-2">
          <h2 className="font-condensed text-[1.05rem] font-semibold">{t(UI.footer.navTitle)}</h2>
          <ul className="mt-3 grid gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={`${footerLink} inline-flex min-h-9 items-center`}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-condensed text-[1.05rem] font-semibold">{t(UI.footer.channelsTitle)}</h2>
          <ul className="mt-3 grid gap-0.5">
            <li>
              <ExternalLink
                href={LINKS.instagram}
                className={`${footerLink} inline-flex min-h-9 items-center gap-2.5`}
              >
                <InstagramIcon width={18} height={18} />
                {LINKS.instagramHandle}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={LINKS.facebook}
                className={`${footerLink} inline-flex min-h-9 items-center gap-2.5`}
              >
                <FacebookIcon width={18} height={18} />
                {t(UI.common.facebook)}
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-condensed text-[1.05rem] font-semibold">{t(UI.footer.catalogTitle)}</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{t(UI.footer.catalogBody)}</p>
          <button
            type="button"
            onClick={openCatalog}
            aria-haspopup="dialog"
            className={`${buttonOutlineLight} mt-4`}
          >
            {t(UI.common.requestCatalog)}
          </button>
        </div>
      </div>

      <div className="border-t border-paper-50/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[0.88rem] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY.legalName}. {t(UI.footer.rights)}
          </p>
          <div className="flex flex-wrap gap-x-6">
            <Link href={ROUTES.privacy} className="inline-flex min-h-9 items-center hover:text-paper-50">
              {t(UI.footer.privacy)}
            </Link>
            <a href="#vrh" className="inline-flex min-h-9 items-center hover:text-paper-50">
              {t(UI.footer.backToTop)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
