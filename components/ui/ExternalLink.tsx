"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/i18n";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
}

/** Spoljni link: nova kartica, bezbedan `rel` i najava za čitače ekrana. */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const { t } = useLang();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> ({t(UI.common.newTab)})</span>
    </a>
  );
}
