"use client";

import { useWeather } from "@/components/WeatherProvider";
import { useEffect, useState } from "react";

/**
 * Calculates how far through the day/night cycle we are.
 * Returns a value from 0 to 1 representing position along the arc.
 * Also returns whether it's currently daytime.
 */
function getSunProgress(sunrise: string, sunset: string): { progress: number; isDay: boolean } {
  const now = new Date();
  const rise = new Date(sunrise);
  const set = new Date(sunset);

  if (now >= rise && now <= set) {
    // Daytime: progress 0 (sunrise) → 1 (sunset)
    const total = set.getTime() - rise.getTime();
    const elapsed = now.getTime() - rise.getTime();
    return { progress: elapsed / total, isDay: true };
  }

  // Nighttime: progress 0 (sunset) → 1 (next sunrise)
  // Calculate from sunset to next sunrise (~midnight cycle)
  if (now > set) {
    // After sunset, before midnight
    const nextRise = new Date(rise);
    nextRise.setDate(nextRise.getDate() + 1);
    const total = nextRise.getTime() - set.getTime();
    const elapsed = now.getTime() - set.getTime();
    return { progress: elapsed / total, isDay: false };
  }

  // Before sunrise (early morning)
  const prevSet = new Date(set);
  prevSet.setDate(prevSet.getDate() - 1);
  const total = rise.getTime() - prevSet.getTime();
  const elapsed = now.getTime() - prevSet.getTime();
  return { progress: elapsed / total, isDay: false };
}

/**
 * Converts a 0→1 progress value to x,y coordinates along a semicircular arc.
 * Arc goes from left (0) to right (1), peaking at the top (0.5).
 */
function getArcPosition(progress: number, width: number, height: number) {
  const angle = Math.PI * (1 - progress); // PI (left) → 0 (right)
  const cx = width / 2;
  const radiusX = width / 2 - 16; // padding from edges
  const radiusY = height - 20; // how high the arc peaks

  const x = cx + radiusX * Math.cos(angle);
  const y = height - 8 - radiusY * Math.sin(angle); // 8px bottom padding

  return { x, y };
}

export default function SunPosition() {
  const { weather } = useWeather();
  const [pos, setPos] = useState<{ x: number; y: number; isDay: boolean } | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!weather?.sunrise || !weather?.sunset) return;

    function update() {
      const { progress, isDay } = getSunProgress(weather!.sunrise!, weather!.sunset!);
      const { x, y } = getArcPosition(progress, 200, 80);
      setPos({ x, y, isDay });
    }

    update();

    // Update every minute if no reduced motion preference
    if (!prefersReducedMotion) {
      const interval = setInterval(update, 60_000);
      return () => clearInterval(interval);
    }
  }, [weather, prefersReducedMotion]);

  if (!pos) return null;

  return (
    <div className="weather-greeting-fade-in" aria-hidden="true">
      <svg
        viewBox="0 0 200 80"
        width={200}
        height={80}
        className="overflow-visible"
      >
        {/* Arc path (dashed, subtle) */}
        <path
          d="M 16 72 A 84 60 0 0 1 184 72"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 4"
          className="text-muted-foreground/20"
        />

        {/* Horizon line */}
        <line
          x1={10}
          y1={72}
          x2={190}
          y2={72}
          stroke="currentColor"
          strokeWidth={1}
          className="text-muted-foreground/15"
        />

        {/* Sun or Moon */}
        {pos.isDay ? (
          <g
            transform={`translate(${pos.x}, ${pos.y})`}
            className="transition-transform duration-[60s] ease-linear"
          >
            {/* Glow */}
            <circle r={14} fill="oklch(0.85 0.15 85 / 0.2)" />
            {/* Sun body */}
            <circle r={7} fill="oklch(0.85 0.16 85)" />
            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1={0}
                y1={0}
                x2={0}
                y2={-12}
                stroke="oklch(0.85 0.16 85)"
                strokeWidth={1.5}
                strokeLinecap="round"
                transform={`rotate(${angle})`}
                style={{ opacity: 0.5 }}
              />
            ))}
          </g>
        ) : (
          <g
            transform={`translate(${pos.x}, ${pos.y})`}
            className="transition-transform duration-[60s] ease-linear"
          >
            {/* Moon glow */}
            <circle r={12} fill="oklch(0.9 0.03 220 / 0.15)" />
            {/* Moon body */}
            <circle r={7} fill="oklch(0.9 0.03 250)" />
            {/* Crescent shadow */}
            <circle r={6} cx={3} cy={-2} fill="oklch(0.15 0.02 250)" />
          </g>
        )}

        {/* Labels */}
        <text
          x={16}
          y={72}
          dy={12}
          fontSize={8}
          fill="currentColor"
          className="text-muted-foreground/40"
          textAnchor="middle"
        >
          rise
        </text>
        <text
          x={184}
          y={72}
          dy={12}
          fontSize={8}
          fill="currentColor"
          className="text-muted-foreground/40"
          textAnchor="middle"
        >
          set
        </text>
      </svg>
    </div>
  );
}
