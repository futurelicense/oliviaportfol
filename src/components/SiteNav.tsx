import { Link, useRouterState } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { EMAIL } from "@/lib/site-data";

const linkClass =
  "border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-primary data-[active=true]:text-foreground";

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/20 bg-background/75 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="flex flex-col leading-tight" aria-label="Olivia Oluchi Ebepu, home">
          <span className="font-display text-xl font-medium">Olivia Ebepu</span>
          <span className="text-xs tracking-wide text-muted-foreground">Marketing research</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/" className={linkClass} data-active={pathname === "/"}>
            Home
          </Link>
          <Link to="/experience" className={linkClass} data-active={pathname === "/experience"}>
            Experience
          </Link>
          <Link
            to="/publications"
            className={linkClass}
            data-active={pathname === "/publications"}
          >
            Publications
          </Link>
          <a href="/#resources" className={`${linkClass} hidden sm:inline-block`}>
            Free templates
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className={`${linkClass} hidden items-center gap-1 sm:inline-flex`}
          >
            Email
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
