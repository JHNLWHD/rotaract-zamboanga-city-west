# Projects list (`/projects`)

## Purpose

Showcase community impact projects from the CMS in a browsable grid, with supporting copy and stats.

## Route

- **Path:** `/projects`
- **Component:** `src/pages/Projects.tsx`

## Data

- **Source:** Contentful via `fetchProjects()` (`src/hooks/projects/fetchProjects.ts`), React Query key `['projects']`, `cacheConfig.monthly`.

## States

- **Loading:** `ProjectsLoadingState`.
- **Error:** `ProjectsErrorState` (receives `error` from query).
- **Success:** `ProjectsGrid` with `projects` array.

## Layout

- `Navbar`, `Footer`, hero-style heading with impact badges (e.g. lives impacted, partners), gradient background.

## Meta

- `CollectionPage` JSON-LD built from fetched projects (when available); breadcrumbs Home → Community Impact; canonical `/projects`.

## Non-goals

- Individual project body content lives on project detail, not here.
