import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

import { WorldBackground } from "@/components/WorldBackground";
import { Button } from "@/components/ui/button";
import { useSiteStats } from "@/hooks/use-site-stats";
import { absoluteUrl } from "@/lib/site-config";
import { publications } from "@/lib/site-data";
import { registerView, type SiteStats } from "@/lib/stats";

const title = "Publications | Olivia Oluchi Ebepu";
const description =
  "Writing and a conference presentation by Olivia Oluchi Ebepu on labor-market intelligence, U.S. business growth, and AI-supported market analysis.";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl("/publications") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/publications") }],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const queryClient = useQueryClient();
  const { data: stats } = useSiteStats();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let latest = await registerView("publications");
      for (const paper of publications) {
        const next = await registerView(paper.id);
        if (next) latest = next;
      }
      if (!cancelled && latest) queryClient.setQueryData<SiteStats>(["site-stats"], latest);
    })().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [queryClient]);

  return (
    <>
      <WorldBackground variant="experience" />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-32 md:px-8 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Writing</span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] md:text-6xl">
            Papers on markets, labor, and{" "}
            <span className="text-gradient">how data changes a decision.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Journal writing, comparative market analysis, and a conference presentation on an
            AI framework for workforce and sector intelligence.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-primary">
            {(() => {
              const count = stats?.views?.["publications"] ?? 0;
              return `${count.toLocaleString()} ${count === 1 ? "view" : "views"} of this page`;
            })()}
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 pb-28 md:px-8">
        <div className="scene-3d grid gap-6 md:grid-cols-2">
          {publications.map((paper, index) => (
            <motion.article
              key={paper.id}
              data-magnetic
              initial={{ opacity: 0, y: 44, rotateX: 14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl panel p-6 transition-transform duration-500 hover:-translate-y-1.5 hover:panel-glow md:p-8"
            >
              <span className="eyebrow">{paper.topic}</span>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{paper.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{paper.description}</p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{paper.citation}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {(() => {
                  const count = stats?.views?.[paper.id] ?? 0;
                  return `${count.toLocaleString()} ${count === 1 ? "view" : "views"}`;
                })()}
              </p>
              {"href" in paper && paper.href && (
                <div className="mt-6">
                  <Button variant="signal" asChild>
                    <a href={paper.href} target="_blank" rel="noreferrer noopener">
                      Open DOI
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
