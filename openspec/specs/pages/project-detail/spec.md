# Project detail (`/projects/:slug`)

## Purpose

Present one project record: narrative, reported outcome, published highlights,
supporting images, partners, and record details.

## Route

- **Path:** `/projects/:slug`
- **Param:** `slug` — used to load the project.
- **Component:** `src/pages/ProjectDetail.tsx`

## Data

- **Hook:** `useProjectBySlug(slug)` — resolves project by slug from CMS/cache.
- **Shape:** `fetchProjectBySlug` queries Contentful directly for the single matching entry and hydrates the full `Project` shape (list fields plus `description`, `gallery`, `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`). It does not derive data from the `['projects']` list query.

## States

- **Loading:** Spinner and “Loading project record…”, with `Navbar` / `Footer`.
- **Request failure without cached data:** `RecordUnavailable` with retry.
- **Missing record:** A successful fetch returning `null` renders `ProjectNotFound`
  with `noindex, follow`. A failed refresh keeps a cached project visible.

## Layout (success)

- Light editorial dossier rendered by `ProjectDetail.tsx`: `PageHeader`, archive
  link, share button, contain-sized feature artwork, then narrative and supporting
  images beside a record-details column on wide screens.
- **Narrative:** Markdown with published highlights and reported outcome when supplied.
- **Partners:** Published partner links, or partner names when links are absent.
- **Share:** `ShareModal` with `contentType="project"`.
- **Gallery:** Captioned thumbnail buttons open original image URLs in a lightbox.
  Preserve descriptive button names, `aria-haspopup="dialog"`, Enter/Space
  activation, caption or fallback alt text, and close behavior. An empty gallery
  adds no gallery section.

## Meta

- Per-project title, summary, OG/Twitter `article` type, canonical
  `/projects/{slug}`, and `Article` JSON-LD. See the
  [missing-page and deployment rules](../../seo/spec.md).

## Non-goals

- Does not validate `slug` against a separate list before fetch; not-found is entirely driven by hook result.

## Requirements (normative)

### Requirement: `useProjectBySlug` is the sole source of full project detail data

`useProjectBySlug(slug)` SHALL return the full `Project` record from
`fetchProjectBySlug`, including `description` (rich text rendered as Markdown),
`gallery` (with each asset's `id`, `url`, `caption`, `category`), `bulletPoints`,
`highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`, and the
list-shared fields. The page need not display every returned field.

`fetchProjectBySlug` SHALL fetch this data directly from Contentful for the matching entry (including hydrating its featured image and gallery assets) and SHALL NOT depend on the list fetcher (`fetchProjects`) for these fields.

#### Scenario: Detail page receives full project shape

- **WHEN** `/projects/:slug` resolves successfully via `useProjectBySlug`
- **THEN** the returned project exposes `description`, `gallery`, `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`, in addition to the list-shared fields

#### Scenario: Detail fetch is independent of the list query

- **WHEN** `useProjectBySlug(slug)` runs without the `['projects']` list query having been populated
- **THEN** it still resolves the full project shape by querying Contentful for the slug-matching entry directly

#### Scenario: Slug not found

- **WHEN** no Contentful project entry matches the given slug
- **THEN** `fetchProjectBySlug` resolves to `null` and the detail page renders `ProjectNotFound`
