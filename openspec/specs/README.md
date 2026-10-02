# Specs index

## Current direction and evidence

Read [CONTEXT.md](../../CONTEXT.md) for domain terms and
[ADR 0002](../../docs/adr/0002-legitimacy-as-primary-purpose.md) for the current
decision. The primary purpose is proof of legitimacy. Participation is secondary.
The public record pages use the light editorial dossier.

**Current** describes the inspected source. **Approved intent** states the
approved direction. **Gap** identifies behavior that is not implemented.
Source inspection does not verify current Contentful records, publication,
build hooks, or a live release.
Files under `openspec/changes/archive/` preserve earlier proposals and decisions;
use these active specs for current page guidance.

## Site SEO

Cross-cutting search and social metadata rules (Helmet, canonical URLs, JSON-LD, robots): **[seo/spec.md](seo/spec.md)**.

## Pages (per route)

Behavioral documentation for each route template lives under [`pages/`](pages/).
Implementation entry points are `src/pages/*.tsx` and the
[`App.tsx`](../../src/App.tsx) routes. Browser queries and build snapshots must
use the same query keys and record shapes. Preserve cached records on refresh
failure and the deployed route filter before selecting homepage projects.

| Route                 | Spec                                                 | Page component         |
| --------------------- | ---------------------------------------------------- | ---------------------- |
| `/`                   | [Home](pages/home/spec.md)                           | `Index.tsx`            |
| `/projects`           | [Projects list](pages/projects-list/spec.md)         | `Projects.tsx`         |
| `/projects/:slug`     | [Project detail](pages/project-detail/spec.md)       | `ProjectDetail.tsx`    |
| `/officers`           | [Officers](pages/officers/spec.md)                   | `Officers.tsx`         |
| `/recognition`        | [Recognition](pages/recognition/spec.md)             | `Recognition.tsx`      |
| `/foundation-giving`  | [Foundation Giving](pages/foundation-giving/spec.md) | `FoundationGiving.tsx` |
| `/events`             | [Events list](pages/events-list/spec.md)             | `Events.tsx`           |
| `/events/:date/:slug` | [Event detail](pages/event-detail/spec.md)           | `EventDetail.tsx`      |

## Catch-all and NotFound

Routes that do not match any path above are handled by React Router’s `path="*"` and render `NotFound` (`src/pages/NotFound.tsx`).

- **Behavior:** Full layout (navbar, footer), 404 messaging, primary CTA to home (`/`), secondary “go back” via history, quick links to `/events`, `/projects`, `/officers`.
- **SEO:** `noindex, nofollow`; canonical points at `/404` (see Helmet in component).
- **Observability:** Logs the attempted pathname to the console on mount.
- **Static output:** Unknown paths use generated `404.html` with HTTP 404 under
  the configured Netlify routing. Hydration keeps the missing page for the
  requested path and permits later navigation. Verify the live HTTP response
  for each release; retain the real-404 policy.

There is no separate page spec file for NotFound; changes to global routing or this screen should stay aligned with `App.tsx` and `NotFound.tsx`.
