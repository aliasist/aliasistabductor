# AliasistAbductor

> A free, open-source direct file downloader built with [Electron](https://www.electronjs.org/).

![License: MIT](https://img.shields.io/badge/License-MIT-6c63ff.svg)
![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-47848f.svg)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

---

## ✨ Features

- 📥 **Direct file downloading** — paste any HTTP/HTTPS URL and download instantly
- 📂 **Custom save location** — choose exactly where files are saved with a folder browser
- 📊 **Real-time progress** — live progress bar with download speed and size tracking
- 🎨 **Dark UI** — clean, modern dark interface
- 🔒 **Secure** — context isolation enabled, no `nodeIntegration` in renderer

---

## 🖥️ Screenshots

| Main Window |
|-------------|
| ![AliasistAbductor UI](https://via.placeholder.com/720x450/0d0d1a/6c63ff?text=AliasistAbductor) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/aliasist/aliasistabductor.git
cd aliasistabductor

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

### Building for Distribution

```bash
npm run build
```

Output binaries will be placed in the `dist/` folder.

---

## 🗂️ Project Structure

```
aliasistabductor/
├── main.js              # Electron main process (window management, IPC, downloads)
├── renderer/
│   ├── index.html       # Application UI markup
│   ├── renderer.js      # Renderer process logic
│   ├── preload.js       # Secure bridge between main and renderer
│   └── styles.css       # Application styles
└── package.json
```

---

## 📖 Usage

1. Launch the application with `npm start`
2. Paste a direct file URL (e.g. `https://example.com/file.zip`) into the URL field
3. Click **Browse** to choose where the file should be saved
4. Click **Download** — the progress bar will update in real time
5. A success message will show the full path once the download is complete

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Electron](https://www.electronjs.org/) | Cross-platform desktop framework |
| HTML / CSS / JavaScript | UI layer |
| Node.js `https` / `http` | File downloading |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**aliasist** — [GitHub Profile](https://github.com/aliasist)

