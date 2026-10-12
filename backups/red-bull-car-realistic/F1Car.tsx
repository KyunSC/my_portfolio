import { cn } from "@/lib/utils";
import RedBullCar from "@/components/RedBullCar";

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
        {"// F1 MODE"}
      </span>

      <RedBullCar className="f1-car-svg relative" />
    </div>
  );
}
