import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import {
  BRAND_ASSETS,
  COMPANY,
  FAQ_ITEMS,
  LINKS,
  PRODUCTS,
  getCategory,
} from "@/data/magnusData";
import { INTRO_SESSION_KEY } from "@/lib/introKey";
import "./globals.css";

/**
 * Archivo (SIL OFL 1.1), promenljivi font sa osama težine i širine.
 * Hostuje se lokalno: nema zahteva ka trećim stranama, a next/font pravi
 * rezervni font usklađenih mera, pa učitavanje ne pomera raspored (CLS).
 */
const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "400 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 100%" }],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const TITLE = "Magnus Food Industry | Pravo meso. Pravi ukus. 100% Pešter";
const DESCRIPTION =
  "Brzo zamrznuti proizvodi od 100% junetine i pite i mantije spremne za pečenje, iz Novog Pazara. HACCP i HALAL. Zatražite katalog ili pošaljite B2B upit.";

export const metadata: Metadata = {
  metadataBase: new URL(LINKS.site),
  title: {
    default: TITLE,
    template: `%s | ${COMPANY.brand}`,
  },
  description: DESCRIPTION,
  applicationName: COMPANY.brand,
  authors: [{ name: COMPANY.brand, url: LINKS.site }],
  creator: COMPANY.brand,
  publisher: COMPANY.legalName,
  category: "food",
  keywords: [
    "Magnus Food Industry",
    "Magnus Food",
    "pazarski ćevapi",
    "Premium Burger",
    "juneća pljeskavica",
    "roštiljska kobasica",
    "pazarske mantije",
    "zamrznuta pita",
    "brzo zamrznuto meso",
    "100% junetina",
    "Pešter",
    "HALAL",
    "HACCP",
    "HoReCa",
    "Novi Pazar",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: LINKS.site,
    siteName: COMPANY.brand,
    title: TITLE,
    description: DESCRIPTION,
    locale: "sr_RS",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d1d1b",
  colorScheme: "light",
};

/* ------------------------------------------------------------------ */
/* Strukturirani podaci (JSON-LD): Organization, WebSite, Product, FAQ */
/* ------------------------------------------------------------------ */

const ORGANIZATION_ID = `${LINKS.site}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: COMPANY.brand,
      legalName: COMPANY.legalName,
      url: LINKS.site,
      logo: `${LINKS.site}${BRAND_ASSETS.logoOnLight ?? ""}`,
      slogan: COMPANY.tagline.sr,
      description: COMPANY.summary.sr,
      email: COMPANY.email,
      telephone: COMPANY.phone.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address.street,
        postalCode: COMPANY.address.postalCode,
        addressLocality: COMPANY.address.city,
        addressCountry: COMPANY.address.countryCode,
      },
      sameAs: [LINKS.instagram, LINKS.facebook],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: COMPANY.phone.display,
          email: COMPANY.email,
          areaServed: "RS",
          availableLanguage: ["sr", "en"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${LINKS.site}/#website`,
      url: LINKS.site,
      name: COMPANY.brand,
      description: DESCRIPTION,
      inLanguage: "sr-Latn",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "ItemList",
      "@id": `${LINKS.site}/#asortiman`,
      name: "Magnus Food Industry — asortiman",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `${LINKS.site}/#${product.id}`,
          name: product.name.sr,
          description: product.description.sr,
          category: getCategory(product.category).name.sr,
          brand: { "@type": "Brand", name: COMPANY.shortBrand },
          manufacturer: { "@id": ORGANIZATION_ID },
          ...(product.imageSrc ? { image: `${LINKS.site}${product.imageSrc}` } : {}),
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${LINKS.site}/#faq`,
      inLanguage: "sr-Latn",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question.sr,
        acceptedAnswer: { "@type": "Answer", text: item.answer.sr },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: skripta ispod upisuje data-intro pre hidratacije.
    <html lang="sr-Latn" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Zvanični društveni profil brenda */}
        <link rel="me" href={LINKS.instagram} />
        {/* Uvodna zavesa se u jednoj poseti prikazuje jednom: pri ponovnom
            učitavanju je sakrivamo pre prvog iscrtavanja. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SESSION_KEY)}))document.documentElement.dataset.intro="done"}catch(e){}`,
          }}
        />
        {/* Bez JavaScript-a nema animacija: sadržaj i slike su odmah vidljivi. */}
        <noscript>
          <style>{`.intro{display:none}main [style],footer [style]{opacity:1!important;transform:none!important;clip-path:none!important}main img,footer img,header img{opacity:1!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // "<" se zamenjuje da sadržaj nikada ne može da zatvori <script> oznaku.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
