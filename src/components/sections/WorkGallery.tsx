import { motion } from "framer-motion";
import { Brain, MapPin, Megaphone, Presentation, TrendingUp, type LucideIcon } from "lucide-react";

import { useTilt } from "@/hooks/use-tilt";
import { selectedWork } from "@/lib/site-data";

const kindIcons: Record<(typeof selectedWork)[number]["kind"], LucideIcon> = {
  staffing: Megaphone,
  research: Brain,
  conference: Presentation,
  growth: TrendingUp,
};

export function WorkGallery() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {selectedWork.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof selectedWork)[number];
  index: number;
}) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 6, scale: 1.015 });
  const Icon = kindIcons[project.kind];

  return (
    <motion.article
      ref={tiltRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="tilt-card group relative overflow-hidden rounded-2xl panel p-6 hover:panel-glow"
    >
      <span
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="tilt-card-content relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="eyebrow">{project.organization}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-base text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {project.location}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{project.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{project.plain}</p>
      </div>
    </motion.article>
  );
}
