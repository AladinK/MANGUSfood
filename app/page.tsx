"use client";

import { useCallback, useState } from "react";
import { B2BFunnelSection, type InquiryPrefill } from "@/components/B2BFunnelSection";
import { CatalogModal } from "@/components/CatalogModal";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { CursorFollower } from "@/components/CursorFollower";
import { HeroSection } from "@/components/HeroSection";
import { InstagramShowcaseSection } from "@/components/InstagramShowcaseSection";
import { KineticMarquee } from "@/components/KineticMarquee";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Navbar } from "@/components/Navbar";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";
import { ProductSpecModal } from "@/components/ProductSpecModal";
import { QualityAndProcessSection } from "@/components/QualityAndProcessSection";
import { SmoothScroll } from "@/components/SmoothScroll";
import { UI } from "@/data/dictionary";
import type { Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/smoothScroll";

/**
 * Početna stranica: sklapa sve sekcije i povezuje tokove konverzije.
 *
 *  proizvod → specifikacija → „Zatraži ponudu“ → popunjena B2B forma
 *  zaglavlje / podnožje → „Zatraži katalog“ → dijalog za katalog
 *
 * Sloj iskustva: glatki skrol, linija napretka, pratilac kursora i traka sa
 * akcijama na telefonu. Svaki od njih se gasi uz `prefers-reduced-motion`
 * ili na uređajima kojima ne odgovara.
 */
export default function HomePage() {
  const { t } = useLang();
  const [specProduct, setSpecProduct] = useState<Product | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [prefill, setPrefill] = useState<InquiryPrefill | null>(null);

  const openCatalog = useCallback(() => setCatalogOpen(true), []);
  const closeCatalog = useCallback(() => setCatalogOpen(false), []);
  const closeSpec = useCallback(() => setSpecProduct(null), []);
  const clearPrefill = useCallback(() => setPrefill(null), []);

  /** Posle zatvaranja dijaloga vodi do B2B forme i postavlja fokus u prvo polje. */
  const goToInquiryForm = useCallback(() => {
    window.setTimeout(() => {
      scrollToId("b2b-forma");
      document.getElementById("b2b-name")?.focus({ preventScroll: true });
    }, 280);
  }, []);

  const requestQuote = useCallback(
    (product: Product) => {
      setSpecProduct(null);
      setPrefill({ productId: product.id, nonce: Date.now() });
      goToInquiryForm();
    },
    [goToInquiryForm],
  );

  const catalogToForm = useCallback(() => {
    setCatalogOpen(false);
    goToInquiryForm();
  }, [goToInquiryForm]);

  return (
    <>
      <SmoothScroll />
      <CursorFollower />
      <div className="scroll-progress" aria-hidden="true" />

      <a
        href="#sadrzaj"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[80] focus-visible:rounded-lg focus-visible:bg-magnus-500 focus-visible:px-4 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-ink"
      >
        {t(UI.common.skipToContent)}
      </a>

      <Navbar onRequestCatalog={openCatalog} />

      <main id="sadrzaj">
        <HeroSection />
        <ProductCatalogSection onOpenSpec={setSpecProduct} onRequestCatalog={openCatalog} />
        <KineticMarquee items={UI.marquee} />
        <QualityAndProcessSection />
        <B2BFunnelSection prefill={prefill} onClearPrefill={clearPrefill} />
        <InstagramShowcaseSection />
        <FaqSection />
      </main>

      <Footer onRequestCatalog={openCatalog} />
      <MobileActionBar onRequestCatalog={openCatalog} />

      <ProductSpecModal product={specProduct} onClose={closeSpec} onRequestQuote={requestQuote} />
      <CatalogModal open={catalogOpen} onClose={closeCatalog} onGoToForm={catalogToForm} />
    </>
  );
}
