"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UI } from "@/data/dictionary";
import { INQUIRY_ANCHOR, inquiryHref } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { useCatalog } from "./SiteShell";
import { buttonOutlineDark, buttonPrimary, buttonSmall } from "./ui/styles";

/**
 * Dva dugmeta dele širinu ekrana, pa na telefonu od 360 px svako ima 155 px.
 * Uži bočni razmak (12 px umesto 24 px iz osnovnog stila dugmeta, zato „!“) ostavlja
 * 131 px za tekst: toliko treba da „Katalog anfordern“ (125 px) stane u jedan red.
 */
const barButton = "min-h-11 flex-1 px-3! text-center";

/**
 * Traka sa glavnim akcijama u zoni palca (telefon i tablet).
 * Pojavljuje se kada posetilac prođe početni ekran, a sklanja se dok su na
 * ekranu forma za upit ili kontakt, da ne pokriva polja ni iste te akcije.
 */
export function MobileActionBar() {
  const { t } = useLang();
  const { openCatalog } = useCatalog();
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Elementi se traže iznova na svakoj stranici.
    const visible = new Set<Element>();
    setBlocked(false);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    for (const id of [INQUIRY_ANCHOR, "kontakt"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

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
          onClick={openCatalog}
          aria-haspopup="dialog"
          className={`${buttonPrimary} ${buttonSmall} ${barButton}`}
        >
          {t(UI.common.requestCatalog)}
        </button>
        <Link
          href={inquiryHref()}
          className={`${buttonOutlineDark} ${buttonSmall} ${barButton}`}
        >
          {t(UI.common.b2bInquiry)}
        </Link>
      </div>
    </div>
  );
}
