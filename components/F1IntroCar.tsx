"use client";

import { useEffect, useRef } from "react";
import F1TeamCar from "@/components/F1TeamCar";
import { playF1Pass } from "@/lib/f1-sound";
import { useF1Team } from "@/lib/use-f1-team";

/** Decorative overhead car; its entrance and the heading share one CSS timeline. */
export default function F1IntroCar() {
  const team = useF1Team();
  const ref = useRef<HTMLDivElement>(null);

  // On load the flyby sound follows the CSS pass, which only runs in the F1
  // theme without reduced motion. Switching into F1 plays it from the click
  // (ThemeSwitcher), so a pass started by another tab's switch stays silent.
  useEffect(() => {
    if (ref.current?.getAnimations().length) playF1Pass();
  }, []);

  return (
    <div ref={ref} className="f1-intro-car" aria-hidden="true">
      <F1TeamCar team={team} showTrails />
    </div>
  );
}
