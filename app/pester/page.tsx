import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PesterPage } from "@/components/pages/PesterPage";
import { ROUTES } from "@/data/magnusData";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pešterska visoravan",
  description:
    "Pešterska visoravan je izvor sirovine za Magnus proizvode: prostrane livade, čist vazduh, specifična klima i prirodna ishrana stoke.",
  path: ROUTES.pester,
});

export default function PesterRoute() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Pešter", path: ROUTES.pester },
          ]),
        )}
      />
      <PesterPage />
    </>
  );
}
