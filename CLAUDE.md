# Portfolio Project — CLAUDE.md

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5.9** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + **shadcn/ui** (New York style, CSS variables)
- **Framer Motion** for animations, **Lucide React** + **React Icons** for icons
- **Vercel Analytics**, **Critters** (critical CSS)

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run start    # Start prod server
npm run lint     # ESLint
```

## Project Structure

```
app/
├── page.tsx              # Home — single-page portfolio
├── layout.tsx            # Root layout (metadata, fonts, providers)
├── globals.css           # Theme colors, dark mode, CSS variables
└── api/weather/route.ts  # Weather API (Open-Meteo, Montreal, 10min cache)

components/
├── HeroSection.tsx       # Landing hero (server-rendered + CSS animations)
├── HeroAnimations.tsx    # Staggered button entrance animations
├── TerminalBio.tsx       # Interactive terminal with typewriter effect (client)
├── LazyTerminalBio.tsx   # Dynamic import wrapper for TerminalBio
├── WeatherProvider.tsx   # React Context for weather data (client)
├── WeatherGreeting.tsx   # Dynamic greeting based on weather
├── SunPosition.tsx       # Sun arc visualization (sunrise/sunset)
├── Nav.tsx               # Sticky navbar with scroll detection + active section
├── MotionSection.tsx     # Reusable framer-motion section wrapper
├── Project.tsx           # Project card
├── ProjectTabs.tsx       # Tabbed project gallery (completed/in-progress)
├── SectionHeading.tsx    # Section title with decorative prefix/highlight
├── SkillIcon.tsx         # Skill icon with tooltip
├── StatCard.tsx          # Statistics card
└── ui/                   # shadcn/ui primitives (badge, button, card, tabs, etc.)

lib/
├── motion.ts             # Framer Motion variants & transitions (fadeUp, fadeIn, stagger)
└── utils.ts              # cn() — clsx + tailwind-merge
```

## Page Sections (in order)

1. Hero — welcome banner, lazy terminal, sun arc
2. About — bio + 3 stat cards
3. Skills — 3 categories (Frontend, Backend, Tools) with tech icons
4. Projects — tabbed gallery (completed / in-progress)
5. Contact — email, GitHub, LinkedIn
6. Footer

## Key Patterns

- **Weather**: API route (`/api/weather`) fetches Open-Meteo for Montreal (45.5017, -73.5673), cached 10min. Client-side Context provider.
- **Animations**: CSS keyframes for hero (no JS overhead), Framer Motion for everything else. Reusable variants in `lib/motion.ts`.
- **Performance**: `next/dynamic` lazy loading for heavy components (ProjectTabs, StatCard, SkillIcon). Package import optimization in `next.config.ts` for lucide-react, react-icons, framer-motion.
- **Styling**: `cn()` utility merges Tailwind classes. Dark mode with green accent theme. All colors via CSS variables.
- **Path alias**: `@/*` maps to project root.

## Conventions

- shadcn/ui components live in `components/ui/` — don't manually edit these
- Client components are marked with `"use client"` at top
- Server components are the default
- Single-page app — all content in `app/page.tsx`
