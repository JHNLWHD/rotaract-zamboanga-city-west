## Context

The site is a Vite + React SPA using React Router, `react-helmet` for SEO, and Contentful’s **Content Delivery API** via `src/hooks/contentfulClient.ts`. Projects, events, officers, and homepage sections already follow a consistent pattern: typed `getEntries` / `getEntry` calls, asset helpers in `src/utils/contentful.ts`, and React Query for caching. The club has an official-style **5-year club giving** report (USD) and wants it published with an educational FAQ. Editorial updates should not require a code deploy for numeric or as-of changes.

## Goals / Non-Goals

**Goals:**

- Model **giving rows** and **report header fields** (title, subtitle, as-of date, currency label) in Contentful so club officers can update numbers after each Rotary report.
- Provide a **stable public URL** (recommended: `/foundation-giving`) with list-page–style SEO (indexable, canonical, OG).
- Render the **FAQ** after the report, covering the four fund columns plus optional short context for “Total” if needed (Total is derived in UI from row amounts; FAQ focuses on fund types).
- Present FAQ copy **fully expanded by default**: stacked sections with a **heading + paragraph** (or definition list) per fund so explanations are **scannable at a glance**. **Do not use Accordion, `<details>` disclosure, or tabs** for this block—those patterns hide content behind interaction and conflict with the “at a glance” requirement.
- **Responsive giving report:** From a breakpoint upward (e.g. `md`), show the full **HTML table** as today. Below that breakpoint, show a **different view**—typically **one card (or section) per Rotary year** with fund names and amounts in a vertical list or definition list—so users are not expected to read a six-column table via horizontal scroll alone.
- **Page header / hero alignment:** The **page-level** title and subtitle (above the giving report card) SHALL match **`Officers.tsx`** (not `Projects`, which uses `container` + different top padding): `main` uses the shared **cranberry/pink gradient** (`from-cranberry-50 via-white to-pink-50`), **`pt-32 pb-12`** for navbar clearance and section rhythm, content width **`max-w-7xl mx-auto px-6`**, centered **large heading** (`text-4xl` / `md:text-5xl`), optional **`text-gradient` accent** on a key phrase, and a **subtitle** (`text-lg`, `max-w-3xl mx-auto` where used). Primary report + FAQ content is constrained with **`max-w-5xl mx-auto`** below the header block. The **report-specific** pink banner inside the data card remains editorial/report styling; it is separate from this site chrome header.

**Non-Goals:**

- Live integration with Rotary International APIs or automated imports from RI systems.
- Multi-currency display or conversion (USD only for this iteration unless requirements change).
- Admin UI inside this repo (editors use Contentful).

## Decisions

1. **Content model (recommended)**  
   - **Option A (preferred):** One **singleton** content type `foundationGivingReport` with fields: `asOfDate` (Date), `reportTitle` (Short text), `subtitle` (Short text), `currencyLabel` (Short text, default “USD”), and a **References** field to many `foundationGivingRow` entries (or embedded table-like structure if the team prefers fewer entry types).  
   - **Option B:** Single entry with **JSON object** field for rows—faster to ship but weaker validation in Contentful.  
   **Choice:** Prefer **Option A** for per-row validation (numbers per fund) and clearer editorial workflow. Final field list is implemented in setup/migration script to match existing `scripts/setup-contentful-models.js` style.

2. **Row identity and ordering**  
   Rows SHALL include a **Rotary Year** label (e.g. `RY 2025-2026`) and numeric fields for each fund + optional stored total for cross-check. Ordering: **sort order** integer on each row, or sort by year string in the client—prefer **explicit order** field if years are not naturally sortable as strings.

3. **FAQ content**  
   Store FAQ as either **Rich text** on the singleton, **repeatable Q&A** child entries, or **fixed copy in code** for v1. **Recommendation:** **Contentful** long text or rich text fields per question (Annual, PolioPlus, Other, Endowment) on the same singleton so copy edits do not require deploys. Fallback: ship FAQ as static module if Contentful scope slips. **UI:** render as always-visible sections (see Goals)—not accordion.

4. **Fetching and cache**  
   Use React Query with a key such as `['foundation-giving']` and stale time aligned with other monthly-ish club data (see `cacheConfig` patterns in existing hooks).

5. **Structured data**  
   Use a minimal **BreadcrumbList** (Home → Foundation Giving) and optional **`WebPage`** or **`Dataset`**-like description only if it does not overstate precision; otherwise stick to Organization breadcrumbs consistent with `/officers`.

6. **Responsive breakpoint for report layout**  
   Use the same Tailwind **`md`** breakpoint as elsewhere (`768px`): table view at `md` and above; stacked **year cards** below `md`. Keeps one clear switch between layouts.

7. **Contentful scripts are additive-only**  
   Setup or migration scripts for this feature SHALL **only** create or update content types and entries that belong to foundation giving. They MUST **not** delete, replace, or bulk-remove existing content models, fields, or editorial entries used by projects, events, officers, homepage, or any other part of the site. If the shared `setup-contentful-models.js` pattern is extended, gate new logic so it cannot wipe unrelated types (no shared “reset space” behavior for this change).

## Risks / Trade-offs

- **[Risk]** Editors enter inconsistent totals vs. column sums → **Mitigation:** UI may compute Total from columns and show warning in dev or optional validation note in Contentful help text.  
- **[Risk]** Contentful outage → **Mitigation:** Error state with retry-friendly message (same pattern as projects/events).  
- **[Risk]** Migration script collateral damage to other content → **Mitigation:** Additive-only scripts per decision 7; code review; test against a sandbox space when possible.  
- **[Trade-off]** Singleton + many row entries vs. one JSON blob → validation vs. migration effort (prefer singleton + rows).

## Migration Plan

1. Add content types (and optional migration script) to the target Contentful space using **additive-only** operations—no deletion or overwrite of unrelated models or entries.  
2. Enter initial data matching the approved 5-year snapshot and as-of date.  
3. Deploy frontend; verify staging then production.  
4. **Rollback:** Revert deploy; content can remain in Contentful without breaking older builds if the route is removed.

## Open Questions

- Exact **nav label** (“Foundation”, “TRF Giving”, etc.) and whether to add a **footer** quick link in addition to the navbar.  
- Whether **FAQ** must be fully CMS-driven in v1 or can ship as static TS/MD for the first release.
