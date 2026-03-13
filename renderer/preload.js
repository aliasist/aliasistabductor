const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  downloadFile: (options) => ipcRenderer.invoke('download-file', options),
  onDownloadProgress: (callback) => {
    // Remove any previously registered listener to avoid leaks across multiple downloads
    ipcRenderer.removeAllListeners('download-progress');
    ipcRenderer.on('download-progress', (_event, data) => callback(data));
  }
});
