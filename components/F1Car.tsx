"use client";

import { cn } from "@/lib/utils";
import { F1_TEAMS } from "@/lib/f1-teams";
import { selectF1Team, useF1Team } from "@/lib/use-f1-team";
import F1TeamCar from "@/components/F1TeamCar";

/** The selected team's car shares the terminal footprint and entrance timeline. */
export default function F1Car({ className }: { className?: string }) {
  const team = useF1Team();

  return (
    <div className={cn(
      "f1-car-frame relative mb-6 flex h-[340px] items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950",
      className
    )}>
      <span className="absolute left-4 top-3 font-mono text-xs tracking-widest text-zinc-400">
        {"// F1 GARAGE"}
      </span>
      <span className="absolute right-4 top-3 font-mono text-[10px] tracking-widest text-zinc-500">11 TEAMS</span>
      <F1TeamCar team={team} className="f1-car-svg relative" />
      <div className="absolute inset-x-0 bottom-0 flex h-16 items-center gap-3 border-t border-zinc-800 px-4">
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: team.color }} aria-hidden="true" />
        <label htmlFor="f1-team" className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Team</label>
        <select
          id="f1-team"
          value={team.id}
          onChange={(event) => selectF1Team(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {F1_TEAMS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
    </div>
  );
}
