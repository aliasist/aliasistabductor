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

## Branch

- **`master`** — canonical branch: **homepage + `app/` Files Abductor** + `apps/` workspace docs. Day-to-day work happens here.
- **`backup/aliasist-files-abductor-restored`** — kept in sync with the same commits for now; you can delete it on GitHub later if you only want `master`.
- **Recovery:** the previous `master` tip (EcoSist/storm line) is saved as git tag **`archive/master-pre-align-20260428`**.

## Local Development

```bash
git clone https://github.com/aliasist/aliasistabductor
cd aliasistabductor
npm install --legacy-peer-deps
npm run dev
```

## Deploy

Point Cloudflare Pages at **`master`**; pushes to `master` trigger deploys.

## Brand

- **Logo:** Alien head with Saturn rings
- **Mascot:** UFO spaceship
- **Theme:** Roswell 1947 × AI Security
- **Contact:** dev@aliasist.com
