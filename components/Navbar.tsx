"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { UI } from "@/data/dictionary";
import { LINKS, NAV_ITEMS, type Lang, type SectionId } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { BrandMark } from "./ui/BrandMark";
import { Dialog } from "./ui/Dialog";
import { ExternalLink } from "./ui/ExternalLink";
import { CloseIcon, GlobeIcon, InstagramIcon, MenuIcon } from "./ui/Icons";
import { EASE_OUT } from "./ui/motion";
import { buttonOutlineLight, buttonPrimary, buttonSmall } from "./ui/styles";

interface NavbarProps {
  onRequestCatalog: () => void;
}

const LANGS: ReadonlyArray<Lang> = ["sr", "en"];

function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  const pillId = useId();

  return (
    <div
      role="group"
      aria-label={t(UI.common.language)}
      className="relative flex shrink-0 rounded-full border border-coal-800/20 bg-surface/60 p-0.5"
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`relative min-h-9 min-w-10 rounded-full px-2.5 text-[0.78rem] font-bold tracking-wide transition-colors duration-200 ${
              active ? "text-paper-50" : "text-coal-800/75 hover:text-coal-900"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className="absolute inset-0 rounded-full bg-coal-800"
                transition={{ type: "spring", stiffness: 480, damping: 38 }}
              />
            ) : null}
            <span className="relative">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

const iconLink =
  "grid h-10 w-10 place-items-center rounded-full text-coal-800/75 transition-colors hover:bg-coal-800/8 hover:text-coal-900";

export function Navbar({ onRequestCatalog }: NavbarProps) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    // Zaglavlje se sklanja pri skrolu naniže, a vraća čim posetilac krene naviše.
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (y < 320) setHidden(false);
      else if (y > lastY + 6) setHidden(true);
      else if (y < lastY - 6) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Označavamo sekciju koja je trenutno u sredini ekrana.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const onTop = () => {
      if (window.scrollY < 200) setActiveSection(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Svetlo, poluprovidno zaglavlje: na njemu stoji zvanični zeleni logo */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-ink/8 pr-[var(--scrollbar-comp,0px)] backdrop-blur-md transition-[background-color,box-shadow,transform] duration-500 ease-out-expo focus-within:translate-y-0 ${
          scrolled
            ? "bg-paper-50/90 shadow-[0_10px_30px_-20px_rgb(18_18_17/0.55)]"
            : "bg-paper-50/96"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-page flex h-16 items-center gap-2 sm:gap-3 lg:h-[4.5rem]">
          <a
            href="#pocetak"
            aria-label={t(UI.common.home)}
            className="block shrink-0 text-coal-800 transition-opacity hover:opacity-80"
          >
            <BrandMark surface="light" />
          </a>

          <nav aria-label={t(UI.common.mainNav)} className="ml-auto hidden lg:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? "location" : undefined}
                      className={`relative block px-3 py-2 text-[0.92rem] font-medium transition-colors duration-200 xl:px-3.5 ${
                        active ? "text-coal-900" : "text-ink/70 hover:text-coal-900"
                      }`}
                    >
                      {t(item.label)}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-magnus-500 xl:inset-x-3.5"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <div className="hidden items-center xl:flex">
              <ExternalLink
                href={LINKS.site}
                aria-label={`${t(UI.common.officialSite)}: ${LINKS.siteLabel}`}
                className={iconLink}
              >
                <GlobeIcon />
              </ExternalLink>
              <ExternalLink
                href={LINKS.instagram}
                aria-label={`${t(UI.common.instagram)}: ${LINKS.instagramHandle}`}
                className={iconLink}
              >
                <InstagramIcon />
              </ExternalLink>
            </div>

            <LanguageSwitch />

            <div className="hidden sm:block">
              <button
                type="button"
                onClick={onRequestCatalog}
                aria-haspopup="dialog"
                className={`${buttonPrimary} ${buttonSmall}`}
              >
                {t(UI.common.requestCatalog)}
              </button>
            </div>

            {/* Ikona, a ne polje za dodir od 44 px, poravnata je sa ivicom sadržaja */}
            <div className="-mr-2.5 lg:hidden">
              <button
                type="button"
                aria-label={t(UI.common.openMenu)}
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-lg text-coal-900 transition-colors hover:bg-coal-800/8"
              >
                <MenuIcon width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobilni meni je van <header> jer zamućena pozadina zaglavlja menja
          način pozicioniranja fiksiranih potomaka. */}
      <Dialog open={menuOpen} onClose={closeMenu} labelledBy="mobilni-meni-naslov" variant="drawer">
        <div className="flex min-h-full flex-col px-6 pb-8 pt-4">
          <div className="flex items-center justify-between">
            <h2 id="mobilni-meni-naslov" className="font-condensed text-sm font-semibold text-mist">
              {t(UI.common.menu)}
            </h2>
            <button
              type="button"
              aria-label={t(UI.common.closeMenu)}
              onClick={closeMenu}
              className="-mr-2 grid h-11 w-11 place-items-center rounded-lg text-paper-50 transition-colors hover:bg-paper-50/10"
            >
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          <nav aria-label={t(UI.common.mainNav)} className="mt-4">
            <ul>
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + index * 0.045, ease: EASE_OUT }}
                  className="border-b border-paper-50/10"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    className="font-display block py-3.5 text-[2rem] text-paper-50 transition-colors hover:text-kraft-300"
                  >
                    {t(item.label)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 grid gap-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onRequestCatalog();
              }}
              className={buttonPrimary}
            >
              {t(UI.common.requestCatalog)}
            </button>
            <a href="#b2b-forma" onClick={closeMenu} className={buttonOutlineLight}>
              {t(UI.common.b2bInquiry)}
            </a>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm text-mist">{t(UI.hero.channels)}</p>
            <ul className="mt-3 grid gap-1">
              <li>
                <ExternalLink
                  href={LINKS.site}
                  className="flex min-h-11 items-center gap-3 text-paper-50 hover:text-kraft-300"
                >
                  <GlobeIcon />
                  {LINKS.siteLabel}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={LINKS.instagram}
                  className="flex min-h-11 items-center gap-3 text-paper-50 hover:text-kraft-300"
                >
                  <InstagramIcon />
                  {LINKS.instagramHandle}
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  );
}
