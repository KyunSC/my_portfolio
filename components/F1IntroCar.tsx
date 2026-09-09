/** Decorative overhead car; its entrance and the heading share one CSS timeline. */
export default function F1IntroCar() {
  return (
    <div className="f1-intro-car" aria-hidden="true">
      <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Slipstream trails behind the rear wing. */}
        <g stroke="currentColor" strokeLinecap="round" opacity="0.3">
          <path d="M280 42h58M290 59h65M286 81h58M280 98h45" strokeWidth="2" />
        </g>
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
        <path d="M24 26h19l10 44-10 44H24l6-44Z" fill="#142044" stroke="#64748b" />
        <path d="M26 28h7v84h-7Z" fill="#ef4444" />
        <path d="m38 64 84-10 33-18h56l29 19v30l-29 19h-56l-33-18-84-10Z" fill="#142044" stroke="#64748b" />
        <path d="m39 65 54-5v20l-54-5Z" fill="#facc15" />
        {/* Sculpted sidepods and red livery. */}
        <path d="m127 51 32-12h48l21 15-52 3Z" fill="#ef4444" />
        <path d="m127 89 32 12h48l21-15-52-3Z" fill="#ef4444" />
        <path d="m177 60 57 5v10l-57 5Z" fill="#243763" />
        <ellipse cx="147" cy="70" rx="25" ry="15" fill="#050914" />
        <circle cx="153" cy="70" r="9" fill="#facc15" />
        <path d="M147 64v12" stroke="#111827" strokeWidth="4" />
        {/* Halo surrounds the cockpit. */}
        <path d="M159 52h-16a18 18 0 0 0 0 36h16M125 70h20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <path d="M244 25h24v90h-24Z" fill="#142044" stroke="#64748b" />
        <path d="M259 27h7v86h-7Z" fill="#ef4444" />
        <path d="M241 24h30M241 116h30" stroke="#94a3b8" strokeWidth="3" />
      </svg>
    </div>
  );
}
