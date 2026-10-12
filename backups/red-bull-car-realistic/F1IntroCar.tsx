import RedBullCar from "@/components/RedBullCar";

/** Decorative overhead car; its entrance and the heading share one CSS timeline. */
export default function F1IntroCar() {
  return (
    <div className="f1-intro-car" aria-hidden="true">
      <RedBullCar showTrails />
    </div>
  );
}
