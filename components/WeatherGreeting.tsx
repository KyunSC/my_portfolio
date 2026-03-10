"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number | null;
  description: string;
  isSunny: boolean | null;
}

export default function WeatherGreeting() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then(setWeather)
      .catch(() => {});
  }, []);

  if (!weather || weather.isSunny === null) {
    return <>I like building.</>;
  }

  if (weather.isSunny) {
    return <>It&apos;s Sunny outside... and on this website.</>;
  }

  return <>It may not be sunny outside, but it&apos;s always Sunny here.</>;
}
