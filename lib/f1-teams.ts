/** OKLCH lightness, chroma, hue. */
export type Oklch = readonly [l: number, c: number, h: number];

type F1TeamSpec = {
  id: string;
  name: string;
  color: string;
  image: string;
  /** UI accent per colour scheme, tuned for ≥4.5:1 on the tinted background (see lib/f1-team-css.ts). */
  accent: { light: Oklch; dark: Oklch };
};

export const F1_TEAMS = [
  {
    id: "red-bull", name: "Red Bull Racing", color: "#3671c6", image: "/images/red-bull-racing.webp",
    accent: { light: [0.55, 0.146, 258], dark: [0.6, 0.146, 258] },
  },
  {
    id: "ferrari", name: "Ferrari", color: "#ef343e", image: "/images/f1/ferrari.webp",
    accent: { light: [0.58, 0.221, 24], dark: [0.62, 0.221, 24] },
  },
  {
    id: "mclaren", name: "McLaren", color: "#ff8700", image: "/images/f1/mclaren.webp",
    accent: { light: [0.56, 0.182, 56], dark: [0.74, 0.182, 56] },
  },
  {
    id: "mercedes", name: "Mercedes", color: "#27f4d2", image: "/images/f1/mercedes.webp",
    accent: { light: [0.51, 0.155, 177], dark: [0.87, 0.155, 177] },
  },
  {
    id: "aston-martin", name: "Aston Martin", color: "#229971", image: "/images/f1/aston-martin.webp",
    accent: { light: [0.53, 0.119, 165], dark: [0.61, 0.119, 165] },
  },
  {
    id: "alpine", name: "Alpine", color: "#f282b4", image: "/images/f1/alpine.webp",
    accent: { light: [0.57, 0.147, 353], dark: [0.74, 0.147, 353] },
  },
  {
    id: "williams", name: "Williams", color: "#4584ff", image: "/images/f1/williams.webp",
    accent: { light: [0.56, 0.195, 262], dark: [0.64, 0.195, 262] },
  },
  {
    id: "racing-bulls", name: "Racing Bulls", color: "#a5baff", image: "/images/f1/racing-bulls.webp",
    accent: { light: [0.55, 0.101, 271], dark: [0.8, 0.101, 271] },
  },
  {
    id: "haas", name: "Haas", color: "#eeeeee", image: "/images/f1/haas.webp",
    // Near-white livery, so the accent uses the red secondary colour.
    accent: { light: [0.58, 0.236, 24], dark: [0.62, 0.236, 24] },
  },
  {
    id: "audi", name: "Audi", color: "#ff5038", image: "/images/f1/audi.webp",
    accent: { light: [0.57, 0.215, 31], dark: [0.67, 0.215, 31] },
  },
  {
    id: "cadillac", name: "Cadillac", color: "#c6c6c6", image: "/images/f1/cadillac.webp",
    // Near-white livery, so the accent uses the black/silver secondary colours.
    accent: { light: [0.25, 0, 0], dark: [0.83, 0, 0] },
  },
] as const satisfies readonly F1TeamSpec[];

export type F1Team = (typeof F1_TEAMS)[number];
export type F1TeamId = F1Team["id"];

export function findF1Team(id: string | null): F1Team {
  return F1_TEAMS.find((team) => team.id === id) ?? F1_TEAMS[0];
}
