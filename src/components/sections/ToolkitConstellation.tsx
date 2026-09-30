import { motion } from "framer-motion";

type Category = { name: string; tools: string[] };

export function ToolkitConstellation({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl panel p-6 transition-shadow duration-500 hover:panel-glow"
        >
          <h3 className="font-display text-xl font-semibold">{category.name}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {category.tools.map((tool) => (
              <li
                key={tool}
                className="group relative rounded-full border border-border bg-secondary px-4 py-1.5 text-base text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary/50 align-middle transition-colors duration-300 group-hover:bg-energy" />
                {tool}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
