import { NextResponse } from "next/server";

// Montreal coordinates
const LAT = 45.5017;
const LON = -73.5673;

// WMO weather codes → description + isSunny
const WEATHER_MAP: Record<number, { description: string; isSunny: boolean }> = {
  0: { description: "Clear sky", isSunny: true },
  1: { description: "Mainly clear", isSunny: true },
  2: { description: "Partly cloudy", isSunny: false },
  3: { description: "Overcast", isSunny: false },
  45: { description: "Foggy", isSunny: false },
  48: { description: "Depositing rime fog", isSunny: false },
  51: { description: "Light drizzle", isSunny: false },
  53: { description: "Moderate drizzle", isSunny: false },
  55: { description: "Dense drizzle", isSunny: false },
  56: { description: "Freezing drizzle", isSunny: false },
  57: { description: "Heavy freezing drizzle", isSunny: false },
  61: { description: "Slight rain", isSunny: false },
  63: { description: "Moderate rain", isSunny: false },
  65: { description: "Heavy rain", isSunny: false },
  66: { description: "Freezing rain", isSunny: false },
  67: { description: "Heavy freezing rain", isSunny: false },
  71: { description: "Slight snowfall", isSunny: false },
  73: { description: "Moderate snowfall", isSunny: false },
  75: { description: "Heavy snowfall", isSunny: false },
  77: { description: "Snow grains", isSunny: false },
  80: { description: "Slight rain showers", isSunny: false },
  81: { description: "Moderate rain showers", isSunny: false },
  82: { description: "Violent rain showers", isSunny: false },
  85: { description: "Slight snow showers", isSunny: false },
  86: { description: "Heavy snow showers", isSunny: false },
  95: { description: "Thunderstorm", isSunny: false },
  96: { description: "Thunderstorm with slight hail", isSunny: false },
  99: { description: "Thunderstorm with heavy hail", isSunny: false },
};

export async function GET() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code`,
      { next: { revalidate: 600 } } // cache for 10 minutes
    );

    if (!res.ok) throw new Error("Weather API failed");

    const data = await res.json();
    const code: number = data.current.weather_code;
    const temp: number = Math.round(data.current.temperature_2m);
    const weather = WEATHER_MAP[code] ?? { description: "Unknown", isSunny: false };

    return NextResponse.json({
      temperature: temp,
      description: weather.description,
      isSunny: weather.isSunny,
      weatherCode: code,
    });
  } catch {
    return NextResponse.json(
      { temperature: null, description: "Unavailable", isSunny: null, weatherCode: null },
      { status: 500 }
    );
  }
}
