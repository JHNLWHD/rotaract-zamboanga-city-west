# Project detail — delta (`refactor-fetch-projects-list-fields`)

## ADDED Requirements

### Requirement: `useProjectBySlug` is the sole source of full project detail data

`useProjectBySlug(slug)` (backed by `fetchProjectBySlug` in `src/hooks/projects/fetchProjects.ts`) SHALL load and return all fields the `/projects/:slug` page consumes — including `description` (rich text rendered as Markdown), `gallery` (with each asset's `id`, `url`, `caption`, `category`), `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`, plus the list-shared fields (`id`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, `image`).

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
