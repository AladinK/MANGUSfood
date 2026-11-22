import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { B2BFunnelSection } from "@/components/B2BFunnelSection";
import { FaqSection } from "@/components/FaqSection";
import { HomeNews } from "@/components/home/HomeSections";
import { InstagramShowcaseSection } from "@/components/InstagramShowcaseSection";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";
import { QualityAndProcessSection } from "@/components/QualityAndProcessSection";
import { SITE_DESCRIPTION, SITE_TITLE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
  title: { absolute: SITE_TITLE },
};

/**
 * Početna: scena sa paralaksom, asortiman sa filmom „Asortiman na traci“,
 * kvalitet i Pešter, B2B sa formom za upit, Instagram, novosti i česta pitanja.
 * Unutrašnje stranice (O nama, Pešter, Proizvodi, Blog, Kontakt) imaju isti izgled.
 */
export default function HomeRoute() {
  return (
    <>
      <HeroSection />
      <ProductCatalogSection variant="home" />
      <QualityAndProcessSection />
      <B2BFunnelSection showHoreca />
      <InstagramShowcaseSection />
      <HomeNews />
      <FaqSection />
    </>
  );
}
