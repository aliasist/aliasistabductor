# 🛸 Aliasist Abductor

![GitHub Repo Size](https://img.shields.io/github/repo-size/aliasist/aliasistabductor?color=blueviolet)
![GitHub Top Language](https://img.shields.io/github/languages/top/aliasist/aliasistabductor?color=blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite)

**Aliasist Abductor** is a high-performance media utility...

# 👽 Aliasist Files Abductor (v3.0) (debugged) 

A slick little **Electron** desktop app that “abducts” files from URLs across the interwebs — including streaming targets routed through **yt-dlp**. (YouTube) Please use responsibly.

Built with a custom animated splash screen, a custom draggable title bar, download progress tracking, and a healthy amount of alien humor.

---

## Features

Future projects will share the 'extraterrastial' vibe. I'll try to keep the cringe low. ^^

- 🛸 **Direct file downloads** (HTTP/HTTPS)
- 🎬 **Streaming downloads** (YouTube + many other platforms) via `yt-dlp`
- 📈 **Progress bar + speed + size reporting**
- 📁 **Choose landing zone** (Save As dialog)
- 🚨 **Eject / Abort download**
- 🪟 **Custom title bar** (minimize / maximize / close)
- 🌌 **Alien-themed UI + rotating jokes**
- ✅ **Safe renderer security model**
  - `contextIsolation: true`
  - `nodeIntegration: false`
  - IPC via a `preload.js` bridge

---

## Screenshots

Add screenshots in this folder so users can preview the app:
- `assets/screenshots/splash.png`
- `assets/screenshots/app.png`

![Splash](assets/screenshots/splash.png)
![App](assets/screenshots/app.png)

---

## Requirements

### For running locally
- **Node.js** (LTS recommended)
- **npm**
- **Electron** (installed via `npm install`)

### For streaming downloads (YouTube, etc.)
Your system must have:

- **Python 3** available as `python`
- **yt-dlp** installed  
  ```bash
  pip install -U yt-dlp
  ```
- A supported **JavaScript runtime** for yt-dlp (recommended: **Deno**)  
  ```powershell
  irm https://deno.land/install.ps1 | iex
  ```
- **ffmpeg** (required for merging bestvideo+bestaudio into mp4)  
  - Download: https://www.gyan.dev/ffmpeg/builds/
  - Ensure `ffmpeg` is on PATH:
    ```bash
    ffmpeg -version
    ```

If these aren’t installed, direct downloads will still work — only streaming targets may fail.

---

## Install & Run (Development)

```bash
npm install
npm start
```

---

## Build (Windows)

This project uses **electron-builder**.

```bash
npm run build
```

Output will be in:

- `dist/`
  - NSIS installer: `Aliasist Files Abductor Setup x.y.z.exe`
  - unpacked build: `dist/win-unpacked/`

### Common Windows Build Issue (symlink privileges)

If you see:

> `Cannot create symbolic link : A required privilege is not held by the client`

Fix by either:
- running your terminal as **Administrator**, or
- enabling **Windows Developer Mode**.

---

## Project Structure

- `main.js` — Electron main process (window + download logic)
- `preload.js` — secure IPC bridge (`window.aliasist.*`)
- `renderer.js` — UI logic, progress updates, jokes
- `index.html` — UI markup (splash + main panel)
- `style.css` — alien theme styling
- `assets/` — icons + optional screenshots

---

## Disclaimer

⚠️ Only download/abduct content you are authorized to access.  
You are responsible for complying with local laws, platform rules, and copyright.

---

## License

MIT — do what you want, just don’t blame the mothership.

---

## Author

**dev_aliasist** 
Website: https://www.aliasist.com created by Blake Hooper 