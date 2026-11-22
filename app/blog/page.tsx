import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogIndexPage } from "@/components/pages/BlogPages";
import { ROUTES } from "@/data/magnusData";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Članci Magnus Food Industry o kvalitetu bez kompromisa, poreklu mesa sa Peštera, zamrzavanju i pripremi roštilja kod kuće.",
  path: ROUTES.blog,
});

export default function BlogRoute() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Blog", path: ROUTES.blog },
          ]),
        )}
      />
      <BlogIndexPage />
    </>
  );
}
