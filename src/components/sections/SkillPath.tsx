import { motion } from "framer-motion";

import { skillPath } from "@/lib/site-data";

export function SkillPath() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skillPath.map((skill, index) => (
        <motion.li
          key={skill}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-xl panel px-5 py-4 text-lg transition-all duration-300 hover:-translate-y-1 hover:panel-glow"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-energy align-middle transition-transform duration-300 group-hover:scale-150" />
          {skill}
        </motion.li>
      ))}
    </ul>
  );
}
