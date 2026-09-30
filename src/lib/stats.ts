import { publicationIds, resourceTemplateIds, type ResourceTemplateId } from "@/lib/site-data";

export type SiteStats = {
  total_visits: number;
  monthly_visits: number;
  unique_visitors: number;
  downloads: Record<string, number>;
  views: Record<string, number>;
};

const VISIT_SESSION_KEY = "oe_visit_session";
const VISITOR_KEY = "oe_visitor_id";

const emptyStats = (): SiteStats => ({
  total_visits: 0,
  monthly_visits: 0,
  unique_visitors: 0,
  downloads: {},
  views: {},
});

async function postStats(body: Record<string, unknown>): Promise<SiteStats> {
  const response = await fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Stats update failed");
  return (await response.json()) as SiteStats;
}

export async function fetchSiteStats(): Promise<SiteStats> {
  const response = await fetch("/api/stats");
  if (!response.ok) throw new Error("Stats unavailable");
  const data = (await response.json()) as SiteStats;
  return { ...emptyStats(), ...data };
}

export async function registerVisit(): Promise<SiteStats | null> {
  if (typeof window === "undefined") return null;
  if (sessionStorage.getItem(VISIT_SESSION_KEY)) return null;
  sessionStorage.setItem(VISIT_SESSION_KEY, "1");

  const isNewVisitor = !localStorage.getItem(VISITOR_KEY);
  if (isNewVisitor) localStorage.setItem(VISITOR_KEY, crypto.randomUUID());

  return postStats({ action: "visit", isNewVisitor });
}

export async function registerDownload(resourceId: ResourceTemplateId): Promise<SiteStats> {
  if (!resourceTemplateIds.includes(resourceId)) throw new Error("Unknown template");
  return postStats({ action: "download", id: resourceId });
}

export async function registerView(id: string): Promise<SiteStats | null> {
  if (typeof window === "undefined") return null;
  const allowed = id === "publications" || publicationIds.includes(id as (typeof publicationIds)[number]);
  if (!allowed) throw new Error("Unknown publication");
  const sessionKey = `oe_view_${id}`;
  if (sessionStorage.getItem(sessionKey)) return null;
  sessionStorage.setItem(sessionKey, "1");
  return postStats({ action: "view", id });
}

export function totalDownloads(stats: SiteStats | undefined): number {
  return Object.values(stats?.downloads ?? {}).reduce((sum, n) => sum + n, 0);
}

export function totalViews(stats: SiteStats | undefined): number {
  return Object.values(stats?.views ?? {}).reduce((sum, n) => sum + n, 0);
}
