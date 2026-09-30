import { totalDownloads } from "@/lib/stats";
import { useSiteStats } from "@/hooks/use-site-stats";

const items = [
  { key: "visits", label: "visits" },
  { key: "downloads", label: "downloads" },
  { key: "views", label: "publication views" },
] as const;

export function VisitorCounter() {
  const { data } = useSiteStats();
  const values = {
    visits: data?.total_visits ?? 0,
    downloads: totalDownloads(data),
    views: data?.views?.["publications"] ?? 0,
  };

  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      {items.map((item) => (
        <div key={item.key} className="rounded-2xl panel px-3 py-5">
          <p className="font-display text-3xl font-semibold text-gradient">
            {values[item.key].toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
