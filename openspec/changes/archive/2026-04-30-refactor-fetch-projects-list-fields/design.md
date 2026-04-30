## Context

`src/hooks/projects/fetchProjects.ts` exports a single `Project` type and two fetchers. `fetchProjects()` is consumed by the Projects list page (`/projects`) via React Query key `['projects']` (`cacheConfig.monthly`), and by `fetchProjectBySlug()` which currently calls `fetchProjects()` and filters in memory. The list page only renders `image`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category` (and `description` solely inside its `CollectionPage` JSON-LD); it never renders `gallery`, `bulletPoints`, `highlights`, `hashtags`, `partnerLinks`, `shareableLink`, or `facebookLink`.

The cost we want to remove is concentrated in the gallery hydration path: for every project, `fetchProjects` performs a `getAsset` call per gallery image (sequential `for` loop). On a typical project list this is the dominant network cost. Rich-text → markdown conversion of the long-form `description` is also unnecessary for the list page.

`fetchEvents.ts` already shows the target pattern: `fetchEventBySlug` fetches a single entry by slug and hydrates its own assets, independent of `fetchEvents`. Projects should mirror that.

## Goals / Non-Goals

**Goals:**

- Reduce network and CPU work performed by `fetchProjects` to only what `/projects` renders.
- Eliminate the per-project gallery `getAsset` fan-out from the list query.
- Keep the project detail page (`/projects/:slug`) functionally unchanged — full data still loads for it, just via a self-contained `fetchProjectBySlug` rather than via `fetchProjects` + filter.
- Make the data contract explicit at the type level so list-only consumers cannot accidentally depend on detail-only fields.

**Non-Goals:**

- Switching to Contentful's `select` / `include` query parameters or GraphQL — out of scope, can be a follow-up.
- Touching `fetchEvents` or any other fetcher.
- Changing React Query keys, cache config, or the `Projects.tsx` UI beyond a JSON-LD field swap.
- Changing Contentful content models.

## Decisions

### Decision 1: Split the `Project` type into list and detail shapes

`fetchProjects` will return `ProjectListItem[]`. `fetchProjectBySlug` will return the full `Project`. `Project extends ProjectListItem` so detail-page code can pass project data through helpers that only need list fields.

```ts
export type ProjectListItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  date: string;
  venue: string;
  impact: string;
  partners: string[];
  category: string;
  image: string; // featured image URL only
};

export type Project = ProjectListItem & {
  description: string; // rich text → markdown
  facebookLink?: string;
  shareableLink: string;
  hashtags: string[];
  highlights: string[];
  gallery: Array<{ id: string; url: string; caption: string; category: string }>;
  bulletPoints: string[];
  partnerLinks?: ProjectPartnerLinks;
};
```

**Why over alternatives:**

- *Single `Project` with all-optional detail fields*: Loses the type-level guarantee that the detail page actually has its data; lets list consumers reach into `gallery` and silently get `[]`.
- *Two unrelated types*: Forces duplicated prop typing on shared list-style components (`ProjectCard`, `ProjectsGrid`) when `ProjectDetail` wants to reuse them.

### Decision 2: `fetchProjectBySlug` fetches its own assets

Mirror `fetchEventBySlug`: query Contentful with `'fields.slug': slug, limit: 1`, then hydrate featured image and gallery assets directly from that single entry. Do not call `fetchProjects()`.

**Why:** `fetchProjects()` will no longer return gallery / detail-only fields, so the current "fetch all + filter" approach simply cannot work. Hydrating one entry's assets is also strictly cheaper than fetching every project's image just to discard all but one.

### Decision 3: `Projects.tsx` JSON-LD uses `shortDescription`

The `CollectionPage` JSON-LD currently sets each list item's `description` to the long markdown `description`. Switch it to `shortDescription`, which is already fetched and is more appropriate for an item-list summary.

**Why over alternatives:**

- *Keep fetching `description` on the list*: Defeats the purpose of the change for a field that is only used in JSON-LD, not visible UI.
- *Drop description from JSON-LD entirely*: Loses SEO signal unnecessarily when `shortDescription` is a clean substitute.

### Decision 4: Keep `cacheConfig.monthly` and the `['projects']` key

No cache key changes — the payload is now smaller but still represents "the projects list". The detail page already has its own `['project', slug]` key via `useProjectBySlug`.

## Risks / Trade-offs

- **Risk:** A consumer outside `Projects.tsx` / `ProjectsGrid` / `ProjectCard` reads `gallery` (or other detail-only fields) off `fetchProjects` results.
  → **Mitigation:** Grep usages of `fetchProjects` and the `Project` import path during implementation; the new `ProjectListItem` type makes the breakage a TypeScript error rather than a silent `undefined`.

- **Risk:** `fetchProjectBySlug` regression — the new direct path could miss a field the detail page relies on.
  → **Mitigation:** Build the detail mapping by copying the existing per-entry mapping out of `fetchProjects`; verify against `ProjectDetail.tsx`, `ProjectMainContent.tsx`, `ProjectSidebar.tsx`, `ProjectBreadcrumb.tsx`, `ProjectGallery*.tsx` consumers.

- **Trade-off:** Some short-term duplication of the entry-to-project mapping logic between the list and detail fetchers. Acceptable because the two shapes now intentionally differ; a shared helper for the common subset can be extracted later if it grows.

- **Risk (very low):** Tooling that introspects React Query cache may notice the `['projects']` payload no longer carries `description`/`gallery`.
  → **Mitigation:** None needed — internal cache, not a public contract.
