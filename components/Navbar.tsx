"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { UI } from "@/data/dictionary";
import { LINKS, NAV_ITEMS, inquiryHref, type Lang } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { useCatalog } from "./SiteShell";
import { BrandMark } from "./ui/BrandMark";
import { Dialog } from "./ui/Dialog";
import { ExternalLink } from "./ui/ExternalLink";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon } from "./ui/Icons";
import { EASE_OUT } from "./ui/motion";
import { buttonOutlineLight, buttonPrimary, buttonSmall } from "./ui/styles";

const LANGS: ReadonlyArray<Lang> = ["sr", "en"];

/** Stavka je aktivna na svojoj stranici i na stranicama ispod nje */
const isActivePath = (pathname: string, href: string): boolean =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

function LanguageSwitch({ onDark }: { onDark: boolean }) {
  const { lang, setLang, t } = useLang();
  const pillId = useId();

  return (
    <div
      role="group"
      aria-label={t(UI.common.language)}
      className={`relative flex shrink-0 rounded-[10px] border p-0.5 transition-colors duration-300 ${
        onDark ? "border-paper-50/25 bg-paper-50/5" : "border-coal-800/20 bg-surface/60"
      }`}
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
            className={`relative min-h-9 min-w-10 rounded-lg px-2.5 text-[0.8125rem] font-semibold transition-colors duration-200 ${
              active
                ? onDark
                  ? "text-coal-900"
                  : "text-paper-50"
                : onDark
                  ? "text-paper-50/70 hover:text-paper-50"
                  : "text-coal-800/75 hover:text-coal-900"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className={`absolute inset-0 rounded-lg transition-colors duration-300 ${
                  onDark ? "bg-paper-50" : "bg-coal-800"
                }`}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              />
            ) : null}
            <span className="relative">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

const iconLinkBase = "grid h-10 w-10 place-items-center rounded-full transition-colors duration-300";
const iconLinkLight = `${iconLinkBase} text-coal-800/75 hover:bg-coal-800/8 hover:text-coal-900`;
const iconLinkDark = `${iconLinkBase} text-paper-50/75 hover:bg-paper-50/10 hover:text-paper-50`;

/**
 * Ton zaglavlja: providno na vrhu tamnog početka stranice (scena na početnoj,
 * zaglavlje unutrašnjih stranica), tamno staklo dok je taj deo ispod
 * zaglavlja, svetla traka posle njega i na stranicama sa svetlim početkom.
 */
type Tone = "clear" | "glass" | "light";

export function Navbar() {
  const { t } = useLang();
  const { openCatalog } = useCatalog();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<Tone>("light");

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

      // Tamni početak stranice: scena na početnoj ili zaglavlje unutrašnje stranice
      const hero = document.querySelector<HTMLElement>("[data-dark-header]");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      setTone(hero && y < heroBottom - 72 ? (y < 24 ? "clear" : "glass") : "light");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const onDark = tone !== "light";

  // Posle prelaska na drugu stranicu meni se zatvara, a zaglavlje je vidljivo.
  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Providno preko početnog ekrana, zatim tamno staklo, pa svetla traka */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b pr-[var(--scrollbar-comp,0px)] transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out-expo focus-within:translate-y-0 ${
          tone === "clear"
            ? "border-transparent bg-transparent"
            : tone === "glass"
              ? "border-paper-50/10 bg-coal-900/78 backdrop-blur-md"
              : scrolled
                ? "border-ink/8 bg-paper-50/90 shadow-[0_10px_30px_-20px_rgb(18_18_17/0.55)] backdrop-blur-md"
                : "border-ink/8 bg-paper-50/96 backdrop-blur-md"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-page flex h-16 items-center gap-2 sm:gap-3 lg:h-[4.5rem]">
          <Link
            href="/"
            aria-label={t(UI.common.home)}
            className={`block shrink-0 transition-opacity hover:opacity-80 ${
              onDark ? "text-paper-50" : "text-coal-800"
            }`}
          >
            <BrandMark surface={onDark ? "dark" : "light"} />
          </Link>

          <nav aria-label={t(UI.common.mainNav)} className="ml-auto hidden lg:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-2.5 py-2 text-[0.92rem] font-medium transition-colors duration-200 xl:px-3.5 ${
                        onDark
                          ? active
                            ? "text-paper-50"
                            : "text-paper-50/75 hover:text-paper-50"
                          : active
                            ? "text-coal-900"
                            : "text-ink/70 hover:text-coal-900"
                      }`}
                    >
                      {t(item.label)}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-magnus-500 xl:inset-x-3.5"
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <div className="hidden items-center xl:flex">
              <ExternalLink
                href={LINKS.instagram}
                aria-label={`${t(UI.common.instagram)}: ${LINKS.instagramHandle}`}
                className={onDark ? iconLinkDark : iconLinkLight}
              >
                <InstagramIcon />
              </ExternalLink>
              <ExternalLink
                href={LINKS.facebook}
                aria-label={t(UI.common.facebook)}
                className={onDark ? iconLinkDark : iconLinkLight}
              >
                <FacebookIcon />
              </ExternalLink>
            </div>

            <LanguageSwitch onDark={onDark} />

            <div className="hidden sm:block">
              <button
                type="button"
                onClick={openCatalog}
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
                className={`grid h-11 w-11 place-items-center rounded-lg transition-colors duration-300 ${
                  onDark ? "text-paper-50 hover:bg-paper-50/10" : "text-coal-900 hover:bg-coal-800/8"
                }`}
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
              {NAV_ITEMS.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.04 + index * 0.03, ease: EASE_OUT }}
                    className="border-b border-paper-50/10"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`font-display block py-3.5 text-[2rem] transition-colors hover:text-kraft-300 ${
                        active ? "text-magnus-400" : "text-paper-50"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-7 grid gap-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openCatalog();
              }}
              className={buttonPrimary}
            >
              {t(UI.common.requestCatalog)}
            </button>
            <Link href={inquiryHref()} onClick={closeMenu} className={buttonOutlineLight}>
              {t(UI.common.b2bInquiry)}
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm text-mist">{t(UI.footer.channelsTitle)}</p>
            <ul className="mt-3 grid gap-1">
              <li>
                <ExternalLink
                  href={LINKS.instagram}
                  className="flex min-h-11 items-center gap-3 text-paper-50 hover:text-kraft-300"
                >
                  <InstagramIcon />
                  {LINKS.instagramHandle}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={LINKS.facebook}
                  className="flex min-h-11 items-center gap-3 text-paper-50 hover:text-kraft-300"
                >
                  <FacebookIcon />
                  {t(UI.common.facebook)}
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  );
}
