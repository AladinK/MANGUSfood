import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductPage } from "@/components/pages/ProductPage";
import { PRODUCTS, ROUTES, getProduct, productHref } from "@/data/magnusData";
import { breadcrumbLd, graph, pageMetadata, productLd } from "@/lib/seo";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

/** Stranice proizvoda se prave unapred; nepoznata adresa vodi na 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.id }));
}

const clip = (text: string, max = 158): string =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name.sr,
    description: clip(product.story.sr),
    path: productHref(product.id),
  });
}

export default async function ProductRoute({ params }: RouteProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          productLd(product),
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Proizvodi", path: ROUTES.products },
            { name: product.name.sr, path: productHref(product.id) },
          ]),
        )}
      />
      <ProductPage productId={product.id} />
    </>
  );
}
