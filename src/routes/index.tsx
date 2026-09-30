import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";

import { Metric3D } from "@/components/Metric3D";
import { Awards } from "@/components/sections/Awards";
import { Resources } from "@/components/sections/Resources";
import { VisitorCounter } from "@/components/sections/VisitorCounter";
import { ContactSection } from "@/components/sections/ContactSection";
import { JourneyTunnel } from "@/components/sections/JourneyTunnel";
import { SkillPath } from "@/components/sections/SkillPath";
import { ToolkitConstellation } from "@/components/sections/ToolkitConstellation";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { WorldBackground } from "@/components/WorldBackground";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/site-config";
import { EMAIL, heroMetrics, toolkit } from "@/lib/site-data";

const title = "Olivia Oluchi Ebepu | Marketing & Market Intelligence";
const description =
  "Olivia Oluchi Ebepu, M.S. Marketing, works in market research, digital campaigns, and AI-supported labor and economic intelligence. Based in Worcester, MA.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Index,
});

function Section({
  id,
  eyebrow,
  headline,
  sub,
  children,
}: {
  id?: string;
  eyebrow?: string;
  headline: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 md:px-8 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 max-w-3xl"
      >
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
          {headline}
        </h2>
        {sub && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{sub}</p>}
      </motion.header>
      {children}
    </section>
  );
}

function Index() {
  return (
    <>
      <WorldBackground variant="home" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-32 md:px-8 md:pt-36 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
        <div>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.14em] text-primary uppercase"
        >
          Olivia Oluchi Ebepu, M.S.
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-foreground md:text-6xl"
        >
          I turn market questions into{" "}
          <span className="text-gradient">decisions</span> people can use.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground"
        >
          I am a marketing and market research professional. I work on outreach, audience research,
          and the numbers behind a campaign. I am also building AI tools that help people see labor
          markets and economic trends more clearly.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground/80"
        >
          I studied accountancy, then spent years in marketing and business development. Graduate
          school at Clark University brought data into the center of the work. Today I lead
          marketing for a healthcare staffing agency in Worcester.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button variant="signal" size="lg" data-magnetic asChild>
            <a href="#journey">
              See how I got here
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="wire" size="lg" data-magnetic asChild>
            <Link to="/experience">
              View my experience
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-primary/35 shadow-[0_0_80px_-24px_oklch(0.8_0.16_190/0.8)]"
        >
          <img
            src="/market-chart.png"
            alt="Glowing cyan and green market chart on a dark field"
            className="aspect-[16/10] w-full object-cover lg:aspect-[4/5] lg:min-h-[460px]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-5 pb-4 pt-16 text-sm text-primary">
            Market signals, read clearly
          </figcaption>
        </motion.figure>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((metric, index) => (
            <Metric3D key={metric.label} {...metric} index={index} />
          ))}
        </div>
      </section>

      <Section
        id="journey"
        eyebrow="My story"
        headline="I started with numbers. Marketing taught me what they are for."
        sub="Each role added a layer: customers, campaigns, partnerships, then graduate research. The thread is the same. Find out what the market is doing, say it clearly, and act on it."
      >
        <JourneyTunnel />
      </Section>

      <Section
        eyebrow="What I do"
        headline="The skills I use to read a market and move it"
        sub="Research, campaigns, and planning sit in the same job. The point is a decision someone can defend."
      >
        <SkillPath />
      </Section>

      <Section
        eyebrow="Selected work"
        headline="A few projects, in plain language"
        sub="Staffing growth, an AI research platform, a conference paper, and earlier commercial work in Nigeria."
      >
        <WorkGallery />
      </Section>

      <Section
        id="resources"
        eyebrow="Free downloads"
        headline="Templates you can use today"
        sub="A campaign brief, an audience worksheet, and a competitor sheet. Download them and use them however you like."
      >
        <Resources />
      </Section>

      <Section
        id="awards"
        eyebrow="Recognition"
        headline="Awards"
        sub="Recognition for strategic marketing and for work on AI-driven market intelligence."
      >
        <Awards />
      </Section>

      <Section eyebrow="Tools" headline="What I work with">
        <ToolkitConstellation categories={toolkit} />
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        headline="Let's talk"
        sub="Send a note about a role, a research question, or a conversation you would like to have."
      >
        <ContactSection />
      </Section>

      <section className="mx-auto max-w-5xl px-5 pb-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl panel p-8 text-center transition-shadow duration-500 hover:panel-glow md:p-12"
        >
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Good decisions start with a market you can{" "}
            <span className="text-gradient">actually see.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            That is the work I want to keep doing: research that is careful, campaigns that are
            specific, and intelligence tools that help workforce and business leaders choose.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="signal" size="lg" data-magnetic asChild>
              <Link to="/experience">
                View my experience
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="wire" size="lg" data-magnetic asChild>
              <Link to="/publications">Read my publications</Link>
            </Button>
            <Button variant="ghost" size="lg" data-magnetic asChild>
              <a href="#resources">Get the free templates</a>
            </Button>
            <Button variant="ghost" size="lg" data-magnetic asChild>
              <a href={`mailto:${EMAIL}`}>
                Email me
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="mx-auto mt-10 max-w-xl">
            <VisitorCounter />
          </div>
        </motion.div>
      </section>
    </>
  );
}
