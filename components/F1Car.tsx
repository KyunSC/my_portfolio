import { cn } from "@/lib/utils";

/**
 * Red Bull-style F1 car shown in place of a terminal when the F1 theme is active.
 * Sits in a frame matching the terminal's footprint; rolls in via CSS (globals.css)
 * keyed off `:root[data-theme="f1"]`.
 */
export default function F1Car({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "f1-car-frame relative mb-6 flex h-[340px] items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950",
        className
      )}
      aria-hidden="true"
    >
      {/* track line */}
      <div className="absolute bottom-16 left-0 right-0 h-px bg-zinc-800" />
      <span className="absolute left-4 top-3 font-mono text-xs tracking-widest text-zinc-600">
        // F1 MODE
      </span>

      <svg
        className="f1-car-svg relative"
        viewBox="0 0 460 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ground shadow */}
        <ellipse cx="240" cy="153" rx="185" ry="7" fill="#000000" opacity="0.25" />

        {/* rear wing (left) */}
        <rect x="38" y="56" width="44" height="9" rx="2" fill="#0b1437" />
        <rect x="38" y="56" width="44" height="4" rx="2" fill="#e2231a" />
        <rect x="46" y="62" width="8" height="42" fill="#0b1437" />
        <rect x="52" y="96" width="30" height="6" rx="2" fill="#1b2a52" />

        {/* main body */}
        <path
          d="M70,116 L70,104 Q70,96 82,95 L152,93 Q168,92 175,84 L198,70 Q207,64 218,64 L248,64 Q260,64 266,74 L278,92 Q282,98 294,99 L414,108 Q430,110 430,118 L430,121 Q430,125 426,125 L76,125 Q70,125 70,119 Z"
          fill="#0b1437"
        />
        {/* red livery stripe */}
        <path d="M150,109 L300,101 L300,109 L150,117 Z" fill="#e2231a" />
        {/* yellow nose tip */}
        <path d="M406,107 L430,118 L406,120 Z" fill="#ffd200" />

        {/* halo + cockpit */}
        <path d="M158,90 Q176,64 198,86" stroke="#2a3a6b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <line x1="178" y1="88" x2="178" y2="76" stroke="#2a3a6b" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="178" cy="86" rx="13" ry="7" fill="#06091a" />
        {/* driver helmet */}
        <circle cx="178" cy="82" r="6" fill="#e2231a" />
        <rect x="180" y="80" width="5" height="4" rx="1.5" fill="#ffd200" />

        {/* front wing (right) */}
        <rect x="400" y="115" width="44" height="5" rx="2" fill="#0b1437" />
        <rect x="400" y="122" width="48" height="4" rx="2" fill="#e2231a" />
        <rect x="442" y="108" width="6" height="20" rx="2" fill="#0b1437" />

        {/* rear wheel */}
        <g className="f1-wheel">
          <circle cx="120" cy="118" r="33" fill="#101010" />
          <circle cx="120" cy="118" r="17" fill="#1b2a52" />
          <g stroke="#4865ad" strokeWidth="3" strokeLinecap="round">
            <line x1="120" y1="103" x2="120" y2="133" />
            <line x1="107" y1="110.5" x2="133" y2="125.5" />
            <line x1="107" y1="125.5" x2="133" y2="110.5" />
          </g>
          <circle cx="120" cy="118" r="4.5" fill="#cbd5e1" />
        </g>

        {/* front wheel */}
        <g className="f1-wheel">
          <circle cx="360" cy="118" r="33" fill="#101010" />
          <circle cx="360" cy="118" r="17" fill="#1b2a52" />
          <g stroke="#4865ad" strokeWidth="3" strokeLinecap="round">
            <line x1="360" y1="103" x2="360" y2="133" />
            <line x1="347" y1="110.5" x2="373" y2="125.5" />
            <line x1="347" y1="125.5" x2="373" y2="110.5" />
          </g>
          <circle cx="360" cy="118" r="4.5" fill="#cbd5e1" />
        </g>
      </svg>
    </div>
  );
}
