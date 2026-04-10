# Project detail (`/projects/:slug`)

## Purpose

Full story for a single project: narrative, media gallery (lightbox), partners, share, sidebar metadata.

## Route

- **Path:** `/projects/:slug`
- **Param:** `slug` — used to load the project.
- **Component:** `src/pages/ProjectDetail.tsx`

## Data

- **Hook:** `useProjectBySlug(slug)` — resolves project by slug from CMS/cache.

## States

- **Loading:** Centered spinner + “Loading project details…”, with `Navbar` / `Footer`.
- **Error or missing project:** `ProjectNotFound` (full replacement UI, not global 404 route).

## Layout (success)

- `ProjectBreadcrumb`, two-column grid: `ProjectMainContent` (primary + share trigger), `ProjectSidebar`.
- **Share:** `ShareModal` with `contentType="project"`; opens from main content callback.
- **Lightbox:** Styles imported from `yet-another-react-lightbox` (+ captions, thumbnails) — used within `ProjectMainContent` for gallery behavior.

## Meta

- Per-project title, description, OG/Twitter, `article` type, canonical `/projects/{slug}`, JSON-LD `Project` + `BreadcrumbList`.

## Non-goals

- Does not validate `slug` against a separate list before fetch; not-found is entirely driven by hook result.
