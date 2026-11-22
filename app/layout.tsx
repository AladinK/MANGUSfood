import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { SiteShell } from "@/components/SiteShell";
import { BRAND_ASSETS, COMPANY, LINKS } from "@/data/magnusData";
import { ORGANIZATION_ID, SITE_DESCRIPTION, SITE_TITLE, WEBSITE_ID, graph } from "@/lib/seo";
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

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

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
  openGraph: {
    type: "website",
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
/* Strukturirani podaci za ceo sajt: Organization i WebSite. Proizvodi,  */
/* članci, FAQ i putanje su na svojim stranicama.                       */
/* ------------------------------------------------------------------ */

const siteJsonLd = graph(
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
    "@id": WEBSITE_ID,
    url: LINKS.site,
    name: COMPANY.brand,
    description: DESCRIPTION,
    inLanguage: "sr-Latn",
    publisher: { "@id": ORGANIZATION_ID },
  },
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior: Next.js isključuje glatki skrol pri prelasku na
    // novu stranicu, pa nova stranica počinje odmah od vrha.
    <html lang="sr-Latn" className={archivo.variable} data-scroll-behavior="smooth">
      <head>
        {/* Zvanični društveni profil brenda */}
        <link rel="me" href={LINKS.instagram} />
        <JsonLd data={siteJsonLd} />
      </head>
      <body>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
