import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { HomeHoreca, HomeNews, HomePester, HomeProducts } from "@/components/home/HomeSections";
import { InstagramShowcaseSection } from "@/components/InstagramShowcaseSection";
import { QualitySection } from "@/components/QualitySection";
import { SITE_DESCRIPTION, SITE_TITLE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
  title: { absolute: SITE_TITLE },
};

/** Početna: isti blokovi kao na magnusfood.rs, sa linkovima ka stranicama. */
export default function HomeRoute() {
  return (
    <>
      <HeroSection />
      <HomeProducts />
      <QualitySection />
      <HomePester />
      <HomeHoreca />
      <InstagramShowcaseSection />
      <HomeNews />
    </>
  );
}
