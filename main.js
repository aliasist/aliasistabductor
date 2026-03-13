const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { spawn } = require('child_process');

if (process.platform === 'win32') app.setAppUserModelId('com.aliasist.files.abductor');

let mainWindow, activeRequest = null, activeYtdlp = null;
const DL_DIR = path.join(app.getPath('downloads'), 'Aliasist');
let abducteeCounter = 0;

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

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

ipcMain.handle('download-file', async function(e, url, savePath) {
  // Normalize URL — add https:// if missing
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  return new Promise(function(resolve, reject) {
    if (isStreamingSite(url)) {
      var saveDir = path.dirname(savePath) || DL_DIR;
      ytdlpDownload(url, saveDir, resolve, reject);
    } else {
      directDownload(url, savePath, resolve, reject, 10);
    }
  });
});

// Streaming site detection
var STREAM_SITES = /youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|twitch\.tv|soundcloud\.com|twitter\.com|x\.com|instagram\.com|tiktok\.com|facebook\.com|reddit\.com|streamable\.com|bitchute\.com|rumble\.com|odysee\.com|bilibili\.com|v\.redd\.it|clips\.twitch\.tv/i;

function isStreamingSite(url) {
  return STREAM_SITES.test(url);
}

// MIME map
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

// yt-dlp download (uses python -m yt_dlp)
function ytdlpDownload(url, saveDir, resolve, reject) {
  ensureDir(saveDir);

  var infoProc = spawn('python', ['-m', 'yt_dlp', '--no-download', '--print', 'title', '--no-playlist', url], { shell: true });
  var title = '';
  infoProc.stdout.on('data', function(d) { title += d.toString().trim(); });

  infoProc.on('close', function(code) {
    if (!title) title = 'abductee_' + abducteeCounter;

    title = title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').substring(0, 80).trim();
    if (!title) title = 'abductee_' + abducteeCounter;

    var outTemplate = path.join(saveDir, title + '.%(ext)s');
    var finalMp4 = path.join(saveDir, title + '.mp4');

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('dl-meta', { total: 0, finalPath: finalMp4, finalName: title + '.mp4' });
      mainWindow.webContents.send('dl-status', { text: 'Abducting: ' + title });
    }

    var args = [
      '-m', 'yt_dlp',
      '-f', 'bestvideo+bestaudio/best',
      '--merge-output-format', 'mp4',
      '--no-playlist',
      '--force-overwrites',
      '--newline',
      '-o', outTemplate,
      url
    ];

    activeYtdlp = spawn('python', args, { shell: true });

    activeYtdlp.stdout.on('data', function(data) {
      var line = data.toString();
      var m = line.match(/\[download\]\s+([\d.]+)%\s+of\s+~?([\d.]+\s*\S+)\s+at\s+([\d.]+\s*\S+)/);
      if (m) {
        var pct = parseFloat(m[1]);
        var totalStr = m[2];
        var speedStr = m[3];
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-progress', {
            downloaded: 0, total: 0, speed: 0,
            pct: pct, ytInfo: totalStr + ' at ' + speedStr
          });
        }
      }
      if (line.indexOf('[Merger]') !== -1 || line.indexOf('Merging') !== -1) {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-status', { text: 'Merging video + audio...' });
        }
      }
    });

    activeYtdlp.stderr.on('data', function(data) {
      var err = data.toString();
      if (err.indexOf('ERROR') !== -1) {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-status', { text: 'Error: ' + err.substring(0, 100) });
        }
      }
    });

    activeYtdlp.on('close', function(exitCode) {
      activeYtdlp = null;
      if (exitCode === 0) {
        var outputFile = finalMp4;
        if (!fs.existsSync(outputFile)) {
          try {
            var files = fs.readdirSync(saveDir).filter(function(f) { return f.indexOf(title) === 0; });
            if (files.length > 0) outputFile = path.join(saveDir, files[files.length - 1]);
          } catch (e) {}
        }
        var size = 0;
        try { size = fs.statSync(outputFile).size; } catch (e) {}
        resolve({ success: true, path: outputFile, size: size, name: path.basename(outputFile) });
      } else {
        reject(new Error('yt-dlp failed with code ' + exitCode));
      }
    });

    activeYtdlp.on('error', function(err) {
      activeYtdlp = null;
      reject(new Error('Could not run python -m yt_dlp. Is Python installed?'));
    });
  });

  infoProc.on('error', function() {
    reject(new Error('Could not run python. Is Python installed?'));
  });
}

