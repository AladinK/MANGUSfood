"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { UI } from "@/data/dictionary";
import { ROUTES, inquiryHref } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { CatalogModal } from "./CatalogModal";
import { Footer } from "./Footer";
import { MobileActionBar } from "./MobileActionBar";
import { Navbar } from "./Navbar";

interface CatalogContextValue {
  /** Otvara dijalog „Zatraži katalog“ sa bilo koje stranice */
  openCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog mora da se koristi unutar <SiteShell>.");
  return context;
}

/**
 * Okvir zajednički za sve stranice: zaglavlje, podnožje, traka sa akcijama
 * na telefonu i dijalog za katalog. Stranice dobijaju samo svoj sadržaj.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const openCatalog = useCallback(() => setCatalogOpen(true), []);
  const closeCatalog = useCallback(() => setCatalogOpen(false), []);

  // „Imate konkretan upit?“ zatvara dijalog i vodi do forme na stranici Kontakt.
  const catalogToForm = useCallback(() => {
    setCatalogOpen(false);
    window.setTimeout(() => router.push(inquiryHref()), 220);
  }, [router]);

  const value = useMemo(() => ({ openCatalog }), [openCatalog]);

  return (
    <CatalogContext.Provider value={value}>
      <div id="vrh" />
      <a
        href="#sadrzaj"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[80] focus-visible:rounded-lg focus-visible:bg-magnus-500 focus-visible:px-4 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-ink"
      >
        {t(UI.common.skipToContent)}
      </a>

      <Navbar />

      <main id="sadrzaj" tabIndex={-1} className="outline-none">
        {children}
      </main>

      {/* Na stranici Kontakt isti podaci stoje u zaglavlju stranice */}
      <Footer showContact={pathname !== ROUTES.contact} />
      <MobileActionBar />

      <CatalogModal open={catalogOpen} onClose={closeCatalog} onGoToForm={catalogToForm} />
    </CatalogContext.Provider>
  );
}
