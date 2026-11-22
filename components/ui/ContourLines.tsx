import { CONTOURS } from "./contours";

interface ContourLinesProps {
  className?: string;
}

/** Mirna rezerva za fotografije dok se ne učitaju, i pozadina stranice 404. */
export function ContourLines({ className }: ContourLinesProps) {
  return (
    <svg
      viewBox="0 0 1000 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {CONTOURS.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke="currentColor"
          strokeWidth={index % 4 === 3 ? 1.6 : 1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
