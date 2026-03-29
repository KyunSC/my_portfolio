"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface WeatherData {
  temperature: number | null;
  description: string;
  isSunny: boolean | null;
  weatherCode: number | null;
  sunrise: string | null;
  sunset: string | null;
  city: string | null;
}

type WeatherCategory = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | null;

interface WeatherContextValue {
  weather: WeatherData | null;
  category: WeatherCategory;
}

const WeatherContext = createContext<WeatherContextValue>({ weather: null, category: null });

export function useWeather() {
  return useContext(WeatherContext);
}

function getCategory(code: number | null): WeatherCategory {
  if (code === null) return null;
  if (code <= 1) return "sunny";
  if (code <= 3 || (code >= 45 && code <= 48)) return "cloudy";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rainy";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snowy";
  if (code >= 95) return "stormy";
  return "cloudy";
}

const FALLBACK: WeatherData = {
  temperature: null,
  description: "Unavailable",
  isSunny: null,
  weatherCode: null,
  sunrise: null,
  sunset: null,
  city: null,
};

function fetchWeather(lat?: number, lon?: number): Promise<WeatherData> {
  const url =
    lat !== undefined && lon !== undefined
      ? `/api/weather?lat=${lat}&lon=${lon}`
      : "/api/weather";
  return fetch(url)
    .then((r) => r.json())
    .catch(() => FALLBACK);
}

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const category = getCategory(weather?.weatherCode ?? null);

  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) {
      fetchWeather().then(setWeather);
      return;
    }

    // Only use geolocation if already granted — never show a permission popup
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude).then(setWeather),
          () => fetchWeather().then(setWeather)
        );
      } else {
        fetchWeather().then(setWeather);
      }
    }).catch(() => fetchWeather().then(setWeather));
  }, []);

  // Apply weather category as a data attribute on <html> for CSS targeting
  useEffect(() => {
    if (category) {
      document.documentElement.setAttribute("data-weather", category);
    }
    return () => {
      document.documentElement.removeAttribute("data-weather");
    };
  }, [category]);

  return (
    <WeatherContext.Provider value={{ weather, category }}>
      {children}
    </WeatherContext.Provider>
  );
}
