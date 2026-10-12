"use client";

import F1TeamCar from "@/components/F1TeamCar";
import { useF1Team } from "@/lib/use-f1-team";

/** Decorative overhead car; its entrance and the heading share one CSS timeline. */
export default function F1IntroCar() {
  const team = useF1Team();
  return (
    <div className="f1-intro-car" aria-hidden="true">
      <F1TeamCar team={team} showTrails />
    </div>
  );
}
