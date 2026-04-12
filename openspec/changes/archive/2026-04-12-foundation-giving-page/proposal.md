## Why

Members and supporters should see how the club supports **The Rotary Foundation** over time, in one place on the public site. Publishing the official-style **5-year club giving** breakdown (in USD) and short **fund explanations** improves transparency and educates visitors without sending them off-site. Doing this now aligns with existing Contentful-driven content elsewhere on the site.

## What Changes

- Add a new public route that presents **Rotary Foundation giving** as a tabular report (Rotary Year × fund columns + totals) with a clear **as-of** date. On **narrow viewports**, the report SHALL use a **distinct layout** from desktop (for example one card or block per Rotary year with fund amounts as labeled rows)—not only a horizontally scrolling copy of the wide table—so figures stay readable without pinch-zooming a six-column grid.
- Add a **FAQ section below the report** explaining what each fund column represents (Annual Fund, PolioPlus, Other, Endowment), written for a general audience. **All FAQ copy SHALL be visible at a glance** (no accordion, tabs, or other pattern that hides explanations behind interaction); use clear headings and body text so users can scan without expanding controls.
- Load report metadata and row data from **Contentful** (new content model and entries), following existing Delivery API + React Query patterns. Any setup or migration **script MUST be additive only**: it SHALL NOT delete, replace, or bulk-remove existing content types, fields, or entries used by other parts of the site.
- Surface the page in **site navigation** (primary nav and/or footer—exact placement decided at implementation).
- Update **SEO** (Helmet, canonical, sitemap) and the **specs index** so the route is documented like other pages.
- **Page header (above the report):** Match the **inner-page pattern** shared with **`Officers`** (same gradient `main`, `pt-32` navbar clearance, `max-w-7xl mx-auto px-6`, centered `text-4xl` / `md:text-5xl` title + `text-gradient` accent and subtitle). Other inner routes (e.g. `Projects`) use the same gradient family but different spacing or container classes; Foundation Giving **SHALL** follow **`Officers.tsx`** as the reference so the header reads like the leadership page, not a bespoke layout. **Concrete parity:** `main` with `flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-32 pb-12`, inner `max-w-7xl mx-auto px-6`, then a `text-center mb-12` block for `h1` + subtitle (`max-w-3xl` on the subtitle); report and FAQ content sit in a **`max-w-5xl mx-auto`** column below that header.

## Capabilities

### New Capabilities

- `pages/foundation-giving`: Public page for TRF 5-year (rolling window) club giving in USD; **page header aligned with other major inner routes** (gradient, spacing, typography); **responsive report presentation** (desktop table + mobile-friendly alternate view); **always-visible** fund FAQ (headings + text, not accordion); Contentful-backed figures and copy; global layout (navbar, footer); loading and error handling consistent with other CMS pages.

### Modified Capabilities

- `seo`: Extend site-wide SEO rules with an explicit pattern for the new indexable route (canonical, robots, OG/Twitter, structured data expectations).

## Impact

- **Frontend:** `src/App.tsx` (route), new page component and any presentational subcomponents, `Navbar` / optional `Footer` links; **inner-page header** styling consistent with e.g. Officers/Projects; **responsive giving report** (separate mobile layout + table at `md+`).
- **Data:** New Contentful content type(s) and entries; optional migration/setup script alongside existing `scripts/setup-contentful-models.js` patterns. Scripts for this change must only create or update foundation-giving-related types and content; they must leave all other models and editorial content for existing features untouched.
- **Dependencies:** Existing `contentful` client (`src/hooks/contentfulClient.ts`), `@tanstack/react-query`.
- **Static assets / deploy:** `public/sitemap.xml` entry for the new URL.
- **Specs:** New `openspec/specs/pages/foundation-giving/spec.md` after archive; delta under this change until then.
