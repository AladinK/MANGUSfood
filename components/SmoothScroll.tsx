"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { scrollToId, setLenis } from "@/lib/smoothScroll";

/**
 * Glatki skrol točkićem (Lenis) i skokovi na sekcije.
 *
 * - Ekrani na dodir skroluju prirodno, prstom.
 * - Uz `prefers-reduced-motion` Lenis se ne pokreće; linkovi ka sekcijama
 *   tada rade kao obični linkovi pregledača.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true });
    setLenis(lenis);

    // Linkovi oblika #sekcija: glatki skok, adresa i fokus kao kod običnog linka.
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!link || !id) return;

      const target = scrollToId(id);
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
