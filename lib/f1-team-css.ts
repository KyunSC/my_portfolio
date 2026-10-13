import { F1_TEAMS, type F1Team, type Oklch } from "@/lib/f1-teams";

// Per-team raw --team-* tokens, generated from F1_TEAMS so the colours have one
// source. They are inert outside the F1 theme (app/globals.css maps them onto
// the theme tokens). Surfaces borrow the light accent's hue; capping chroma
// keeps achromatic teams neutral. Plain oklch() only, no relative colour
// syntax, so browsers without it still get valid borders and backgrounds.

const round = (n: number) => Math.round(n * 1e4) / 1e4;

function oklch([l, c, h]: Oklch, alpha?: number) {
  return `oklch(${round(l)} ${round(c)} ${round(h)}${alpha === undefined ? "" : ` / ${alpha}%`})`;
}

/** The accent's hue at a new lightness, with chroma capped at `maxC`. */
function tint([, c, h]: Oklch, l: number, maxC: number) {
  return oklch([l, Math.min(c, maxC), h]);
}

function teamTokens({ accent: { light, dark } }: F1Team) {
  return {
    "--team-light": oklch(light),
    "--team-dark": oklch(dark),
    "--team-bg": tint(light, 0.985, 0.006),
    "--team-card": tint(light, 0.995, 0.004),
    "--team-secondary": tint(light, 0.955, 0.014),
    "--team-border": tint(light, 0.9, 0.02),
    "--team-muted-fg": tint(light, 0.5, 0.02),
    "--team-bg-dark": tint(light, 0.13, 0.015),
    "--team-card-dark": tint(light, 0.17, 0.02),
    "--team-secondary-dark": tint(light, 0.24, 0.025),
    "--team-border-dark": oklch(dark, 18),
    "--team-input-dark": oklch(dark, 22),
    "--team-muted-fg-dark": tint(light, 0.72, 0.02),
    "--team-frame-bg": tint(light, 0.12, 0.02),
    "--team-frame-border": oklch(dark, 30),
  };
}

function rule(selector: string, team: F1Team) {
  const body = Object.entries(teamTokens(team))
    .map(([name, value]) => `${name}:${value}`)
    .join(";");
  return `${selector}{${body}}`;
}

// The first team is the default and the fallback for unknown ids, matching findF1Team.
const [defaultTeam, ...otherTeams] = F1_TEAMS;

export const f1TeamCss = [
  rule(":root", defaultTeam),
  ...otherTeams.map((team) => rule(`:root[data-f1-team="${team.id}"]`, team)),
].join("\n");
