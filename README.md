# Olivia Oluchi Ebepu — Portfolio

Personal portfolio for Olivia Oluchi Ebepu, M.S. Marketing — market research,
digital campaigns, business development, and AI-supported labor and economic
intelligence. Based in Worcester, MA.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
- Tailwind CSS v4
- Framer Motion

## Development

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

Set `VITE_SITE_URL` to the live domain after the first deploy, and update
`public/sitemap.xml` and `public/robots.txt` to match.

## Routes

| File | URL |
| --- | --- |
| `src/routes/index.tsx` | `/` |
| `src/routes/experience.tsx` | `/experience` |
| `src/routes/publications.tsx` | `/publications` |
| `src/routes/__root.tsx` | app shell |

Contact opens the visitor's email app addressed to `ebepuolivia@yahoo.com`.

Visits, template downloads, and publication views are stored in `data/site-stats.json` through `/api/stats`. A visit counts once per browser session. Opening Publications counts one view of that page and one view of each paper, once per session. Downloading a template adds one to that file's count.
