import { useId } from "react";

interface SealProps {
  /** Tekst po obodu pečata; ponavlja se ukrug */
  text: string;
  className?: string;
}

/**
 * Pečat „100% Pešter“ — slogan brenda u formi oznake kvaliteta.
 * Obod se polako okreće; uz smanjeno kretanje miruje.
 */
export function Seal({ text, className = "" }: SealProps) {
  const pathId = useId();

  return (
    <div className={`@container relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" className="animate-seal absolute inset-0 h-full w-full">
        <defs>
          <path id={pathId} d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" />
        </defs>
        <circle cx="80" cy="80" r="78" fill="currentColor" />
        <text
          className="font-display"
          fontSize="13.5"
          fill="var(--color-coal-900)"
          style={{ letterSpacing: "0.08em" }}
        >
          <textPath href={`#${pathId}`} textLength="386" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
        <circle
          cx="80"
          cy="80"
          r="47"
          fill="none"
          stroke="var(--color-coal-900)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-coal-900">
        <span className="font-display text-[clamp(1.5rem,34cqw,2.6rem)] leading-none">100%</span>
        <span className="font-display text-[clamp(0.7rem,15cqw,1.1rem)] uppercase leading-none tracking-[0.06em]">
          Pešter
        </span>
      </div>
    </div>
  );
}
