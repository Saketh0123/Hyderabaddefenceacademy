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
  return path.replace(/(\.[^/.]+)$/, "-thumb$1");
}

export function imageEntry(path: string) {
  return {
    thumbnail: assetUrl(thumbPath(path)),
    full: assetUrl(path),
  };
}
