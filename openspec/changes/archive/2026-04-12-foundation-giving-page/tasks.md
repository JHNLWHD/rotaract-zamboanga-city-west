## 1. Contentful model and seed data

- [x] 1.1 Define content types for foundation giving report and rows (and FAQ fields per design); extend or script via `scripts/setup-contentful-models.js` pattern
- [x] 1.2 Add migration or manual entry steps to load the approved 5-year USD snapshot and as-of date
- [x] 1.3 Document content editor steps in script README or inline comments if non-obvious
- [x] 1.4 Verify setup/migration changes are **additive only**: no deletion or bulk removal of other Contentful content types, fields, or entries used outside foundation giving

## 2. Data layer and hooks

- [x] 2.1 Add typed `getEntries` / `getEntry` fetch for foundation giving (skeleton types in `src/hooks/`)
- [x] 2.2 Expose `useFoundationGiving` (or equivalent) with React Query and appropriate stale/cache settings
- [x] 2.3 Map Contentful fields to view models (numbers, labels, ordered rows, FAQ strings)

## 3. Page UI

- [x] 3.1 Create `src/pages/FoundationGiving.tsx` (or split presentational components) with report table and responsive overflow
- [x] 3.2 Implement FAQ section below the report with always-visible fund blurbs (heading + text per fund; not accordion)
- [x] 3.3 Add loading and error states aligned with other CMS pages

## 4. Routing and navigation

- [x] 4.1 Register `/foundation-giving` in `src/App.tsx`
- [x] 4.2 Add primary nav item (and optional footer link) with agreed labels

## 5. SEO and discoverability

- [x] 5.1 Add Helmet tags, canonical, OG/Twitter, and Breadcrumb JSON-LD per spec
- [x] 5.2 Add URL to `public/sitemap.xml` with appropriate `lastmod` / priority
- [x] 5.3 Add `openspec/specs/pages/foundation-giving/spec.md` and row in `openspec/specs/README.md` (post-archive or alongside implementation per workflow)

## 6. Verification

- [x] 6.1 Run `npm run type-check` and fix issues
- [x] 6.2 Smoke-test route locally with valid Contentful env vars
- [x] 6.3 Cross-check figures and as-of date against the source report
