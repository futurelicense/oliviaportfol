import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { publicationIds, resourceTemplateIds } from "@/lib/site-data";

export type StatsSnapshot = {
  total_visits: number;
  monthly_visits: number;
  unique_visitors: number;
  downloads: Record<string, number>;
  views: Record<string, number>;
};

type Store = StatsSnapshot & { month_key: string };

const filePath = process.env.VERCEL
  ? "/tmp/site-stats.json"
  : resolve(process.cwd(), "data/site-stats.json");

function emptyStore(): Store {
  const downloads: Record<string, number> = {};
  const views: Record<string, number> = {};
  for (const id of resourceTemplateIds) downloads[id] = 0;
  for (const id of publicationIds) views[id] = 0;
  views["publications"] = 0;
  return {
    total_visits: 0,
    monthly_visits: 0,
    unique_visitors: 0,
    month_key: new Date().toISOString().slice(0, 7),
    downloads,
    views,
  };
}

function readStore(): Store {
  const base = emptyStore();
  if (!existsSync(filePath)) return base;
  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8")) as Partial<Store>;
    return {
      ...base,
      ...parsed,
      downloads: { ...base.downloads, ...(parsed.downloads ?? {}) },
      views: { ...base.views, ...(parsed.views ?? {}) },
    };
  } catch {
    return base;
  }
}

function writeStore(store: Store) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(store, null, 2));
}

let chain: Promise<unknown> = Promise.resolve();

function update(mutator: (store: Store) => void): Promise<StatsSnapshot> {
  const run = chain.then(() => {
    const store = readStore();
    mutator(store);
    writeStore(store);
    return snapshot(store);
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function snapshot(store: Store): StatsSnapshot {
  return {
    total_visits: store.total_visits,
    monthly_visits: store.monthly_visits,
    unique_visitors: store.unique_visitors,
    downloads: store.downloads,
    views: store.views,
  };
}

export function readStats(): StatsSnapshot {
  return snapshot(readStore());
}

export function recordVisit(isNewVisitor: boolean): Promise<StatsSnapshot> {
  const month = new Date().toISOString().slice(0, 7);
  return update((store) => {
    store.total_visits += 1;
    store.monthly_visits = store.month_key === month ? store.monthly_visits + 1 : 1;
    store.month_key = month;
    if (isNewVisitor) store.unique_visitors += 1;
  });
}

export function recordDownload(id: string): Promise<StatsSnapshot> {
  return update((store) => {
    if (!resourceTemplateIds.includes(id as (typeof resourceTemplateIds)[number])) return;
    store.downloads[id] = (store.downloads[id] ?? 0) + 1;
  });
}

export function recordView(id: string): Promise<StatsSnapshot> {
  return update((store) => {
    const allowed = id === "publications" || publicationIds.includes(id as (typeof publicationIds)[number]);
    if (!allowed) return;
    store.views[id] = (store.views[id] ?? 0) + 1;
  });
}

export async function handleStatsRequest(request: Request): Promise<Response> {
  if (request.method === "GET") {
    return Response.json(readStats());
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = (await request.json().catch(() => null)) as {
    action?: string;
    isNewVisitor?: boolean;
    id?: string;
  } | null;

  if (!body?.action) return Response.json({ error: "Missing action" }, { status: 400 });

  if (body.action === "visit") return Response.json(await recordVisit(Boolean(body.isNewVisitor)));
  if (body.action === "download" && body.id) return Response.json(await recordDownload(body.id));
  if (body.action === "view" && body.id) return Response.json(await recordView(body.id));

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
