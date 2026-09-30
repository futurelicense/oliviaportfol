import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { resourceTemplates, type ResourceTemplateId } from "@/lib/site-data";
import { registerDownload, totalDownloads, type SiteStats } from "@/lib/stats";
import { useSiteStats } from "@/hooks/use-site-stats";

export function Resources() {
  const queryClient = useQueryClient();
  const { data: stats } = useSiteStats();

  const { mutate: track } = useMutation({
    mutationFn: registerDownload,
    onSuccess: (next) => {
      queryClient.setQueryData<SiteStats>(["site-stats"], next);
    },
  });

  const handleDownload = (id: ResourceTemplateId, file: string) => {
    const filename = file.split("/").pop() ?? "template";
    const link = document.createElement("a");
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    track(id);
    toast.success("Download started", { description: "The template is on its way." });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        {resourceTemplates.map((template) => (
          <article key={template.id} className="flex flex-col rounded-2xl panel p-6">
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {template.format}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold">{template.title}</h3>
            <p className="mt-3 flex-1 text-lg leading-relaxed text-muted-foreground">
              {template.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button variant="signal" onClick={() => handleDownload(template.id, template.file)}>
                <Download className="h-4 w-4" />
                Download
              </Button>
              <span className="text-base text-muted-foreground">
                {(() => {
                  const count = stats?.downloads?.[template.id] ?? 0;
                  return `${count.toLocaleString()} ${count === 1 ? "download" : "downloads"}`;
                })()}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="rounded-xl panel px-5 py-4 text-center text-base text-muted-foreground">
        {(() => {
          const total = totalDownloads(stats);
          return total === 1 ? "1 template downloaded so far" : `${total} templates downloaded so far`;
        })()}
      </p>
    </div>
  );
}
