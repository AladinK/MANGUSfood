import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { ROUTES } from "@/data/magnusData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Politika privatnosti",
    description: "Kako Magnus Food Industry obrađuje podatke poslate preko formi na sajtu.",
    path: ROUTES.privacy,
  }),
  // Nacrt se ne indeksira dok ga Magnus ne potvrdi.
  robots: { index: false, follow: true },
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
