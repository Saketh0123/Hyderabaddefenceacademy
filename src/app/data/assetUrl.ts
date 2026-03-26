const RAW_BASE_URL = "https://github.com/Saketh0123/Hyderabaddefenceacademy/raw/main/public";

export function assetUrl(path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }

  // Keep local development behavior unchanged; use GitHub raw files on hosted domains.
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  if (isLocalHost) {
    return path;
  }

  return `${RAW_BASE_URL}${path}`;
}

export function thumbPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return path.replace(/(\.[^/.]+)$/, "-thumb-480$1");
}

export function imageEntry(path: string) {
  const thumb480 = assetUrl(thumbPath(path));
  const thumb800 = assetUrl(path.replace(/(\.[^/.]+)$/, "-thumb-800$1"));
  const srcSet = `${thumb480} 480w, ${thumb800} 800w`;
  return {
    thumbnail: thumb480,
    thumbLarge: thumb800,
    srcSet,
    full: assetUrl(path),
  };
}
