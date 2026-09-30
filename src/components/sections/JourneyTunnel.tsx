import { motion } from "framer-motion";
import {
  GraduationCap,
  Handshake,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useTilt } from "@/hooks/use-tilt";
import { journeyStages } from "@/lib/site-data";

const icons: LucideIcon[] = [GraduationCap, Search, Handshake, TrendingUp, Users, Sparkles];

function JourneyCard({ stage, index }: { stage: (typeof journeyStages)[number]; index: number }) {
  const tiltRef = useTilt<HTMLLIElement>({ max: 4, scale: 1.01 });
  const Icon = icons[index % icons.length] ?? Sparkles;

  return (
    <motion.li
      ref={tiltRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="tilt-card group relative rounded-2xl panel p-6 hover:panel-glow md:p-8"
    >
      <div className="tilt-card-content">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-semibold text-primary">
            Step {index + 1}
          </span>
          <h3 className="font-display text-2xl font-semibold">{stage.title}</h3>
        </div>
        <p className="mt-3 text-base font-medium text-muted-foreground">{stage.subtitle}</p>
        <p className="mt-3 text-lg leading-relaxed">{stage.plain}</p>
      </div>

      {index < journeyStages.length - 1 && (
        <span
          className="absolute -bottom-5 left-11 hidden h-5 w-px bg-gradient-to-b from-primary/40 to-transparent md:block"
          aria-hidden
        />
      )}
    </motion.li>
  );
}

export function JourneyTunnel() {
  return (
    <ol className="space-y-5">
      {journeyStages.map((stage, index) => (
        <JourneyCard key={stage.number} stage={stage} index={index} />
      ))}
    </ol>
  );
}
