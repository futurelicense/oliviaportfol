import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

import { ContactSection } from "@/components/sections/ContactSection";
import { ToolkitConstellation } from "@/components/sections/ToolkitConstellation";
import { WorldBackground } from "@/components/WorldBackground";
import { absoluteUrl } from "@/lib/site-config";
import { awards, educationItems, impactMetrics, roles, toolkit } from "@/lib/site-data";

const title = "Experience | Olivia Oluchi Ebepu — Marketing & Market Intelligence";
const description =
  "Olivia Oluchi Ebepu's career across marketing, business development, graduate research, and AI-supported workforce intelligence.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl("/experience") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/experience") }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
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
          <span className="eyebrow">Career</span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] md:text-6xl">
            Marketing, research, and{" "}
            <span className="text-gradient">the decisions that follow.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The path runs from insurance and business development in Nigeria, through a marketing
            degree at Clark University, to healthcare staffing in Worcester and an independent
            market-intelligence project.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <h2 className="mb-10 font-display text-3xl font-semibold md:text-4xl">Career journey</h2>
        <div className="scene-3d relative pl-6 md:pl-10">
          <span
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent md:left-2"
            aria-hidden
          />
          {roles.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              data-magnetic
              initial={{ opacity: 0, y: 44, rotateX: 14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 rounded-2xl panel p-6 transition-transform duration-500 hover:-translate-y-1.5 hover:panel-glow md:p-8"
            >
              <span
                className="absolute -left-[1.6rem] top-9 h-3 w-3 rounded-full bg-energy animate-pulse-node md:-left-[2.4rem]"
                aria-hidden
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow">{role.period}</span>
                <span className="text-sm text-muted-foreground">{role.environment}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold">{role.company}</h3>
              <p className="mt-1 text-base font-medium text-primary">{role.role}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{role.summary}</p>
              <ul className="mt-4 space-y-2">
                {role.highlights.map((item) => (
                  <li key={item} className="text-base leading-relaxed text-muted-foreground">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="mb-10 font-display text-3xl font-semibold md:text-4xl">Impact</h2>
        <div className="scene-3d grid grid-cols-2 gap-4 md:grid-cols-3">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50, rotateX: 22 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              data-magnetic
              className="relative overflow-hidden rounded-xl panel p-5 transition-transform duration-500 hover:-translate-y-2 hover:panel-glow"
            >
              <span className="absolute inset-x-0 bottom-0 h-px flow-track opacity-70" aria-hidden />
              <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                {metric.value}
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="mb-10 font-display text-3xl font-semibold md:text-4xl">
          Education & recognition
        </h2>
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="scene-3d space-y-4">
            {educationItems.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30, rotateY: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                data-magnetic
                className="flex items-start gap-4 rounded-2xl panel p-5 transition-transform duration-500 hover:-translate-y-1"
              >
                <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.degree}</h3>
                  <p className="mt-1 text-base text-muted-foreground">{item.institution}</p>
                  <p className="mt-2 text-sm text-primary">{item.year}</p>
                  {"note" in item && item.note && (
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.note}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl panel p-6">
            <span className="eyebrow">Awards</span>
            <ul className="mt-5 space-y-4">
              {awards.map((award) => (
                <li key={award.title} className="flex items-start gap-3">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-energy" />
                  <span className="text-base text-muted-foreground">
                    <span className="text-foreground">{award.title}</span>
                    {" · "}
                    {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">How I work</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Campaigns, research, and planning use the same set of tools: spreadsheets, CRM, digital
          analytics, and increasingly AI to read a market faster.
        </p>
        <div className="mt-10">
          <ToolkitConstellation categories={toolkit} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 pb-28 md:px-8">
        <h2 className="mb-4 font-display text-3xl font-semibold md:text-4xl">Let's connect.</h2>
        <div className="mt-8">
          <ContactSection />
        </div>
      </section>
    </>
  );
}
