# Where everything lives (aliasistabductor)

Use this file when you forget what moved after a fast refactor. **The complete marketing site + Files Abductor app are on branch `backup/aliasist-files-abductor-restored`** (pushed to GitHub). `origin/master` has **diverged** (EcoSist / storm experiments and deletes); treat it as a separate line until you deliberately reconcile.

## Top level

| Path | Purpose |
|------|---------|
| `src/` | Vite + React **marketing site** (aliasist.com homepage) |
| `app/` | **Aliasist Files Abductor** — Electron/desktop app (`package.json` name `aliasist-files-abductor`) |
| `apps/` | **Suite clones** — separate git repos (DataSist, workers, etc.); see `apps/README.md` |
| `images/` | Shared raster/SVG assets referenced via `@images/...` in Vite |
| `public/` | Static files served as-is |
| `index.html` | Vite entry |
| `vite.config.ts` | Aliases: `@` → `src/`, `@images` → `images/` |

## Marketing site (`src/`)

| Path | Purpose |
|------|---------|
| `src/main.tsx` | React bootstrap, Clerk, Sentry |
| `src/App.tsx` | Routes / app shell |
| `src/pages/Index.tsx` | Main landing page composition |
| `src/pages/NotFound.tsx` | 404 |
| `src/content/homepage.ts` | **Copy, suite links, projects, contact API URLs** — edit here for most text/nav changes |
| `src/components/HeroSection.tsx` | Hero + AlienEye area |
| `src/components/AlienEye.tsx` | Cursor-tracking eye |
| `src/components/Navbar.tsx` | Nav + suite dropdown |
| `src/components/AboutSection.tsx` | About |
| `src/components/ProjectsSection.tsx` | Project cards |
| `src/components/TransmissionsSection.tsx` | Blog / news feed UI |
| `src/components/ContactSection.tsx` | Contact form |
| `src/components/Footer.tsx` | Footer |
| `src/components/AliasistChat.tsx` | Chat widget |
| `src/components/ui/*` | shadcn-style primitives |
| `src/hooks/useSound.ts` | UI sounds |
| `src/assets/` | Bundled assets (e.g. `mascot.svg`, logo SVGs) |

## Desktop app

| Path | Purpose |
|------|---------|
| `app/` | Files Abductor — own `package.json`; build/release separate from homepage |

## Suite apps (not part of this git repo)

Everything under `apps/*` is **ignored** here except `apps/README.md` and `apps/tikasist/`. Each subdirectory is its own GitHub repository; see **`apps/README.md`** for names → repos → live URLs.

## Common tasks

- **Change marketing copy or suite links:** `src/content/homepage.ts`
- **Change hero / eye:** `HeroSection.tsx`, `AlienEye.tsx`
- **Change nav:** `Navbar.tsx` (+ `homepage.ts` for link lists)
- **Run homepage:** `npm install` → `npm run dev` (repo root)
- **Run Files Abductor:** `cd app` → follow that `package.json` scripts
