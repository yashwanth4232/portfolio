# Portfolio

Personal developer portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000
```

---

## Installation (fresh machine)

### Prerequisites
- Node.js **18.18+** (LTS recommended: 20.x or 22.x)
- npm 9+ or pnpm 9+

### Step-by-step

```bash
# Clone and enter the project
git clone https://github.com/yourname/portfolio.git
cd portfolio

# Install all dependencies
npm install

# Start dev server
npm run dev
```

### All dependencies installed

| Package | Purpose |
|---|---|
| `next@15` | App Router, SSR, image optimisation |
| `react@19` | UI library |
| `framer-motion@11` | Scroll reveals, page transitions, hover states |
| `gsap@3` | Parallax, magnetic cursor, complex sequencing |
| `@react-three/fiber@8` | React renderer for Three.js |
| `@react-three/drei@9` | R3F helpers (OrbitControls, Environment, etc.) |
| `three@0.170` | 3D engine |
| `lenis@1` | Smooth scroll (synced with GSAP ScrollTrigger) |

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run type-check` | TypeScript type check (no emit) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, metadata)
│   ├── page.tsx            ← Main portfolio page
│   └── work/[slug]/        ← Optional case study pages
│
├── components/
│   ├── ui/                 ← Atoms: RevealOnScroll, SectionLabel, Badge
│   ├── sections/           ← Hero, About, Work, Stack, Experience, Contact
│   ├── three/              ← HeroCanvas (lazy-loaded R3F scene)
│   └── layout/             ← Nav, Footer
│
├── hooks/
│   ├── useReducedMotion.ts ← Gate animations behind OS preference
│   ├── useScrollProgress.ts
│   ├── useCursorMagnetic.ts
│   └── useLenis.ts         ← Smooth scroll initialiser
│
├── lib/
│   ├── motion.ts           ← Shared Framer Motion variants + easings
│   ├── gsap.ts             ← GSAP plugin registration
│   └── utils.ts            ← cn(), splitChars(), lerp(), etc.
│
├── data/
│   ├── projects.ts         ← Your projects — edit this
│   ├── experience.ts       ← Your work history — edit this
│   └── skills.ts           ← Your tech stack — edit this
│
├── styles/
│   └── globals.css         ← Design tokens, base reset, utilities
│
└── types/
    └── index.ts            ← Shared TypeScript interfaces
```

---

## Customisation

### 1. Your content
Edit `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`.

### 2. Design tokens
Edit CSS custom properties in `src/styles/globals.css`. The key ones:
```css
--color-accent: #7c6aff;   /* Change to your accent colour */
--font-display: "Syne";    /* Change display font */
--font-body: "DM Sans";    /* Change body font */
```

### 3. Fonts
Fonts are loaded via `next/font/google` in `src/app/layout.tsx`. To change:
```ts
import { YourFont } from "next/font/google";
const fontDisplay = YourFont({ subsets: ["latin"], variable: "--font-display" });
```

### 4. Metadata
Update `src/app/layout.tsx` — find the `metadata` export and fill in your name, description, domain, Twitter handle, and OG image.

---

## 3D Canvas

`HeroCanvas` is lazy-loaded to avoid SSR issues:
```ts
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas"),
  { ssr: false, loading: () => null }
);
```

**Performance settings enforced:**
- `frameloop="demand"` — only re-renders on interaction
- `dpr={[1, 1.5]}` — caps device pixel ratio
- Canvas disabled on mobile (check `isTouchDevice()` from `lib/utils.ts`)

---

## Performance Checklist

Before deploying:

- [ ] Add real project images to `/public/projects/` and update `data/projects.ts`
- [ ] Create `public/og-image.jpg` (1200×630)
- [ ] Update metadata in `layout.tsx`
- [ ] Run `npm run build` and check for errors
- [ ] Run Lighthouse — target 90+ performance score
- [ ] Test on mobile — canvas should be hidden, layout single-column
- [ ] Test with `prefers-reduced-motion: reduce` — no animations should fire

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at vercel.com/new.

**Environment variables:** None required for the base setup. Add any you need in the Vercel dashboard.
