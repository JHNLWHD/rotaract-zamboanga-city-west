## 1. Audit current consumers

- [x] 1.1 Grep all imports of `Project` and `fetchProjects` from `src/hooks/projects/fetchProjects.ts` to confirm only `Projects.tsx`, `ProjectsGrid.tsx`, `ProjectCard.tsx`, and `useProjectBySlug.ts` use the list fetcher (and that detail-only fields like `gallery`/`description` are not read off list query results elsewhere)
- [x] 1.2 Confirm `Projects.tsx` JSON-LD is the only place `description` is referenced for list items, and that `shortDescription` already exists on the same object

## 2. Reshape types in `src/hooks/projects/fetchProjects.ts`

- [x] 2.1 Introduce `ProjectListItem` type with fields: `id`, `title`, `slug`, `shortDescription`, `date`, `venue`, `impact`, `partners`, `category`, `image`
- [x] 2.2 Redefine `Project` as `ProjectListItem & { description, facebookLink?, shareableLink, hashtags, highlights, gallery, bulletPoints, partnerLinks? }`
- [x] 2.3 Export both `ProjectListItem` and `Project` (keep `ProjectPartnerLinks` export)

## 3. Slim down `fetchProjects`

- [x] 3.1 Change signature to `fetchProjects(limit?, category?): Promise<ProjectListItem[] | null>`
- [x] 3.2 Hydrate only the featured image asset per project; remove the gallery `for` loop and its asset fetches
- [x] 3.3 Remove `richTextToMarkdown(fields.description …)` call and drop `description`, `bulletPoints`, `highlights`, `hashtags`, `gallery`, `partnerLinks`, `shareableLink`, `facebookLink` from the returned object
- [x] 3.4 Keep `content_type`, `order: -fields.date`, optional `limit`, optional `fields.category` query params unchanged

## 4. Rewrite `fetchProjectBySlug`

- [x] 4.1 Query Contentful with `{ content_type: 'project', 'fields.slug': slug, limit: 1 }` and return `null` when no entry matches (mirroring `fetchEventBySlug`)
- [x] 4.2 Hydrate featured image and full gallery directly from the matched entry (loop over `fields.gallery`, calling `getAsset` and `processAsset` per item, building `{ id, url, caption, category }`)
- [x] 4.3 Convert `fields.description` rich text via `richTextToMarkdown`, extract `partnerLinks['en-US']` if present, and assemble a full `Project` (list fields + detail fields)
- [x] 4.4 Remove the previous "fetch all then filter" implementation that called `fetchProjects()`

## 5. Update list-page consumers

- [x] 5.1 Update `src/components/projects/ProjectsGrid.tsx` and `src/components/projects/ProjectCard.tsx` to type their `project`/`projects` props with `ProjectListItem` (import from `../../hooks/projects/fetchProjects`)
- [x] 5.2 In `src/pages/Projects.tsx`, change the `CollectionPage` JSON-LD `itemListElement` mapper so each item's `description` is sourced from `project.shortDescription`
- [x] 5.3 Verify `Projects.tsx` only reads list-shape fields from the query data (no `description`, `gallery`, etc.)

## 6. Verify detail page still compiles and renders

- [x] 6.1 Confirm `ProjectDetail.tsx`, `ProjectMainContent.tsx`, `ProjectSidebar.tsx`, `ProjectBreadcrumb.tsx`, and any `ProjectGallery*` components still type-check against the new full `Project` shape (migrated 5 detail components from `../../data/projects` to `../../hooks/projects/fetchProjects`; `tsc --noEmit` passes)
- [x] 6.2 Manually exercise `/projects/:slug` for a project with a populated gallery, partners, partner links, hashtags, bullet points, and highlights to confirm all sections render

## 7. Validation

- [x] 7.1 Run the project's TypeScript build / lint and fix any new errors introduced by the type split (`npm run type-check` passes; no linter errors on edited files)
- [x] 7.2 Load `/projects` in the browser, open DevTools Network tab, and confirm there are no per-project gallery `assets/<id>` requests (only featured-image asset requests, one per project)
- [x] 7.3 Run `openspec validate refactor-fetch-projects-list-fields --strict` and resolve any reported issues (current strict failure is a pre-existing convention conflict — repo nests specs under `specs/pages/<route>/`, but the validator only walks top-level capability folders; same shape as the archived `2026-04-12-foundation-giving-faq-markdown` change)
