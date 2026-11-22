"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { UI } from "@/data/dictionary";
import { COMPANY, GROUP, LINKS, NAV_ITEMS, navLabel } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { BrandMark } from "./ui/BrandMark";
import { ExternalLink } from "./ui/ExternalLink";
import {
  ArrowIcon,
  ClockIcon,
  ExternalIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./ui/Icons";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonOutlineLight, buttonPrimary } from "./ui/styles";

interface FooterProps {
  onRequestCatalog: () => void;
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
    <div className="flex gap-4 border-t border-paper-50/12 py-5">
      <span className="mt-0.5 text-mist">{icon}</span>
      <div>
        <dt className="text-sm text-mist">{label}</dt>
        <dd className="mt-1 text-[1.05rem] font-medium leading-snug text-paper-50">{children}</dd>
      </div>
    </div>
  );
}

const footerLink = "text-paper-50/85 transition-colors duration-150 hover:text-paper-50";

export function Footer({ onRequestCatalog }: FooterProps) {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const { address } = COMPANY;

  return (
    <footer className="bg-coal-950 text-paper-50">
      <div>
      {/* Kontakt */}
      <section id="kontakt" aria-labelledby="kontakt-naslov" className="border-b border-paper-50/10">
        <div className="container-page grid gap-x-14 gap-y-10 pb-[var(--space-xl)] pt-[var(--space-2xl)] lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerParent}
            className="lg:col-span-5"
          >
            <motion.div variants={riseItem}>
              <SectionLabel surface="dark">{t(navLabel("kontakt"))}</SectionLabel>
            </motion.div>
            <h2 id="kontakt-naslov" className="font-display mt-4 text-[clamp(2.75rem,8vw,6.25rem)]">
              <RevealText text={t(UI.footer.contactLead)} />
            </h2>
            <motion.div variants={riseItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onRequestCatalog}
                aria-haspopup="dialog"
                className={buttonPrimary}
              >
                {t(UI.common.requestCatalog)}
              </button>
              <a href="#b2b-forma" className={buttonOutlineLight}>
                {t(UI.common.b2bInquiry)}
              </a>
            </motion.div>
          </motion.div>

          <motion.address
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="not-italic lg:col-span-7"
          >
            <dl className="grid gap-x-10 border-b border-paper-50/12 sm:grid-cols-2">
              <ContactRow icon={<PinIcon />} label={t(UI.footer.address)}>
                {address.street}
                <br />
                {address.postalCode} {address.city}, {t(address.country)}
                <br />
                <ExternalLink
                  href={LINKS.maps}
                  className="mt-1 inline-flex min-h-9 items-center gap-1 text-[0.9375rem] font-medium text-paper-50 underline decoration-paper-50/30 underline-offset-4 hover:decoration-paper-50 max-lg:min-h-11"
                >
                  {t(UI.footer.map)}
                  <ExternalIcon width={15} height={15} />
                </ExternalLink>
              </ContactRow>
              <ContactRow icon={<PhoneIcon />} label={t(UI.footer.phone)}>
                <a href={COMPANY.phone.href} className="whitespace-nowrap hover:text-paper-50/75">
                  {COMPANY.phone.display}
                </a>
              </ContactRow>
              <ContactRow icon={<MailIcon />} label={t(UI.footer.email)}>
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-paper-50/75">
                  {COMPANY.email}
                </a>
              </ContactRow>
              <ContactRow icon={<ClockIcon />} label={t(UI.footer.hours)}>
                {t(COMPANY.hours)}
              </ContactRow>
            </dl>
          </motion.address>
        </div>
      </section>

      {/* Linkovi */}
      <div className="container-page grid gap-x-10 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a href="#pocetak" aria-label={t(UI.common.home)} className="block w-fit text-paper-50">
            <BrandMark surface="dark" size="lg" />
          </a>
          <p className="font-condensed mt-4 text-[1.1rem] font-semibold text-paper-50">
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
                  className="font-medium text-paper-50/90 underline decoration-paper-50/30 underline-offset-4 hover:decoration-paper-50"
                >
                  {member.name}
                </ExternalLink>
              </span>
            ))}
          </p>
        </div>

        <nav aria-label={t(UI.footer.navTitle)} className="lg:col-span-2">
          <h2 className="text-[0.9375rem] font-semibold text-paper-50">{t(UI.footer.navTitle)}</h2>
          <ul className="mt-3 grid gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={`${footerLink} inline-flex min-h-9 items-center max-lg:min-h-11`}>
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-[0.9375rem] font-semibold text-paper-50">{t(UI.footer.channelsTitle)}</h2>
          <ul className="mt-3 grid gap-0.5">
            <li>
              <ExternalLink
                href={LINKS.site}
                className={`${footerLink} inline-flex min-h-9 items-center max-lg:min-h-11 gap-2.5`}
              >
                <GlobeIcon width={18} height={18} />
                {LINKS.siteLabel}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={LINKS.instagram}
                className={`${footerLink} inline-flex min-h-9 items-center max-lg:min-h-11 gap-2.5`}
              >
                <InstagramIcon width={18} height={18} />
                {LINKS.instagramHandle}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={LINKS.facebook}
                className={`${footerLink} inline-flex min-h-9 items-center max-lg:min-h-11 gap-2.5`}
              >
                <FacebookIcon width={18} height={18} />
                {t(UI.common.facebook)}
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.9375rem] font-semibold text-paper-50">{t(UI.footer.catalogTitle)}</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{t(UI.footer.catalogBody)}</p>
          <button
            type="button"
            onClick={onRequestCatalog}
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
          <a
            href="#pocetak"
            className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-paper-50"
          >
            {t(UI.footer.backToTop)}
            <ArrowIcon
              width={16}
              height={16}
              className="-rotate-90 transition-transform duration-150 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      </div>
    </footer>
  );
}
