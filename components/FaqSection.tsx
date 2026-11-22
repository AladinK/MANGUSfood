"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { UI } from "@/data/dictionary";
import { COMPANY, FAQ_ITEMS, INQUIRY_ANCHOR, LINKS, inquiryHref } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ExternalLink } from "./ui/ExternalLink";
import { ExternalIcon, FacebookIcon, InstagramIcon, PlusIcon } from "./ui/Icons";
import { EASE_OUT } from "./ui/motion";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonDark } from "./ui/styles";

const LINKABLE = new RegExp(
  `(https?:\\/\\/\\S+[^\\s.,;]|[\\w.+-]+@[\\w-]+\\.[\\w.-]*\\w|${COMPANY.phone.display.replace(/[+ ]/g, "\\$&")})`,
  "g",
);

const linkClass =
  "break-words font-medium text-coal-700 underline decoration-leaf-300 underline-offset-4 hover:text-coal-900 hover:decoration-coal-700";

const displayUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return `${parsed.host.replace(/^www\./, "")}${parsed.pathname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
};

/**
 * Odgovori su običan tekst (isti tekst ide i u FAQPage JSON-LD).
 * Ovde se adrese sajta, email i telefon pretvaraju u linkove.
 */
function renderAnswer(text: string): ReactNode[] {
  return text.split(LINKABLE).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <ExternalLink key={index} href={part} className={linkClass}>
          {displayUrl(part)}
        </ExternalLink>
      );
    }
    if (part === COMPANY.email) {
      return (
        <a key={index} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      );
    }
    if (part === COMPANY.phone.display) {
      return (
        <a key={index} href={COMPANY.phone.href} className={`${linkClass} whitespace-nowrap`}>
          {part}
        </a>
      );
    }
    return part;
  });
}

export function FaqSection() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  // Na početnoj je forma za upit na istoj stranici
  const onHome = usePathname() === "/";
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-naslov"
      className="bg-paper-50 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
    >
      <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>{t(UI.sections.faq)}</SectionLabel>
            <h2
              id="faq-naslov"
              className="font-display mt-4 text-[clamp(2.6rem,7vw,4.75rem)] text-coal-900"
            >
              <RevealText text={t(UI.faq.title)} />
            </h2>
            <p className="mt-4 max-w-[26rem] leading-relaxed text-muted">
              {t(UI.faq.intro)}
            </p>
            <div>
              <Link href={onHome ? `#${INQUIRY_ANCHOR}` : inquiryHref()} className={`${buttonDark} mt-6`}>
                {t(UI.faq.contactCta)}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-paper-300 lg:col-span-8">
          {FAQ_ITEMS.map((item) => {
            const open = openId === item.id;
            const buttonId = `faq-pitanje-${item.id}`;
            const panelId = `faq-odgovor-${item.id}`;
            return (
              <div key={item.id} className="border-b border-paper-300">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={`font-condensed text-[1.2rem] font-semibold leading-snug transition-colors duration-200 sm:text-[1.32rem] ${
                        open ? "text-coal-700" : "text-ink group-hover:text-coal-700"
                      }`}
                    >
                      {t(item.question)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color] duration-300 ${
                        open
                          ? "border-coal-800 bg-coal-800 text-paper-50"
                          : "border-paper-300 text-coal-800 group-hover:border-coal-800"
                      }`}
                    >
                      <PlusIcon
                        className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                {/* Odgovor ostaje u HTML-u i kada je sklopljen, zbog pretraživača
                    i AI odgovora; `inert` ga tada sklanja od tastature i čitača. */}
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!open}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[44rem] pb-6 pr-4 sm:pr-14">
                    <p className="text-[1.02rem] leading-relaxed text-muted">
                      {renderAnswer(t(item.answer))}
                    </p>
                    {item.showChannels ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        <li>
                          <ExternalLink
                            href={LINKS.instagram}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-coal-800/20 bg-surface py-1.5 pl-3.5 pr-4 text-[0.9375rem] font-medium text-coal-800 transition-colors hover:border-coal-800/60"
                          >
                            <InstagramIcon width={18} height={18} />
                            {LINKS.instagramHandle}
                            <ExternalIcon width={15} height={15} className="opacity-60" />
                          </ExternalLink>
                        </li>
                        <li>
                          <ExternalLink
                            href={LINKS.facebook}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-coal-800/20 bg-surface py-1.5 pl-3.5 pr-4 text-[0.9375rem] font-medium text-coal-800 transition-colors hover:border-coal-800/60"
                          >
                            <FacebookIcon width={18} height={18} />
                            {t(UI.common.facebook)}
                            <ExternalIcon width={15} height={15} className="opacity-60" />
                          </ExternalLink>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
