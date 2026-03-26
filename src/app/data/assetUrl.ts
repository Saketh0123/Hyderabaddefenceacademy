const RAW_BASE_URL = "https://raw.githubusercontent.com/Saketh0123/Hyderabaddefenceacademy/main/public";

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
