# Foundation Giving (`/foundation-giving`)

## Purpose

Present **The Rotary Foundation** club giving as a multi-year financial record
with a currency label (default USD), an **as-of** date, and fund explanations.
This page supports accountability; it does not collect donations.

## Route

- **Path:** `/foundation-giving`
- **Component:** `src/pages/FoundationGiving.tsx`

## Data

- **Source:** Contentful types `foundationGivingReport` (singleton-style: first entry) and `foundationGivingRow` (referenced rows), via `fetchFoundationGiving()` / `useFoundationGiving()`.
- **Cache:** Query key `['foundation-giving']` with yearly cache settings.
  Keep the browser query and build snapshot aligned.

## States

- **Loading:** Centered spinner.
- **Initial error:** Message with retry. A failed refresh keeps a cached report visible.
- **Empty:** Message when no report entry exists.
- **Success:** Report with neutral club banner and subtitle; **table on `md+`**,
  **per-year cards below `md`**. “About these funds” explanations use visible
  headings and Markdown bodies.

## Layout

- Global chrome: `Navbar`, `Footer`.
- **Page header:** Light editorial dossier using `PageHeader`, warm neutral
  surfaces, serif headings, thin rules, and restrained cranberry accents.
  The heading is “The Rotary Foundation giving”, with the report's as-of date.
  The report and explanations use a narrower column below it.
- **Report block:** A full table from `md` up; below `md`, one card per Rotary
  Year with fund lines. The neutral club banner belongs to the report.

## Meta

- **Helmet:** `index, follow`; canonical `https://rotaract.rotaryzcwest.org/foundation-giving`; OG/Twitter with default site image; theme color cranberry.
- **JSON-LD:** `BreadcrumbList` Home → Foundation Giving.

## Requirements (normative)

The system SHALL expose an indexable route `/foundation-giving` with standard site chrome.

The page SHALL present a **page header** (title + description and as-of date when
supplied) consistent with the light editorial dossier used by other record pages.

The page SHALL display a titled report with columns: Rotary Year, Annual Fund, PolioPlus Fund, Other Fund, Endowment Fund, Total; amounts use the currency label from content (default USD).

The page SHALL show an as-of date from content near the report.

On narrow viewports, the report SHALL use a dedicated mobile layout (not only a horizontally scrolled wide table). On `md` and wider, the columnar table MAY be shown.

Below the report, the page SHALL include an FAQ section with at least one explanation per fund column (Annual, PolioPlus, Other, Endowment). Explanations SHALL be visible without interaction (no accordion or other control that hides copy by default).

Each FAQ field from Contentful SHALL be rendered as **GitHub-flavored Markdown** (inline formatting, lists, links), consistent with other CMS Markdown surfaces. Single newlines in a field SHALL produce line breaks on the page. FAQ rendering SHALL NOT execute raw HTML from editor content. Ordered and unordered lists inside FAQ copy SHALL display with visible markers even when the FAQ block sits inside other list layout on the page.

Report figures, report title and subtitle, as-of date, and FAQ copy SHALL load
from Contentful; failed or missing data SHALL not show fabricated numbers.

## Non-goals

- Live Rotary International API integration.
- Multi-currency conversion beyond the displayed label.
- CMS evidence, published figures, and release status need live verification;
  the implemented report layout does not establish those facts.
