"use client";

import { useWeather } from "@/components/WeatherProvider";

export default function WeatherGreeting() {
  const { weather } = useWeather();

  if (!weather || weather.isSunny === null) return null;

  const city = weather.city ?? "Montreal";
  const text = weather.isSunny
    ? `It's Sunny in ${city}... and on this website.`
    : `It may not be sunny in ${city}, but it's always Sunny here.`;

  return (
    <span className="weather-greeting-fade-in block mt-1 text-base italic text-muted-foreground/70">
      {text}
    </span>
  );
}
