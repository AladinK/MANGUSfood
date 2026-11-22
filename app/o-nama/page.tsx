import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { AboutPage } from "@/components/pages/AboutPage";
import { ROUTES } from "@/data/magnusData";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "O nama",
  description:
    "Magnus Food Industry iz Novog Pazara razvija brzo zamrznute proizvode od mesa i testa: pažljivo birane sirovine, kontrolisana proizvodnja, HACCP i HALAL.",
  path: ROUTES.about,
});

export default function AboutRoute() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "O nama", path: ROUTES.about },
          ]),
        )}
      />
      <AboutPage />
    </>
  );
}
