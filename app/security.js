/**
 * Input validation for yt-dlp IPC — reduces risk of malformed or abusive input.
 */
const path = require("path");

const MAX_URL_LENGTH = 8192;
const MAX_PATH_LENGTH = 4096;
const MAX_DEFAULT_NAME = 255;

/**
 * Only https URLs; single arg passed to spawn (no shell) — still reject weird schemes.
 */
function validateDownloadUrl(raw) {
  if (typeof raw !== "string") {
    return { ok: false, error: "URL must be a string" };
  }
  const s = raw.trim();
  if (!s) {
    return { ok: false, error: "URL is required" };
  }
  if (s.length > MAX_URL_LENGTH) {
    return { ok: false, error: "URL is too long" };
  }
  let u;
  try {
    u = new URL(s);
  } catch {
    return { ok: false, error: "Invalid URL" };
  }
  if (u.protocol !== "https:") {
    return { ok: false, error: "Only https:// URLs are supported" };
  }
  if (!u.hostname) {
    return { ok: false, error: "URL is missing a host" };
  }
  // Block obvious oddities (rare in real video URLs)
  if (/[\s\u0000-\u001f]/.test(s)) {
    return { ok: false, error: "URL contains invalid characters" };
  }
  return { ok: true, href: u.href };
}

/**
 * Save path from the dialog must be absolute and free of device-path tricks.
 */
function validateSavePath(raw) {
  if (typeof raw !== "string") {
    return { ok: false, error: "Save path must be a string" };
  }
  const s = raw.trim();
  if (!s) {
    return { ok: false, error: "Save path is required" };
  }
  if (s.length > MAX_PATH_LENGTH) {
    return { ok: false, error: "Path is too long" };
  }
  if (s.includes("\0")) {
    return { ok: false, error: "Invalid path" };
  }
  const resolved = path.resolve(s);
  if (!path.isAbsolute(resolved)) {
    return { ok: false, error: "Save path must be absolute" };
  }
  if (process.platform === "win32") {
    const lower = resolved.toLowerCase();
    if (lower.startsWith("\\\\.\\") || lower.startsWith("\\\\?\\")) {
      return { ok: false, error: "Invalid Windows path" };
    }
  }
  return { ok: true, resolved };
}

/** Default file name fragment for the save dialog — no path separators. */
function validateDefaultName(raw) {
  if (raw == null || raw === "") {
    return { ok: true, name: "download" };
  }
  if (typeof raw !== "string") {
    return { ok: false, error: "Invalid default name" };
  }
  const s = raw.trim().slice(0, MAX_DEFAULT_NAME);
  if (/[\0<>:"|?*\\/]/.test(s)) {
    return { ok: false, error: "File name contains invalid characters" };
  }
  return { ok: true, name: s || "download" };
}

module.exports = {
  validateDownloadUrl,
  validateSavePath,
  validateDefaultName,
};
