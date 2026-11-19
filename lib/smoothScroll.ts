import type Lenis from "lenis";

/**
 * Jedno mesto za skrol: glatki skrol (Lenis) kada je uključen, a običan
 * skrol pregledača kada nije (ekrani na dodir ga i dalje pomeraju prstom,
 * a uz smanjeno kretanje Lenis se uopšte ne pokreće).
 */

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null): void => {
  lenis = instance;
};

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Skroluje do elementa sa datim id-jem i vraća taj element. */
export function scrollToId(id: string): HTMLElement | null {
  const target = document.getElementById(id);
  if (!target) return null;

  if (lenis) {
    // Cilj računamo sami i zaokružujemo na ceo piksel. Raspored često daje
    // položaje na pola piksela, a Lenis tada animaciju završava tek posle više
    // sekundi i za to vreme poništava skrol tastaturom.
    // Razmak za fiksirano zaglavlje dolazi iz CSS-a: `scroll-padding-top` na
    // <html> i `scroll-margin-top` na samom elementu.
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const padding =
      Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - margin - padding;
    // `force` dozvoljava skok i dok je skrol zaključan (npr. meni se upravo zatvara).
    lenis.scrollTo(Math.max(0, Math.round(top)), { force: true });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
  return target;
}

/** Dijalozi zaključavaju skrol stranice dok su otvoreni. */
export const lockScroll = (): void => lenis?.stop();
export const unlockScroll = (): void => lenis?.start();
