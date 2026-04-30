## Why

`fetchProjects()` currently hydrates every field on a project — including `gallery`, which fans out to one extra Contentful `getAsset` call per gallery image, plus rich-text → markdown for the long-form `description`, and other detail-only fields. The Projects list page (`/projects`) only renders a small subset (image, title, slug, short description, date, venue, impact, partners, category), so we are paying a meaningful network/CPU cost for data that is never displayed there. Trimming the list query also makes the React Query cache for `['projects']` lighter and faster to (de)serialize on every page mount.

## What Changes

- Refactor `fetchProjects(limit?, category?)` in `src/hooks/projects/fetchProjects.ts` to return only the fields the Projects list page actually consumes (id, title, slug, shortDescription, date, venue, impact, partners, category, image). Skip gallery asset fetches, skip `description` rich-text conversion, and skip detail-only fields (`bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, `facebookLink`).
- **BREAKING (internal):** Split the `Project` type into a list-shape (`ProjectListItem`) used by `fetchProjects` / `ProjectsGrid` / `ProjectCard`, and a full-detail shape (`Project`) used by `fetchProjectBySlug` / `ProjectDetail`. Consumers of `fetchProjects` lose access to gallery and other detail-only fields.
- Rewrite `fetchProjectBySlug(slug)` so it builds a full `Project` directly from the single matching Contentful entry (including gallery assets, rich-text description, etc.) instead of calling `fetchProjects()` and filtering — `fetchProjects` no longer returns the data the detail page needs.
- Update `Projects.tsx` JSON-LD to use `shortDescription` (already fetched) instead of the dropped `description`.

## Capabilities

### New Capabilities
<!-- None - this change reshapes existing data fetching, no new spec capabilities -->

### Modified Capabilities
- `pages/projects-list`: Tighten the **Data** contract for `/projects` so its fetcher only loads list-page fields and explicitly does not load gallery or detail-only data.
- `pages/project-detail`: Clarify that `useProjectBySlug` / `fetchProjectBySlug` is the sole source of full-detail project data and fetches it directly (no longer derived from the list query).

## Impact

- **Code:**
  - `src/hooks/projects/fetchProjects.ts` — split types, slim `fetchProjects`, rewrite `fetchProjectBySlug` to fetch its own assets.
  - `src/pages/Projects.tsx` — JSON-LD uses `shortDescription`.
  - `src/components/projects/ProjectsGrid.tsx`, `src/components/projects/ProjectCard.tsx` — typed against `ProjectListItem`.
- **Runtime:** Fewer Contentful `getAsset` calls on `/projects` (no per-project gallery fan-out) and a smaller cached payload under React Query key `['projects']`.
- **Spec docs:** `openspec/specs/pages/projects-list/spec.md` and `openspec/specs/pages/project-detail/spec.md` updated to reflect the new data boundaries.
- **Out of scope:** `fetchEvents` shape, other pages, and Contentful `select`/`include` query params (can be a follow-up further optimization).
