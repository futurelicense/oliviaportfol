import { motion } from "framer-motion";

import { externalEngagement } from "@/lib/site-data";

export function ExternalEngagement() {
  return (
    <div className="space-y-4">
      {externalEngagement.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl panel p-6 md:p-8"
        >
          <span className="eyebrow">{item.partner}</span>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{item.plain}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-primary">Record. </span>
            {item.record}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
