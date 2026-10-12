import type { F1Team } from "@/lib/f1-teams";

/** Matching overhead sprites keep every team aligned with the existing animations. */
export default function F1TeamCar({ team, className, showTrails = false }: {
  team: F1Team;
  className?: string;
  showTrails?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox={showTrails ? "0 0 360 140" : "10 0 275 140"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {showTrails && (
        <g stroke="currentColor" strokeLinecap="round" opacity="0.3">
          <path d="M280 42h58M290 59h65M286 81h58M280 98h45" strokeWidth="2" />
        </g>
      )}
      <image href={team.image} x="14" y="20" width="267" height="100" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
