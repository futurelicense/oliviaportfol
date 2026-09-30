const rawSiteUrl =
  import.meta.env["VITE_SITE_URL"] || process.env["SITE_URL"] || "https://olivia-ebepu.vercel.app";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
