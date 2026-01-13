# Sunny Chen - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design with neon green accents and dark mode support.

## Features

- **Modern Design**: Clean, professional layout with neon green (#22c55e) accent colors
- **Dark Mode**: Pure black (#000000) background with automatic dark mode detection
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Built with Next.js 15 for optimal performance
- **Type-Safe**: Written in TypeScript for better code quality
- **Reusable Components**: Modular component architecture

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KyunSC/my_portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
my-portfolio/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main homepage
├── components/
│   └── Project.tsx      # Reusable project card component
└── public/              # Static assets
```

## Customization

### Colors

The accent color can be easily changed in all files by replacing:
- Primary: `#22c55e` (green)
- Hover: `#00ff00` (neon green)

### Content

Update your personal information in:
- `app/page.tsx` - Main content (name, bio, skills, projects, contact)
- `app/layout.tsx` - Page title and meta description

### Adding Projects

Use the `Project` component to add new projects:

```tsx
<Project
  title="Your Project Name"
  description="Project description here"
  tags={["React", "TypeScript", "Next.js"]}
  link="https://github.com/username/project" // optional
/>
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KyunSC/my_portfolio)

Or deploy to other platforms:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

- **Email**: exsunnychen2006@gmail.com
- **GitHub**: [@KyunSC](https://github.com/KyunSC)
- **LinkedIn**: [Sunny Chen](https://www.linkedin.com/in/sunny-chen-software/)

---

Built with ❤️ by Sunny Chen
