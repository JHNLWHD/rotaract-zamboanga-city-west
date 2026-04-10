# Home (`/`)

## Purpose

Marketing and onboarding: present the club, programs, awards, membership call-to-action, and contact. Primary landing experience for the public site.

## Route

- **Path:** `/`
- **Component:** `src/pages/Index.tsx`

## Layout and composition

- Global chrome: `Navbar`, `Footer`.
- **Main:** `Hero`, `About`, `Programs`, `Awards`, `Join`, `Contact` (under `src/components/home/`).
- **Scroll:** `IntersectionObserver` adds `revealed` to elements with class `reveal-on-scroll` on enter.

## Data

- No remote data fetch on this page; content is static in components.

## Meta and scripts

- Extensive `react-helmet` tags: title, description, OG/Twitter, geo, theme, icons, canonical (`rotaryzcwest.org`), JSON-LD (`Organization`, `WebSite` with `SearchAction`).
- External scripts: Botpress webchat inject + club script.

## Non-goals

- Does not list CMS-driven projects or events (those are separate routes).
