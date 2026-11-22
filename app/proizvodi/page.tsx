import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { PRODUCTS, ROUTES } from "@/data/magnusData";
import { breadcrumbLd, graph, pageMetadata, productListLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Proizvodi",
  description:
    "Pazarski ćevapi, Premium Burger, juneća pljeskavica, roštiljske kobasice, pazarske mantije i pite. Deset brzo zamrznutih proizvoda od 100% junetine i testa.",
  path: ROUTES.products,
});

export default function ProductsRoute() {
  return (
    <>
      <JsonLd
        data={graph(
          productListLd(PRODUCTS),
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Proizvodi", path: ROUTES.products },
          ]),
        )}
      />
      <ProductsPage />
    </>
  );
}
