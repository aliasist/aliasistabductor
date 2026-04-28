# Aliasist suite (local workspace)

These folders are **separate git repositories** cloned next to the [aliasistabductor](https://github.com/aliasist/aliasistabductor) marketing site and **Files Abductor** desktop app (`../app/`). They are listed in `.gitignore` at the repo root so they are not committed into the homepage project.

| Folder | Product | Live (typical) | Upstream repo |
|--------|---------|----------------|---------------|
| `datasist` | DataSist — data center intelligence | [datasist-frontend.pages.dev](https://datasist-frontend.pages.dev) | [aliasist/datasist](https://github.com/aliasist/datasist) |
| `datasist-api` | DataSist API (Worker) | (Cloudflare) | [aliasist/datasist-api](https://github.com/aliasist/datasist-api) |
| `spacesist` | SpaceSist | [space.aliasist.com](https://space.aliasist.com) | [aliasist/space-asist](https://github.com/aliasist/space-asist) |
| `pulsesist` | PulseSist — markets | [pulse.aliasist.com](https://pulse.aliasist.com) | [aliasist/stockmarket](https://github.com/aliasist/stockmarket) |
| `aliasist-auth` | Suite auth portal | [auth.aliasist.com](https://auth.aliasist.com) | [aliasist/aliasist-auth](https://github.com/aliasist/aliasist-auth) |
| `llm-chat` | LLM / contact worker | (Worker) | [aliasist/llm-chat](https://github.com/aliasist/llm-chat) |
| `news-worker` | News feed for the homepage | (Worker) | [aliasist/news-worker](https://github.com/aliasist/news-worker) |
| `tikasist` | TikaSist | [tikasist.pages.dev](https://tikasist.pages.dev) | *No standalone repo — see `tikasist/README.md`* |
| `ecosist` | EcoSist | (Pages / dev) | [aliasist/ecosist](https://github.com/aliasist/ecosist) |
| `chatroom` | Durable chat (Workers) | (deployed Worker) | [aliasist/chatroom](https://github.com/aliasist/chatroom) |
| `phoenix-image-worker` | Image generation Worker | (Worker) | [aliasist/phoenix-image-worker](https://github.com/aliasist/phoenix-image-worker) |
| `pulse` | Legacy desktop / finance experiments | — | [aliasist/pulse](https://github.com/aliasist/pulse) |
| `swot` | JetBrains `swot` domain list (education licenses) | — | [aliasist/swot](https://github.com/aliasist/swot) |

## Quick start (per app)

```bash
# Example: DataSist (Express + Vite + SQLite)
cd datasist && npm install && npm run dev
# default http://localhost:5000

# Example: SpaceSist
cd ../spacesist && npm install && npm run dev

# Example: PulseSist
cd ../pulsesist && npm install && npm run dev
```

Workers (`datasist-api`, `llm-chat`, `news-worker`, etc.) use Wrangler; see each folder’s README and `.env.example` / `.dev.vars.example`.

## vNext hub

The unified **aliasist-platform** monorepo is separate from this layout and is not checked in under `apps/`.
