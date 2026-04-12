# Specs index

## Site SEO

Cross-cutting search and social metadata rules (Helmet, canonical URLs, JSON-LD, robots): **[seo/spec.md](seo/spec.md)**.

## Pages (per route)

Behavioral documentation for each route template lives under [`pages/`](pages/). Implementation entry points are `src/pages/*.tsx` and `src/App.tsx` routes.

| Route | Spec | Page component |
|-------|------|----------------|
| `/` | [Home](pages/home/spec.md) | `Index.tsx` |
| `/projects` | [Projects list](pages/projects-list/spec.md) | `Projects.tsx` |
| `/projects/:slug` | [Project detail](pages/project-detail/spec.md) | `ProjectDetail.tsx` |
| `/officers` | [Officers](pages/officers/spec.md) | `Officers.tsx` |
| `/foundation-giving` | [Foundation Giving](pages/foundation-giving/spec.md) | `FoundationGiving.tsx` |
| `/events` | [Events list](pages/events-list/spec.md) | `Events.tsx` |
| `/events/:date/:slug` | [Event detail](pages/event-detail/spec.md) | `EventDetail.tsx` |

## Catch-all and NotFound

Routes that do not match any path above are handled by React Router’s `path="*"` and render `NotFound` (`src/pages/NotFound.tsx`).

- **Behavior:** Full layout (navbar, footer), 404 messaging, primary CTA to home (`/`), secondary “go back” via history, quick links to `/events`, `/projects`, `/officers`.
- **SEO:** `noindex, nofollow`; canonical points at `/404` (see Helmet in component).
- **Observability:** Logs the attempted pathname to the console on mount.

There is no separate page spec file for NotFound; changes to global routing or this screen should stay aligned with `App.tsx` and `NotFound.tsx`.
