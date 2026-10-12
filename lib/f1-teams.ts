export const F1_TEAMS = [
  { id: "red-bull", name: "Red Bull Racing", color: "#3671c6", image: "/images/red-bull-racing.webp" },
  { id: "ferrari", name: "Ferrari", color: "#ef343e", image: "/images/f1/ferrari.webp" },
  { id: "mclaren", name: "McLaren", color: "#ff8700", image: "/images/f1/mclaren.webp" },
  { id: "mercedes", name: "Mercedes", color: "#27f4d2", image: "/images/f1/mercedes.webp" },
  { id: "aston-martin", name: "Aston Martin", color: "#229971", image: "/images/f1/aston-martin.webp" },
  { id: "alpine", name: "Alpine", color: "#f282b4", image: "/images/f1/alpine.webp" },
  { id: "williams", name: "Williams", color: "#4584ff", image: "/images/f1/williams.webp" },
  { id: "racing-bulls", name: "Racing Bulls", color: "#a5baff", image: "/images/f1/racing-bulls.webp" },
  { id: "haas", name: "Haas", color: "#eeeeee", image: "/images/f1/haas.webp" },
  { id: "audi", name: "Audi", color: "#ff5038", image: "/images/f1/audi.webp" },
  { id: "cadillac", name: "Cadillac", color: "#c6c6c6", image: "/images/f1/cadillac.webp" },
] as const;

export type F1Team = (typeof F1_TEAMS)[number];
export type F1TeamId = F1Team["id"];

export function findF1Team(id: string | null): F1Team {
  return F1_TEAMS.find((team) => team.id === id) ?? F1_TEAMS[0];
}
