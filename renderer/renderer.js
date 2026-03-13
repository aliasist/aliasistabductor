'use strict';

const urlInput = document.getElementById('url-input');
const directoryInput = document.getElementById('directory-input');
const browseBtn = document.getElementById('browse-btn');
const downloadBtn = document.getElementById('download-btn');
const progressSection = document.getElementById('progress-section');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const progressDetails = document.getElementById('progress-details');
const statusSection = document.getElementById('status-section');
const statusMessage = document.getElementById('status-message');
const progressBarTrack = progressSection.querySelector('.progress-bar-track');

let saveDirectory = '';

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function updateDownloadButton() {
  const hasUrl = urlInput.value.trim().length > 0;
  const hasDir = saveDirectory.length > 0;
  downloadBtn.disabled = !(hasUrl && hasDir);
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusSection.hidden = false;
}

function hideStatus() {
  statusSection.hidden = true;
}

function showProgress() {
  progressSection.hidden = false;
  hideStatus();
  setProgress(0, 0, 0);
}

function hideProgress() {
  progressSection.hidden = true;
}

function setProgress(percent, downloaded, total) {
  progressBar.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
  progressBarTrack.setAttribute('aria-valuenow', percent);

  if (total > 0) {
    progressDetails.textContent = `${formatBytes(downloaded)} / ${formatBytes(total)}`;
  } else {
    progressDetails.textContent = downloaded > 0 ? `${formatBytes(downloaded)} downloaded` : '';
  }
}

// Browse button
browseBtn.addEventListener('click', async () => {
  const dir = await window.electronAPI.selectDirectory();
  if (dir) {
    saveDirectory = dir;
    directoryInput.value = dir;
    updateDownloadButton();
  }
});

// URL input validation
urlInput.addEventListener('input', updateDownloadButton);

// Download button
downloadBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  if (!url || !saveDirectory) return;

  downloadBtn.disabled = true;
  showProgress();

  // Listen for progress updates
  window.electronAPI.onDownloadProgress(({ progress, downloadedSize, totalSize }) => {
    setProgress(progress, downloadedSize, totalSize);
  });

  try {
    const result = await window.electronAPI.downloadFile({ url, savePath: saveDirectory });
    hideProgress();
    showStatus(`✓ File saved to: ${result.filePath}`, 'success');
  } catch (err) {
    hideProgress();
    showStatus(`✗ Download failed: ${err.message}`, 'error');
  } finally {
    downloadBtn.disabled = false;
    updateDownloadButton();
  }
});
