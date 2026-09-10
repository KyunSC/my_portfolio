"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Flag } from "lucide-react";
import type { EXPERIENCES } from "@/lib/data";
import { cn } from "@/lib/utils";

// Nürburgring Nordschleife + GP loop (24-hour layout), traced from the
// supplied reference. One continuous centreline drives both car and stops.
const CIRCUIT_PATH = [
  "M 279 869 C 304 850 330 816 354 798",
  "Q 362 791 369 794 L 376 784 Q 388 777 393 764",
  "L 414 737 Q 419 728 432 721 L 616 612",
  "C 632 603 626 588 619 579 C 611 571 591 571 586 558",
  "Q 586 553 602 544 Q 610 537 619 548",
  "C 630 561 647 545 665 544 L 686 531",
  "C 693 519 695 505 710 496 C 717 491 728 493 731 482",
  "L 729 455 C 728 443 741 434 744 424",
  "Q 746 419 756 423 L 769 424 Q 779 425 777 411",
  "L 776 401 Q 777 396 766 396 Q 750 393 755 380",
  "L 761 367 Q 766 360 752 348 Q 751 344 742 345",
  "Q 734 345 729 337 C 724 330 709 331 701 325",
  "Q 693 318 687 332 Q 682 338 687 344",
  "C 686 355 675 367 664 370 C 650 371 635 380 628 388",
  "Q 619 392 620 383 Q 622 378 643 365",
  "Q 656 358 649 352 C 641 351 620 355 610 362",
  "C 598 371 588 379 575 381 Q 557 377 546 366",
  "C 531 356 504 352 484 353 C 466 354 440 343 436 326",
  "C 430 312 437 283 433 278 Q 430 269 421 277",
  "L 404 289 C 384 293 364 298 351 305",
  "Q 347 308 349 318 Q 350 331 335 326",
  "C 325 322 304 324 296 326 Q 292 339 285 328",
  "C 265 311 254 302 246 322 L 240 336",
  "Q 232 344 220 348 Q 211 356 230 364",
  "Q 235 367 242 365 Q 249 365 250 378",
  "Q 254 388 248 397 C 233 417 220 429 205 440",
  "Q 197 446 202 451 Q 208 455 198 461",
  "Q 191 463 194 476 C 192 494 178 504 164 518",
  "L 143 537 C 129 546 111 546 112 553",
  "C 110 562 133 563 143 580 L 162 625",
  "C 172 650 166 671 159 687 Q 153 700 163 713",
  "L 178 732 C 190 743 210 751 216 758",
  "Q 215 768 225 769 L 239 773 Q 240 781 248 784",
  "Q 250 797 260 794 C 277 790 288 798 300 802",
  "Q 314 809 324 791 L 330 780 Q 333 775 340 789",
  "Q 346 798 329 807 C 308 815 282 818 269 824",
  "Q 263 827 257 837 L 240 858 Q 234 864 249 869",
  "L 263 875 L 246 917 Q 242 928 247 935",
  "L 224 956 Q 218 963 226 966 Q 231 968 236 956",
  "Q 246 939 264 930 Q 276 923 264 919",
  "Q 252 917 256 906 L 269 867 Q 272 861 273 870",
  "Q 275 874 279 869 Z",
].join(" ");

function stopProgress(index: number, count: number) {
  return (0.25 + index / Math.max(1, count)) % 1;
}

type Experience = (typeof EXPERIENCES)[number];

