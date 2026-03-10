"use client";

import { useWeather } from "@/components/WeatherProvider";

export default function WeatherGreeting() {
  const { weather } = useWeather();

  if (!weather || weather.isSunny === null) {
    return <>I like building.</>;
  }

  if (weather.isSunny) {
    return <>It&apos;s Sunny outside... and on this website.</>;
  }

  return <>It may not be sunny outside, but it&apos;s always Sunny here.</>;
}
