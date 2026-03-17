const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { spawn } = require('child_process');

if (process.platform === 'win32') app.setAppUserModelId('com.aliasist.files.abductor');

let mainWindow, activeRequest = null, activeYtdlp = null;
const DL_DIR = path.join(app.getPath('downloads'), 'Aliasist');
let abducteeCounter = 0;

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function initAbducteeCounter() {
  ensureDir(DL_DIR);
  try {
    const files = fs.readdirSync(DL_DIR);
    files.forEach(function(f) {
      var m = f.match(/^abductee_(\d+)/);
      if (m) {
        var n = parseInt(m[1]);
        if (n >= abducteeCounter) abducteeCounter = n + 1;
      }
    });
  } catch (e) {}
  if (abducteeCounter === 0) abducteeCounter = 1;
}

function nextAbducteeName(ext) {
  var name = 'abductee_' + abducteeCounter + (ext || '.bin');
  abducteeCounter++;
  return name;
}

function createWindow() {
  initAbducteeCounter();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 580,
    minWidth: 640,
    minHeight: 500,
    backgroundColor: '#05080d',
    icon: path.join(__dirname, 'assets', 'alien_icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    frame: false,
    show: false
  });
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', function() { mainWindow.show(); });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', function() { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', function() { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

ipcMain.on('win-minimize', function() { mainWindow.minimize(); });
ipcMain.on('win-maximize', function() { mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize(); });
ipcMain.on('win-close', function() { mainWindow.close(); });
ipcMain.handle('get-dl-dir', function() { return DL_DIR; });
ipcMain.handle('browse-save', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

// --- Handler for downloading files ---
ipcMain.handle('download-file', async (event, ...args) => {
  let [url, savePath] = args;
  console.log('Step 1: download-file invoked', { url, savePath });

  // Fallback for savePath
  if (!savePath || typeof savePath !== 'string' || savePath === 'undefined') {
    savePath = path.join(DL_DIR, nextAbducteeName('.mp4'));
    console.log('Step 2: Fallback savePath applied', savePath);
  }
  console.log('Step 3: Final url/savePath', { url, savePath });

  // Block non-video URLs 
  if (!/^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url) && !/^https?:\/\/youtu\.be\//.test(url)) {
    mainWindow.webContents.send('dl-status', { text: 'Please enter a direct video URL (not a search or playlist page).' });
    return { success: false, error: 'Invalid or unsupported URL type' };
  }

  // Always resolves with success/error object
  return new Promise(function(resolve, reject) {
    let saveDir = path.dirname(savePath);
    ytdlpDownload(url, saveDir, savePath, resolve, reject);
  });
});

// Streaming site detection
var STREAM_SITES = /youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|twitch\.tv|soundcloud\.com|twitter\.com|x\.com|instagram\.com|tiktok\.com|facebook\.com|reddit\.com|streamable\.com|bitchute\.com|rumble\.com|odysee\.com|bilibili\.com|v\.redd\.it|clips\.twitch\.tv/i;

function isStreamingSite(url) {
  return STREAM_SITES.test(url);
}

// MIME map (keep as is)
var MIME_MAP = {
  'video/mp4':'.mp4',
  'video/webm':'.webm',
  'video/quicktime':'.mov',
  'video/x-matroska':'.mkv',
  'video/x-msvideo':'.avi',
  'audio/mpeg':'.mp3',
  'audio/ogg':'.ogg',
  'audio/wav':'.wav',
  'audio/flac':'.flac',
  'image/jpeg':'.jpg',
  'image/png':'.png',
  'image/gif':'.gif',
  'image/webp':'.webp',
  'application/pdf':'.pdf',
  'application/zip':'.zip',
  'application/x-rar-compressed':'.rar',
  'application/x-7z-compressed':'.7z',
  'application/gzip':'.gz',
  'text/plain':'.txt',
  'application/json':'.json',
  'application/octet-stream':'.bin',
  'application/x-msdownload':'.exe'
};

var BAD_NAMES = ['download','file','index','index.html','index.htm','default','watch',''];
var JUNK_EXTS = ['.watch','.download','.tmp','.partial','.crdownload','.part','.html','.htm'];

function resolveFilename(url, headers) {
  var name = null;
  var ext = '';

  var cd = headers['content-disposition'] || '';
  if (cd) {
    var m = cd.match(/filename\*\s*=\s*UTF-8''(.+)/i);
    if (m) {
      name = decodeURIComponent(m[1].trim().replace(/"/g, ''));
    } else {
      m = cd.match(/filename\s*=\s*"?([^";]+)"?/i);
      if (m) name = m[1].trim().replace(/"/g, '');
    }
  }

  if (!name || BAD_NAMES.indexOf(name.toLowerCase().replace(/\.[^.]+$/, '')) !== -1) {
    try {
      var urlPath = new URL(url).pathname;
      var urlName = decodeURIComponent(urlPath.split('/').pop() || '');
      if (urlName && urlName !== '/' && BAD_NAMES.indexOf(urlName.toLowerCase().replace(/\.[^.]+$/, '')) === -1) {
        name = urlName;
      }
    } catch (e) {}
  }

  var ct = (headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (ct && MIME_MAP[ct]) ext = MIME_MAP[ct];

  if (name) {
    name = name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim();
    var currentExt = path.extname(name).toLowerCase();
    if (JUNK_EXTS.indexOf(currentExt) !== -1) {
      name = path.basename(name, currentExt);
      if (ext) name += ext;
    }
    if (!path.extname(name) && ext) name += ext;
    if (name.length > 120) name = name.substring(0, 110) + path.extname(name);
  }

  if (!name || name.length < 2) name = nextAbducteeName(ext || '.bin');
  return name;
}
console.log('download-file: resolveFilename examples:',
  resolveFilename('https://example.com/video.mp4', {'content-disposition': 'attachment; filename="example_video.mp4"'}),
  resolveFilename('https://example.com/download', {'content-type': 'video/mp4'}),
  resolveFilename('https://example.com/file.unknown', {})
);

// --- yt-dlp download --- (CLEANED)
function ytdlpDownload(url, saveDir, savePath, resolve, reject) {
  ensureDir(saveDir);

  // Standalone yt-dlp path, adapt for your platform as needed
  let ytdlpPath = path.join(os.homedir(), '.local', 'bin', 'yt-dlp');
  if (process.platform === 'win32') ytdlpPath = 'yt-dlp'; // adjust if on Windows and PATH is set

  // Output template: usually "savePath"
  const outTemplate = savePath.endsWith('.mp4') ? savePath : savePath + '.mp4';

  const args = [
    url,
    '-f', 'bestvideo+bestaudio/best',
    '--merge-output-format', 'mp4',
    '--no-playlist',
    '--force-overwrites',
    '--newline',
    '-o', outTemplate
  ];

  console.log('yt-dlp spawn:', ytdlpPath, args);

  const activeYtdlp = spawn(ytdlpPath, args);

  activeYtdlp.stdout.on('data', data => {
    console.log('yt-dlp stdout:', data.toString());
  });
  activeYtdlp.stderr.on('data', data => {
    console.error('yt-dlp stderr:', data.toString());
  });
  activeYtdlp.on('close', code => {
    console.log('yt-dlp exited with code:', code);
    if (code === 0) resolve({ success: true });
    else reject(new Error('yt-dlp failed with code ' + code));
  });
  activeYtdlp.on('error', err => {
    reject(new Error('Failed to spawn yt-dlp: ' + err.message));
  });
}

// Direct download logic *i may put later*  ...

