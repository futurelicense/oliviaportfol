import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useTilt } from "@/hooks/use-tilt";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  index?: number;
};

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useMotionValueEvent(spring, "change", (v) => setDisplay(Math.round(v)));

  return <span ref={ref}>{display}</span>;
}

/** Pointer-tilted, glow-on-hover stat card. */
export function Metric3D({ value, prefix = "", suffix = "", label, index = 0 }: Props) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 8, scale: 1.03 });

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="tilt-card group relative overflow-hidden rounded-xl panel p-6 hover:panel-glow"
    >
      <div className="relative">
        <div className="font-display text-4xl font-semibold text-gradient md:text-5xl">
          {prefix}
          <CountUp value={value} />
          {suffix}
        </div>
        <p className="mt-2 text-base leading-snug text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}
