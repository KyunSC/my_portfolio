"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Flag } from "lucide-react";
import type { EXPERIENCES } from "@/lib/data";
import { cn } from "@/lib/utils";

const CIRCUIT_PATH = "M 100 90 C 30 90 30 20 120 20 L 370 20 C 465 20 475 145 390 150 L 150 150 C 95 150 155 90 100 90 Z";

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
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [journey, setJourney] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;
    if (!path || !car) return;
    const length = path.getTotalLength();
    const start = progressRef.current;
    const stop = stopProgress(circuitIndex, experiences.length);
    // Labels, track markers and the car destination share the same path position.
    experiences.forEach((_, index) => {
      const point = path.getPointAtLength(stopProgress(index, experiences.length) * length);
      stopRefs.current[index]?.setAttribute("transform", `translate(${point.x} ${point.y})`);
      const label = labelRefs.current[index];
      if (label) {
        label.style.left = `${point.x / 500 * 100}%`;
        label.style.top = `${(point.y + 35) / 250 * 100}%`;
        label.style.transform = point.y < 90
          ? "translate(-50%, 20px)"
          : "translate(-50%, calc(-100% - 20px))";
      }
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
        <div className="mb-6 flex items-center justify-between"><span className="f1-eyebrow">Sunny Chen / Career circuit</span><Flag size={18} className="text-primary" /></div>
        <div className="relative mx-auto mb-8 aspect-[2/1] max-w-lg">
          <svg viewBox="0 -35 500 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path ref={pathRef} d={CIRCUIT_PATH} fill="none" stroke="var(--border)" strokeWidth="26" />
            <path d={CIRCUIT_PATH} fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="5 7" />
            {experiences.map((exp, index) => (
              <g key={exp.company} ref={(element) => { stopRefs.current[index] = element; }}>
                <circle r="16" fill="var(--background)" stroke={circuitIndex === index ? "var(--primary)" : "var(--muted-foreground)"} strokeWidth="2" />
                <path d="M0-12V12" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            ))}
            <g ref={carRef} transform="translate(100 90) rotate(180)">
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
          <div>{experiences.map((exp, i) => <button ref={(element) => { labelRefs.current[i] = element; }} key={exp.company} aria-pressed={circuitIndex === i} onClick={() => { setCircuitIndex(i); setJourney((value) => value + 1); }} className={cn("absolute flex flex-col items-center gap-1 whitespace-nowrap rounded-lg border bg-background px-3 py-2 text-[10px] sm:text-xs shadow-sm transition-colors", circuitIndex === i ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary")}><span className="font-mono font-bold">STOP {String(i + 1).padStart(2, "0")}</span><span>{exp.company}</span></button>)}</div>
        </div>
        <div className="relative rounded-lg border border-border bg-background p-5 sm:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><p className="f1-eyebrow text-primary">{circuit.company}</p><h4 className="mt-2 text-xl font-bold">{circuit.role}</h4></div><p className="text-xs text-muted-foreground">{circuit.period} · {circuit.location}</p></div><Details experience={circuit} /></div>
      </div>
  </div>;
}
