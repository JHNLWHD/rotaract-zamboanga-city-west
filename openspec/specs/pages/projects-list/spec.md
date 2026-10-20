# Projects list (`/projects`)

## Purpose

Present dated Contentful project records, newest first, as proof of community
work. Use supplied outcomes and partners without invented aggregate totals.

## Route

- **Path:** `/projects`
- **Component:** `src/pages/Projects.tsx`

## Data

- **Source:** Contentful via `fetchProjects()`, query key `['projects']`, monthly
  cache settings. Preserve the same key and record shape in the build snapshot.
- **Shape:** `ProjectListItem[]` contains the list fields (`id`, `title`, `slug`,
  `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, `image`)
  and optional Contentful modification metadata (`updatedAt`). Detail-only fields
  are loaded by `fetchProjectBySlug`, not on this route.
- Browser refreshes exclude detail URLs outside the deployed route inventory.
  Server builds and local previews can read all matching records.

## States

- **Loading:** `ProjectsLoadingState`.
- **Initial error:** `ProjectsErrorState` with retry. A failed refresh keeps
  cached records visible.
- **Empty:** “No project records have been published yet.”
- **Success:** The first record is featured. Remaining records use `ProjectsGrid`.

## Layout

- Light editorial dossier with `Navbar`, `Footer`, and `PageHeader`. Heading
  “Projects and community work”, latest-record date, one featured record, and
  an “Earlier project records” archive. Record artwork uses contain sizing.

## Meta

- `CollectionPage` JSON-LD with list-item names and URLs from fetched records;
  canonical `/projects`.

## Non-goals

- Individual project body content lives on project detail, not here.

## Requirements (normative)

### Requirement: `/projects` data fetcher returns only list-page fields

The fetcher backing `/projects` (`fetchProjects()`, query key `['projects']` with
monthly cache settings) SHALL return the list fields: `id`, `title`, `slug`,
`shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, and a
featured image URL (`image`). Optional `updatedAt` metadata supports build output.

The fetcher SHALL NOT load detail-only fields when serving the list — specifically `gallery`, `description` (long-form rich text), `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, or `facebookLink`. The TypeScript return type of the list fetcher SHALL reflect this narrower shape (`ProjectListItem[]`) so list-page consumers cannot type-safely access detail-only fields.

#### Scenario: Loading the projects list does not fan out to gallery assets

- **WHEN** the `/projects` page mounts and resolves its `['projects']` React Query
- **THEN** the fetcher performs no Contentful `getAsset` calls for project gallery images, and the resolved data exposes no `gallery` field per project

#### Scenario: List fetcher omits long-form description and detail-only fields

- **WHEN** a consumer reads an item from the resolved `['projects']` query data
- **THEN** the item exposes `id`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, and `image`, and does not expose `description`, `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`, or `gallery`

#### Scenario: List page JSON-LD uses fetched fields only

- **WHEN** `Projects.tsx` builds its `CollectionPage` JSON-LD `itemListElement`
- **THEN** names and URLs use fetched titles and slugs; if a description is
  emitted, it uses `shortDescription`, and no detail-only fields are loaded
