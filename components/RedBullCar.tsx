/** Shared overhead Red Bull illustration for the intro and F1 panels. */
export default function RedBullCar({ className, showTrails = false }: { className?: string; showTrails?: boolean }) {
  return (
      <svg className={className} viewBox={showTrails ? "0 0 360 140" : "10 0 275 140"} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Slipstream trails behind the rear wing. */}
        {showTrails && <g stroke="currentColor" strokeLinecap="round" opacity="0.3">
          <path d="M280 42h58M290 59h65M286 81h58M280 98h45" strokeWidth="2" />
        </g>}
        <ellipse cx="148" cy="73" rx="128" ry="55" fill="black" opacity="0.12" />
        {/* Suspension and four slick tires, seen from directly above. */}
        <g stroke="#64748b" strokeWidth="3">
          <path d="m72 35 48 35-48 35m153-70-42 35 42 35M72 35v70m153-70v70" />
        </g>
        <g fill="#101218" stroke="#475569" strokeWidth="1.5">
          <rect x="55" y="14" width="43" height="27" rx="7" />
          <rect x="55" y="99" width="43" height="27" rx="7" />
          <rect x="207" y="10" width="48" height="31" rx="7" />
          <rect x="207" y="99" width="48" height="31" rx="7" />
        </g>
        <g stroke="#eab308" strokeWidth="2" opacity="0.8">
          <path d="M62 19h29M62 121h29M214 15h34M214 125h34" />
        </g>
        {/* Front wing and long nose point left. */}
        <path d="M24 26h19l10 44-10 44H24l6-44Z" fill="#07132e" stroke="#475569" />
        <path d="M26 28h7v84h-7Z" fill="#ef4444" />
        <path d="m38 64 84-10 33-18h56l29 19v30l-29 19h-56l-33-18-84-10Z" fill="#07132e" stroke="#475569" />
        <path d="m39 65 54-5v20l-54-5Z" fill="#facc15" />
        {/* Navy sidepods with red edges and white Oracle lettering. */}
        <path d="m127 51 32-12h48l21 15-52 3Z" fill="#102044" />
        <path d="m127 89 32 12h48l21-15-52-3Z" fill="#102044" />
        <path d="m132 49 27-11h48l17 12m-92 41 27 11h48l17-12" stroke="#e82132" strokeWidth="3" />
        <g fill="white" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
          <text x="181" y="50">ORACLE</text>
          <text x="181" y="97">ORACLE</text>
        </g>
        <path d="m177 58 57 7v10l-57 7Z" fill="#102044" />
        {/* Stylized charging bulls against the yellow sun on the engine cover. */}
        <circle cx="202" cy="70" r="12" fill="#ffd500" />
        <g fill="#e82132">
          <path d="m179 66 7-3 9 3 4-2 3 4-4 3-2-1-3 4-3 5-3-1 3-6-5-2-4 4-3-1 3-6-4-3-4 1 1-3Z" />
          <path d="m225 66-7-3-9 3-4-2-3 4 4 3 2-1 3 4 3 5 3-1-3-6 5-2 4 4 3-1-3-6 4-3 4 1-1-3Z" />
        </g>
        <text x="102" y="73" fill="white" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">RB</text>
        <ellipse cx="147" cy="70" rx="25" ry="15" fill="#050914" />
        <circle cx="153" cy="70" r="9" fill="#facc15" />
        <path d="M147 64v12" stroke="#111827" strokeWidth="4" />
        {/* Halo surrounds the cockpit. */}
        <path d="M159 52h-16a18 18 0 0 0 0 36h16M125 70h20" stroke="#344361" strokeWidth="4" strokeLinecap="round" />
        <path d="M244 25h24v90h-24Z" fill="#07132e" stroke="#475569" />
        <text transform="translate(254 70) rotate(-90)" fill="white" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="0.5">Red Bull</text>
        <path d="M259 27h7v86h-7Z" fill="#ef4444" />
        <path d="M241 24h30M241 116h30" stroke="#94a3b8" strokeWidth="3" />
      </svg>
  );
}
