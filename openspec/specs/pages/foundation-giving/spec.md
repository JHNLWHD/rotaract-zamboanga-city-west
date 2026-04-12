# Foundation Giving (`/foundation-giving`)

## Purpose

Publish **The Rotary Foundation** club giving as a multi-year report (USD) with an **as-of** date and an FAQ explaining each fund column (Annual, PolioPlus, Other, Endowment).

## Route

- **Path:** `/foundation-giving`
- **Component:** `src/pages/FoundationGiving.tsx`

## Data

- **Source:** Contentful types `foundationGivingReport` (singleton-style: first entry) and `foundationGivingRow` (referenced rows), via `fetchFoundationGiving()` / `useFoundationGiving()`.
- **Cache:** React Query key `['foundation-giving']` with `cacheConfig.monthly`.

## States

- **Loading:** Centered spinner.
- **Error:** Red-bordered message consistent with other CMS list-style pages.
- **Empty:** Message when no report entry exists.
- **Success:** Report (pink club banner, subtitle; **table on `md+`**, **per-year cards below `md`**) and “About these funds” FAQ as always-visible sections (heading + **Markdown-rendered** body per fund; not accordion).

## Layout

- Global chrome: `Navbar`, `Footer`.
- **Page header:** Same inner-page pattern as **`Officers`** (reference implementation): gradient `main` (`from-cranberry-50 via-white to-pink-50`), `pt-32` top spacing, `max-w-7xl mx-auto px-6`, centered large title + subtitle (`text-4xl` / `md:text-5xl`, optional `text-gradient` accent); primary content column `max-w-5xl mx-auto` below the header.
- **Report block:** **giving report** uses a **full table from the `md` breakpoint up**; **below `md`**, a **separate mobile layout** (e.g. one card per Rotary year with fund lines). The in-card pink club banner is report chrome, distinct from the site page header above.

## Meta

- **Helmet:** `index, follow`; canonical `https://rotaract.rotaryzcwest.org/foundation-giving`; OG/Twitter with default site image; theme color cranberry.
- **JSON-LD:** `BreadcrumbList` Home → Foundation Giving.

## Requirements (normative)

The system SHALL expose an indexable route `/foundation-giving` with standard site chrome.

The page SHALL present a **page header** (title + subtitle) consistent with other inner pages (gradient `main`, top padding, centered large heading).

The page SHALL display a titled report with columns: Rotary Year, Annual Fund, PolioPlus Fund, Other Fund, Endowment Fund, Total; amounts use the currency label from content (default USD).

The page SHALL show an as-of date from content near the report.

On narrow viewports, the report SHALL use a dedicated mobile layout (not only a horizontally scrolled wide table). On `md` and wider, the columnar table MAY be shown.

Below the report, the page SHALL include an FAQ section with at least one explanation per fund column (Annual, PolioPlus, Other, Endowment). Explanations SHALL be visible without interaction (no accordion or other control that hides copy by default).

Each FAQ field from Contentful SHALL be rendered as **GitHub-flavored Markdown** (inline formatting, lists, links), consistent with other CMS Markdown surfaces. Single newlines in a field SHALL produce line breaks on the page. FAQ rendering SHALL NOT execute raw HTML from editor content. Ordered and unordered lists inside FAQ copy SHALL display with visible markers even when the FAQ block sits inside other list layout on the page.

Report figures, header text, as-of date, and FAQ copy SHALL load from Contentful; failed or missing data SHALL not show fabricated numbers.

## Non-goals

- Live Rotary International API integration.
- Multi-currency conversion beyond the displayed label.
