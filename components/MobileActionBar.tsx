"use client";

import { useEffect, useState } from "react";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/i18n";
import { buttonOutlineDark, buttonPrimary, buttonSmall } from "./ui/styles";

interface MobileActionBarProps {
  onRequestCatalog: () => void;
}

/**
 * Traka sa glavnim akcijama u zoni palca (telefon i tablet).
 * Pojavljuje se kada posetilac prođe početni ekran, a sklanja se dok su na
 * ekranu B2B forma ili podnožje, da ne pokriva polja ni iste te akcije.
 */
export function MobileActionBar({ onRequestCatalog }: MobileActionBarProps) {
  const { t } = useLang();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    // Forma za upit i celo podnožje (kontakt, linkovi, znak brenda)
    for (const element of [document.getElementById("b2b-forma"), document.querySelector("footer")]) {
      if (element) observer.observe(element);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const shown = pastHero && !blocked;

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-paper-50/92 backdrop-blur-md transition-[transform,opacity] duration-500 ease-out-expo lg:hidden ${
        shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container-page flex gap-2 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5">
        <button
          type="button"
          onClick={onRequestCatalog}
          aria-haspopup="dialog"
          className={`${buttonPrimary} ${buttonSmall} min-h-11 flex-1`}
        >
          {t(UI.common.requestCatalog)}
        </button>
        <a href="#b2b-forma" className={`${buttonOutlineDark} ${buttonSmall} min-h-11 flex-1`}>
          {t(UI.common.b2bInquiry)}
        </a>
      </div>
    </div>
  );
}
