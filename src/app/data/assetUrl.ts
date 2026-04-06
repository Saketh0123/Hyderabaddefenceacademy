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

// Generate optimized thumbnail URL using image service
export function optimizedThumb(path: string): string {
  const url = assetUrl(path);
  // For GitHub raw URLs, we can add query params for basic optimization
  // Using jsDelivr CDN which supports image resizing parameters
  if (url.includes("github.com")) {
    // Convert GitHub raw URL to jsDelivr CDN for better compression
    const cdnUrl = url.replace(
      "https://github.com/Saketh0123/Hyderabaddefenceacademy/raw/main/public",
      "https://cdn.jsdelivr.net/gh/Saketh0123/Hyderabaddefenceacademy/public"
    );
    return cdnUrl;
  }
  return url;
}

export function imageEntry(path: string) {
  return {
    thumbnail: optimizedThumb(path),
    full: assetUrl(path),
  };
}
