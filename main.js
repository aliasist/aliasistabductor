const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { URL } = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'renderer', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: 'AliasistAbductor'
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle directory selection dialog
ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.canceled ? null : result.filePaths[0];
});

// Handle file download
ipcMain.handle('download-file', async (event, { url, savePath }) => {
  return performDownload(url, savePath, 0);
});

/**
 * Performs the actual file download, following redirects up to maxRedirects times.
 * @param {string} url - URL to download
 * @param {string} savePath - Directory to save the file
 * @param {number} redirectCount - Current redirect depth
 * @returns {Promise<{success: boolean, filePath: string}>}
 */
function performDownload(url, savePath, redirectCount) {
  const MAX_REDIRECTS = 10;
  return new Promise((resolve, reject) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return reject(new Error('Invalid URL provided.'));
    }

    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const request = protocol.get(url, (response) => {
      // Follow redirects
      if (
        (response.statusCode === 301 ||
          response.statusCode === 302 ||
          response.statusCode === 303 ||
          response.statusCode === 307 ||
          response.statusCode === 308) &&
        response.headers.location
      ) {
        response.resume(); // discard response body
        if (redirectCount >= MAX_REDIRECTS) {
          return reject(new Error('Too many redirects.'));
        }
        resolve(performDownload(response.headers.location, savePath, redirectCount + 1));
        return;
      }

      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }

      // Determine filename
      let fileName = path.basename(parsedUrl.pathname).split('?')[0];
      if (!fileName) {
        // Try Content-Disposition header
        const cd = response.headers['content-disposition'] || '';
        const match = cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i);
        if (match) {
          fileName = decodeURIComponent(match[1].trim());
        } else {
          // Fall back to a generic name with extension hint from Content-Type
          const ct = response.headers['content-type'] || '';
          const ext = ct.split('/')[1]?.split(';')[0]?.trim() || 'bin';
          fileName = `downloaded_file.${ext}`;
        }
      }

      const filePath = path.join(savePath, fileName);
      const fileStream = fs.createWriteStream(filePath);

      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;

      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize) {
          const progress = Math.round((downloadedSize / totalSize) * 100);
          mainWindow.webContents.send('download-progress', { progress, downloadedSize, totalSize });
        }
      });

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve({ success: true, filePath });
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });
  });
}
