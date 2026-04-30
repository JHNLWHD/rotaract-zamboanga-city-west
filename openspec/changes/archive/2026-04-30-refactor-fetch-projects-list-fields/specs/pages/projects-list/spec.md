# Projects list — delta (`refactor-fetch-projects-list-fields`)

## ADDED Requirements

### Requirement: `/projects` data fetcher returns only list-page fields

The fetcher backing `/projects` (currently `fetchProjects()` in `src/hooks/projects/fetchProjects.ts`, exposed via React Query key `['projects']` with `cacheConfig.monthly`) SHALL return per-project data limited to the fields the Projects list page renders or emits in JSON-LD: `id`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, and a featured image URL (`image`).

The fetcher SHALL NOT load detail-only fields when serving the list — specifically `gallery`, `description` (long-form rich text), `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, or `facebookLink`. The TypeScript return type of the list fetcher SHALL reflect this narrower shape (e.g. `ProjectListItem[]`) so list-page consumers cannot type-safely access detail-only fields.

#### Scenario: Loading the projects list does not fan out to gallery assets

- **WHEN** the `/projects` page mounts and resolves its `['projects']` React Query
- **THEN** the fetcher performs no Contentful `getAsset` calls for project gallery images, and the resolved data exposes no `gallery` field per project

#### Scenario: List fetcher omits long-form description and detail-only fields

- **WHEN** a consumer reads an item from the resolved `['projects']` query data
- **THEN** the item exposes `id`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, and `image`, and does not expose `description`, `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`, or `gallery`

#### Scenario: List page JSON-LD uses fetched fields only

- **WHEN** `Projects.tsx` builds its `CollectionPage` JSON-LD `itemListElement`
- **THEN** each entry's `description` is sourced from `shortDescription` (not from a long-form rich-text `description` field), and every other emitted property is sourced from a field that the list fetcher returns