function Details({ experience }: { experience: Experience }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="f1-eyebrow mb-3">Session highlights</p>
        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {experience.description.split("\n").map((line) => <li key={line} className="flex gap-3"><span className="mt-2 size-1 shrink-0 bg-primary" />{line}</li>)}
        </ul>
      </div>
      <div>
        <p className="f1-eyebrow mb-3">Technical setup</p>
        <div className="flex flex-wrap gap-2">{experience.tags.map((tag) => <span key={tag} className="rounded-sm border border-border bg-background/50 px-2 py-1 font-mono text-xs text-foreground">{tag}</span>)}</div>
      </div>
      {"links" in experience && experience.links && <div className="flex flex-wrap gap-4">{experience.links.map((url) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary underline-offset-4 hover:underline">{new URL(url).hostname}<ArrowUpRight size={13} /></a>)}</div>}
    </div>
  );
}

export default function CareerCircuit({ experiences }: { experiences: typeof EXPERIENCES }) {
  const [circuitIndex, setCircuitIndex] = useState(0);
  const circuit = experiences[circuitIndex];
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const progressRef = useRef(0);
  const stopRefs = useRef<(SVGGElement | null)[]>([]);
  const [journey, setJourney] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;
    if (!path || !car) return;
    const length = path.getTotalLength();
    const start = progressRef.current;
    const stop = stopProgress(circuitIndex, experiences.length);
    // Track markers and the car destination share the same path position.
    experiences.forEach((_, index) => {
      const point = path.getPointAtLength(stopProgress(index, experiences.length) * length);
      stopRefs.current[index]?.setAttribute("transform", `translate(${point.x} ${point.y})`);

    });
    // Always drive forward, including when returning to an earlier stop.
    const distance = ((stop - start % 1 + 1) % 1) || 1;
    const finish = start + distance;
    const duration = Math.max(900, distance * 4000);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started: number | undefined;

    function place(progress: number) {
      if (!path || !car) return;
      const point = path.getPointAtLength((progress % 1) * length);
      const ahead = path.getPointAtLength(((progress + 0.001) % 1) * length);
      const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI;
      car.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      progressRef.current = progress;
    }

    function tick(now: number) {
      started ??= now;
      const elapsed = Math.min((now - started) / duration, 1);
      const eased = elapsed * elapsed * (3 - 2 * elapsed);
      place(start + distance * eased);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    }

    function handleMotionChange() {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame);
        place(finish);
      }
    }

    place(start);
    if (reducedMotion.matches) place(finish);
    else frame = requestAnimationFrame(tick);
    reducedMotion.addEventListener("change", handleMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [circuitIndex, experiences, journey]);

  return <div className="f1-career-circuit space-y-5">
    <p className="text-sm text-muted-foreground">Choose a stop to explore each role.</p>
      <div className="f1-panel f1-circuit-grid overflow-hidden rounded-xl border border-border p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between"><span className="f1-eyebrow">Career circuit / Nürburgring 24H</span><Flag size={18} className="text-primary" /></div>
        <div className="relative mx-auto mb-6 aspect-[740/760] w-full max-w-lg">
          <svg viewBox="75 240 740 760" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path ref={pathRef} d={CIRCUIT_PATH} fill="none" stroke="var(--border)" strokeWidth="10" strokeLinejoin="round" />
            <path d={CIRCUIT_PATH} fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="5 7" />
            {experiences.map((exp, index) => (
              <g key={exp.company} ref={(element) => { stopRefs.current[index] = element; }}>
                <circle r="16" fill="var(--background)" stroke={circuitIndex === index ? "var(--primary)" : "var(--muted-foreground)"} strokeWidth="2" />
                <path d="M0-12V12" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            ))}
            <g ref={carRef} transform="translate(279 869) rotate(-40)">
              <g stroke="var(--background)" strokeWidth="0.8">
                {/* Overhead car, with exposed tyres, wings, cockpit and a tapered nose. */}
                <rect x="-12" y="-12" width="9" height="6" rx="2" fill="var(--foreground)" />
                <rect x="-12" y="6" width="9" height="6" rx="2" fill="var(--foreground)" />
                <rect x="10" y="-11" width="7" height="5" rx="1.5" fill="var(--foreground)" />
                <rect x="10" y="6" width="7" height="5" rx="1.5" fill="var(--foreground)" />
                <path d="M-14-5 L-3-7 L5-4 L21-2 L21 2 L5 4 L-3 7 L-14 5Z" fill="var(--primary)" />
                <rect x="-17" y="-10" width="4" height="20" rx="1" fill="var(--primary)" />
                <rect x="19" y="-10" width="4" height="20" rx="1" fill="var(--primary)" />
                <ellipse cx="0" cy="0" rx="5" ry="3" fill="var(--background)" />
                <circle cx="2" cy="0" r="1.8" fill="var(--foreground)" />
              </g>
            </g>
          </svg>
        </div>
          <div className="mb-8 flex flex-wrap justify-center gap-3">{experiences.map((exp, i) => <button key={exp.company} aria-pressed={circuitIndex === i} onClick={() => { setCircuitIndex(i); setJourney((value) => value + 1); }} className={cn("flex flex-col items-center gap-1 whitespace-nowrap rounded-lg border bg-background px-3 py-2 text-[10px] sm:text-xs shadow-sm transition-colors", circuitIndex === i ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary")}><span className="font-mono font-bold">STOP {String(i + 1).padStart(2, "0")}</span><span>{exp.company}</span></button>)}</div>
        <div className="relative rounded-lg border border-border bg-background p-5 sm:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><p className="f1-eyebrow text-primary">{circuit.company}</p><h4 className="mt-2 text-xl font-bold">{circuit.role}</h4></div><p className="text-xs text-muted-foreground">{circuit.period} · {circuit.location}</p></div><Details experience={circuit} /></div>
      </div>
  </div>;
}
