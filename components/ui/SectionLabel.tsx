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
      className={`label-section ${surface === "dark" ? "text-mist" : "text-muted"} ${className}`}
    >
      {children}
    </p>
  );
}