// Direct download (for regular files)
function ytdlpDownload(url, saveDir, resolve, reject) {
  ensureDir(saveDir);

  var infoProc = spawn('python', ['-m', 'yt_dlp', '--no-download', '--print', 'title', '--no-playlist', url]);
  var title = '';
  infoProc.stdout.on('data', function(d) { title += d.toString().trim(); });
  infoProc.stderr.on('data', function(d) { console.log('[yt-dlp info stderr]', d.toString()); });

  infoProc.on('close', function(code) {
    if (!title) title = 'abductee_' + abducteeCounter;

    title = title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').substring(0, 80).trim();
    if (!title) title = 'abductee_' + abducteeCounter;

    var outTemplate = path.join(saveDir, title + '.%(ext)s');
    var finalMp4 = path.join(saveDir, title + '.mp4');

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('dl-meta', { total: 0, finalPath: finalMp4, finalName: title + '.mp4' });
      mainWindow.webContents.send('dl-status', { text: 'Abducting: ' + title });
    }

    var args = [
      '-m', 'yt_dlp',
      '-f', 'bestvideo+bestaudio/best',
      '--merge-output-format', 'mp4',
      '--no-playlist',
      '--force-overwrites',
      '--newline',
      '-o', outTemplate,
      url
    ];

    activeYtdlp = spawn('python', args);

    var stderrLog = '';

    activeYtdlp.stdout.on('data', function(data) {
      var line = data.toString();
      var m = line.match(/\[download\]\s+([\d.]+)%\s+of\s+~?([\d.]+\s*\S+)\s+at\s+([\d.]+\s*\S+)/);
      if (m) {
        var pct = parseFloat(m[1]);
        var totalStr = m[2];
        var speedStr = m[3];
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-progress', {
            downloaded: 0, total: 0, speed: 0,
            pct: pct, ytInfo: totalStr + ' at ' + speedStr
          });
        }
      }
      // Also check for "already been downloaded"
      if (line.indexOf('has already been downloaded') !== -1) {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-status', { text: 'File already exists — overwriting...' });
        }
      }
      if (line.indexOf('[Merger]') !== -1 || line.indexOf('Merging') !== -1) {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('dl-status', { text: 'Merging video + audio...' });
        }
      }
    });

    activeYtdlp.stderr.on('data', function(data) {
      var err = data.toString();
      stderrLog += err;
      console.log('[yt-dlp stderr]', err);
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('dl-status', { text: 'yt-dlp: ' + err.substring(0, 150) });
      }
    });

    activeYtdlp.on('close', function(exitCode) {
      activeYtdlp = null;
      if (exitCode === 0) {
        var outputFile = finalMp4;
        if (!fs.existsSync(outputFile)) {
          try {
            var files = fs.readdirSync(saveDir).filter(function(f) { return f.indexOf(title) === 0; });
            if (files.length > 0) outputFile = path.join(saveDir, files[files.length - 1]);
          } catch (e) {}
        }
        var size = 0;
        try { size = fs.statSync(outputFile).size; } catch (e) {}
        resolve({ success: true, path: outputFile, size: size, name: path.basename(outputFile) });
      } else {
        var errMsg = stderrLog.substring(0, 300) || 'Unknown error';
        reject(new Error('yt-dlp failed (code ' + exitCode + '): ' + errMsg));
      }
    });

    activeYtdlp.on('error', function(err) {
      activeYtdlp = null;
      reject(new Error('Could not run python -m yt_dlp. Is Python installed?'));
    });
  });

  infoProc.on('error', function() {
    reject(new Error('Could not run python. Is Python installed?'));
  });
}