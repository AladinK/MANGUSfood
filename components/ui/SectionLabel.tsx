import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  /** Podloga sekcije: određuje boju oznake */
  surface?: "light" | "dark";
  className?: string;
}

/**
 * Mala oznaka iznad naslova sekcije. Nosi isti naziv kao stavka u navigaciji,
 * pa posetilac zna gde je stigao posle skoka sa menija.
 */
export function SectionLabel({ children, surface = "light", className = "" }: SectionLabelProps) {
  return (
    <p
      className={`label-caps flex items-center gap-3 ${
        surface === "dark" ? "text-kraft-300" : "text-leaf-600"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}
