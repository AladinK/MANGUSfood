"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";

/**
 * Globalna podešavanja: jezik interfejsa i kretanje.
 * `reducedMotion="user"` gasi pomeranje i skaliranje svima koji su u sistemu
 * uključili smanjeno kretanje; sadržaj i prelazi providnosti ostaju.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>{children}</LanguageProvider>
    </MotionConfig>
  );
}
