import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { Toaster } from "@/components/ui/sonner";
import { absoluteUrl } from "@/lib/site-config";
import { EMAIL } from "@/lib/site-data";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Olivia Oluchi Ebepu",
  jobTitle: "Marketing Manager",
  email: EMAIL,
  url: absoluteUrl("/"),
  image: absoluteUrl("/og-image.jpg"),
  alumniOf: ["Clark University", "Abia State University"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Worcester",
    addressRegion: "MA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Market Research",
    "Digital Marketing",
    "Workforce Analytics",
    "AI-Assisted Market Intelligence",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Olivia Oluchi Ebepu | Marketing & Market Intelligence" },
      {
        name: "description",
        content:
          "Olivia Oluchi Ebepu, M.S. Marketing — market research, digital campaigns, and AI-supported labor and economic intelligence. Worcester, MA.",
      },
      { name: "author", content: "Olivia Oluchi Ebepu" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0b1020" },
      { property: "og:title", content: "Olivia Oluchi Ebepu | Marketing & Market Intelligence" },
      {
        property: "og:description",
        content:
          "Olivia Oluchi Ebepu works in market research, digital campaigns, and AI-supported workforce intelligence.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Olivia Oluchi Ebepu" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: absoluteUrl("/og-image.jpg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Olivia Oluchi Ebepu — Marketing & Market Intelligence" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Olivia Oluchi Ebepu | Marketing & Market Intelligence" },
      {
        name: "twitter:description",
        content:
          "Olivia Oluchi Ebepu works in market research, digital campaigns, and AI-supported workforce intelligence.",
      },
      { name: "twitter:image", content: absoluteUrl("/og-image.jpg") },
      { "script:ld+json": personSchema },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Sora:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main className="relative">
        <Outlet />
      </main>
      <footer className="mt-8 border-t border-border py-8 text-center">
        <p className="text-base text-muted-foreground">
          Olivia Oluchi Ebepu · Marketing & market research · Worcester, MA
        </p>
      </footer>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
