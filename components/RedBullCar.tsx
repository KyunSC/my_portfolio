/** Shared photoreal overhead car. Original illustration: backups/red-bull-car-original. */
export default function RedBullCar({ className, showTrails = false }: { className?: string; showTrails?: boolean }) {
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
      <image
        href="/images/red-bull-racing.webp"
        x="14"
        y="20"
        width="267"
        height="100"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
