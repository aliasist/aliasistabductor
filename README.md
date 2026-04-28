# Aliasist.com

> **Adversarial by Nature. Defensive by Design.**

The main portfolio and project hub for [aliasist.com](https://aliasist.com) — built by Blake, an AI security developer and CS student.

**→ [REPO_LAYOUT.md](./REPO_LAYOUT.md)** — quick map of folders/branches after refactors (read this when something “moved”).

## Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v3 + shadcn/ui
- **Animation:** Framer Motion
- **Fonts:** Space Grotesk + JetBrains Mono
- **AI Chat:** Groq LLaMA 3.3 via [llm-chat](https://github.com/aliasist/llm-chat) Worker
- **Hosting:** Cloudflare Pages (auto-deploy on push to `master`)

## The Aliasist Suite

| App | Repo | Live |
|-----|------|------|
| **aliasist.com** | [aliasistabductor](https://github.com/aliasist/aliasistabductor) | [aliasist.com](https://aliasist.com) |
| **DataSist** | [datasist](https://github.com/aliasist/datasist) | [datasist-frontend.pages.dev](https://datasist-frontend.pages.dev) |
| **DataSist API** | [datasist-api](https://github.com/aliasist/datasist-api) | Cloudflare Worker |
| **PulseSist** | [stockmarket](https://github.com/aliasist/stockmarket) | [pulse.aliasist.com](https://pulse.aliasist.com) |
| **AI Chat** | [llm-chat](https://github.com/aliasist/llm-chat) | [assistant.aliasist.com](https://assistant.aliasist.com) |

## Features

- 🛸 **Alien Eye Hero** — cursor-tracking iris with live animation
- ⭐ **Starfield background** — 180 procedurally animated stars
- 🔊 **Sound engine** — subtle Web Audio API tones on interaction
- 🤖 **Groq AI chat** — Aliasist-aware assistant via 🛸 widget
- 🌑 **Dark-first theme** — teal-green `#00C97B` accent palette
- 📜 **Scroll progress bar** — teal glow at top of viewport
- 🔒 **Classified project cards** — PROJECT CIPHER + PROJECT SPECTER

## Branches

- **`backup/aliasist-files-abductor-restored`** — full **homepage + `app/` Files Abductor** tree; this is the branch used for recent cleanup and **`src/content/homepage.ts`**. Use it for day-to-day work unless you are merging deliberately.
- **`master`** — **has diverged** (e.g. EcoSist/storm experiments; some paths removed on that line). Do not assume it matches your local full site until you merge or cherry-pick intentionally. Cloudflare Pages may still track `master`; align deploy branch with whichever tree you want live.

## Local Development

```bash
git clone https://github.com/aliasist/aliasistabductor
cd aliasistabductor
git checkout backup/aliasist-files-abductor-restored   # full site + app/
npm install --legacy-peer-deps
npm run dev
```

## Deploy

Configure Cloudflare Pages to the branch you treat as production (`master` vs `backup/...`). Pushes to the connected branch trigger deploys.

## Brand

- **Logo:** Alien head with Saturn rings
- **Mascot:** UFO spaceship
- **Theme:** Roswell 1947 × AI Security
- **Contact:** dev@aliasist.com
