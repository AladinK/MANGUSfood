"use client";

import Link from "next/link";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/i18n";

export interface Crumb {
  label: string;
  /** Poslednja stavka (trenutna stranica) nema link */
  href?: string;
}

interface BreadcrumbsProps {
  items: ReadonlyArray<Crumb>;
  surface?: "light" | "dark";
  className?: string;
}

/** Putanja do stranice; trenutna stranica je označena sa aria-current. */
export function Breadcrumbs({ items, surface = "light", className = "" }: BreadcrumbsProps) {
  const { t } = useLang();
  const dark = surface === "dark";

  return (
    <nav aria-label={t(UI.common.breadcrumb)} className={className}>
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem] ${dark ? "text-mist" : "text-muted"}`}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={`inline-flex min-h-9 items-center underline decoration-current/30 underline-offset-4 transition-colors ${
                    dark ? "hover:text-paper-50" : "hover:text-coal-900"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="line-clamp-1">
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
