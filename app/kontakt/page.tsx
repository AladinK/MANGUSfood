import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContactPage } from "@/components/pages/ContactPage";
import { ROUTES } from "@/data/magnusData";
import { breadcrumbLd, faqLd, graph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Magnus Food Industry, Varevo br. 18, Novi Pazar. Telefon +381 20 510 20 30, office@magnusfood.rs. Pošaljite upit za saradnju ili zatražite katalog.",
  path: ROUTES.contact,
});

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        data={graph(
          faqLd(),
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Kontakt", path: ROUTES.contact },
          ]),
        )}
      />
      <ContactPage />
    </>
  );
}
