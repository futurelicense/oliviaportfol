import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { awards } from "@/lib/site-data";

export function Awards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {awards.map((award, index) => (
        <motion.article
          key={award.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl panel p-6 transition-shadow duration-500 hover:panel-glow"
        >
          <span className="inline-flex items-center gap-2 text-primary">
            <Award className="h-4 w-4" />
            <span className="eyebrow">{award.year}</span>
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{award.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{award.detail}</p>
        </motion.article>
      ))}
    </div>
  );
}
