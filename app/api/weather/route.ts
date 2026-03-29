import { NextResponse } from "next/server";

// Montreal fallback coordinates
const DEFAULT_LAT = 45.5017;
const DEFAULT_LON = -73.5673;
const DEFAULT_CITY = "Montreal";

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

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: { "User-Agent": "sunny-chen-portfolio/1.0 (https://sunnychen.dev)" },
        next: { revalidate: 86400 }, // city name cached for 24h
      }
    );
    if (!res.ok) return "Your location";
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      "Your location"
    );
  } catch {
    return "Your location";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawLat = searchParams.get("lat");
  const rawLon = searchParams.get("lon");

  const hasCustomCoords = rawLat !== null && rawLon !== null;
  const lat = hasCustomCoords ? parseFloat(rawLat) : DEFAULT_LAT;
  const lon = hasCustomCoords ? parseFloat(rawLon) : DEFAULT_LON;

  if (hasCustomCoords && (isNaN(lat) || isNaN(lon))) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  const timezone = hasCustomCoords ? "auto" : "America/Montreal";

  try {
    const [weatherRes, city] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=${timezone}&forecast_days=1`,
        { next: { revalidate: 600 } }
      ),
      hasCustomCoords ? reverseGeocode(lat, lon) : Promise.resolve(DEFAULT_CITY),
    ]);

    if (!weatherRes.ok) throw new Error("Weather API failed");

    const data = await weatherRes.json();
    const code: number = data.current.weather_code;
    const temp: number = Math.round(data.current.temperature_2m);
    const weather = WEATHER_MAP[code] ?? { description: "Unknown", isSunny: false };

    return NextResponse.json({
      temperature: temp,
      description: weather.description,
      isSunny: weather.isSunny,
      weatherCode: code,
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
      city,
    });
  } catch {
    return NextResponse.json(
      { temperature: null, description: "Unavailable", isSunny: null, weatherCode: null, city: null },
      { status: 500 }
    );
  }
}
