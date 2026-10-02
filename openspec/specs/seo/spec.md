# SEO (site-wide)

## Purpose

Define how the public site exposes metadata for search engines and social platforms. The implementation is **per-page** via `react-helmet` in `src/pages/*.tsx`. This spec captures **cross-cutting rules** and **page-type patterns**; route-specific composition is summarized in [`pages/`](../pages/) specs.

## Stack

- **Library:** `react-helmet` — each routed page mounts a `<Helmet>` tree for that view.
- **Runtime:** Build-time HTML from the existing React pages and published Contentful records, followed by React hydration and normal client navigation. `src/prerender.tsx` loads public page data. `scripts/prerender.js` writes route HTML, `sitemap.xml`, and `404.html` after Vite builds.

## Canonical site URL

- Meta tags, OG/Twitter URLs, and JSON-LD in code use **`https://rotaract.rotaryzcwest.org`** as the production origin (canonical links, `og:url`, structured data `@id` / `url` fields where applicable).
- The repository README may reference other deploy URLs; **SEO truth in markup follows the domain above** unless intentionally changed in code.

## Global conventions

### Brand and locale

- **Site / organization names** in copy and structured data: “Rotaract Club of Zamboanga City West”, alternate names such as “Great West” where used in schema.
- **Geography:** Meta includes `geo.region` (`PH-ZAM`), `geo.placename` (Zamboanga City) on index and inner pages where present.
- **Language:** `Content-Language` / `language` meta set to English where defined.

### Twitter

- **Handles:** `@RotaractZCWest` for `twitter:site` and `twitter:creator` on pages that include Twitter tags.
- **Cards:** Mostly `summary_large_image`; NotFound uses `summary`.

### Robots

| Context                                                                                   | `robots`                                                                    |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| All public record routes (home, lists, details, officers, recognition, Foundation giving) | Indexable by default, with explicit robots and preview directives where set |
| NotFound (404)                                                                            | `noindex, nofollow`                                                         |

Branch and deploy-preview build configuration selects `X-Robots-Tag: noindex,
nofollow` and a crawling block in `robots.txt`. Preserve that protection even
though canonical URLs point at production. Verify live headers per deployment.
A client-side missing project or event adds `noindex, follow`. A temporary CMS
failure is retryable and is not a missing record.

### Images

- **Default OG/Twitter image** for many routes: `https://rotaract.rotaryzcwest.org/og-image.png`.
- **Project detail:** `og:image` / `twitter:image` use the project’s primary image URL from CMS, with the site image as fallback.
- **Event detail:** Uses the event or invitation image, with the site image as fallback.
- **Browser images:** `responsiveImage` supplies responsive WebP copies of supported public Contentful JPEG, PNG, and WebP assets. Local, external, vector, and animated assets remain unchanged. Original CMS URLs stay available to downloads, lightboxes, and metadata. See the [Contentful Images API](https://www.contentful.com/developers/docs/references/images-api/images/retrieve-an-image/).
- **Record artwork:** Feature images, archive thumbnails, and certificates use contain sizing so poster text is not cropped. Documentary gallery thumbnails can still crop; their lightbox opens the original image.

### Theme color

- The document shell and home use the light editorial background `#faf9f7`. Foundation metadata still has a cranberry theme override.

### Icons and PWA hints

- `index.html` supplies existing favicon assets, `apple-touch-icon`, `site.webmanifest`, and application names. Page titles and descriptions come only from Helmet; do not add a second fixed description to the shell.

## Page-type SEO patterns

### Home (`/`)

- Page title and description, keywords, author, robots, geo, OG/Twitter, theme,
  and canonical come from Helmet. The HTML shell supplies viewport, icons,
  and font loading.
- **JSON-LD:** `Organization` with club identity, affiliation, sponsor and public contact details. Do not invent an on-site search action.
- The shared HTML shell loads the chatbot; see the [home spec](../pages/home/spec.md#meta-and-scripts).

### List pages (`/projects`, `/events`)

- **`CollectionPage`** JSON-LD with `ItemList` / item entries derived from fetched data when available.
- Canonical matches path under `rotaract.rotaryzcwest.org`.

### Detail pages (`/projects/:slug`, `/events/:date/:slug`)

- **OG `type`:** `article` for both detail templates.
- **Canonical:** Project uses `/projects/{slug}`. Event uses `/events/{calendar-date}/{slug}` under the production origin, not an arbitrary share URL from the CMS.
- **JSON-LD:** `Article` for project detail and `Event` for event detail. Serialize embedded data with `serializeJson` to prevent CMS strings from closing a script element.
- **Event time:** Use the known local start time with the Philippine UTC offset. If the time is unknown, use the calendar date only. Do not emit a fabricated midnight or the invalid `EventCompleted` enumeration. A past date alone does not prove that the event took place; use neutral past wording.
- Dates display in the club's timezone. Time-dependent labels hydrate with the build timestamp and update after hydration, so an older snapshot does not cause a mismatch at the next visit.

### Officers (`/officers`)

- **JSON-LD:** `Organization` with `employee` populated from displayed officer names and roles. Do not embed unused officer email, phone, or other private profile fields in the static query snapshot.

### Recognition (`/recognition`)

- Unique title and description, production canonical, and OG/Twitter tags.
  Records show issuer, source, and evidence images only when supplied.
- CMS evidence and publication status require a separate check; the route and
  field support do not establish that every recognition has verified evidence.

### Foundation Giving (`/foundation-giving`)

- **Canonical / `og:url`:** `https://rotaract.rotaryzcwest.org/foundation-giving`.
- **`robots`:** `index, follow` (primary content).
- **JSON-LD:** `BreadcrumbList` Home → Foundation Giving; avoid asserting financial `Dataset` precision unless product requires it.
- **Images:** Default site OG image unless a dedicated asset is added later.

### NotFound

- Title and description for error UX; **`noindex, nofollow`**; canonical `https://rotaract.rotaryzcwest.org/404`.
- See [specs README](../README.md#catch-all-and-notfound).
- The configured Netlify output uses generated `404.html` with HTTP 404 for an
  unknown route. Preserve the removal of the SPA-wide HTTP 200 rewrite. On
  hydration, retain the missing page for the requested path, while allowing
  later navigation to valid routes. Verify live status codes for each release.

## Structured data summary

| Schema.org type  | Where used                                      |
| ---------------- | ----------------------------------------------- |
| `Organization`   | Home, officers, project author, event organizer |
| `CollectionPage` | Projects list, events list                      |
| `ItemList`       | Inside collection pages                         |
| `Article`        | Project detail                                  |
| `Event`          | Event detail                                    |
| `BreadcrumbList` | Foundation giving                               |

## Requirements (maintenance)

1. **New route:** Add or reuse Helmet patterns consistent with the closest page type (list vs detail); set canonical to the stable public URL; choose `robots` intentionally (index vs noindex).
2. **CMS-driven pages:** Titles, descriptions, and images must remain accurate when content changes; avoid duplicate or empty descriptions in JSON-LD.
3. **Social previews:** Ensure each indexable page has at least title, description, and a valid absolute image for OG/Twitter where previews matter.
4. **Static output:** Add new static routes to `loadPages`. Dynamic project and event routes come from all published records, including paginated CMS collections. Unsafe or duplicate route paths must fail the build.
5. **Sitemap:** Generate it from the same route list as the HTML. Use Contentful modification timestamps for detail pages. Omit unknown modification dates; do not use activity dates as modification dates.
6. **Build failures:** Missing required CMS content, failed requests, invalid generated metadata, or incomplete collections must stop the build. Keep the existing coverage and lint deployment gates.

## Content publication and rebuilds

Static HTML reflects the published Contentful snapshot at build time. Browser
queries and build snapshots must use the same query keys and record shapes.
The browser refreshes public query data after hydration without replacing cached
records with a loading or error screen. Request failures must reject rather than
replace cached records with empty data. CMS drafts are never used by this pipeline.

Officer entries in public query snapshots contain only displayed fields; omit
unused officer contact and profile fields. Every snapshot includes the build route
inventory. Project and event archives filter refreshed records against it. The
homepage selects its three projects after that filter. Existing records can
refresh. New detail URLs wait for a successful build and deployment. Server
builds and local draft reviews have no deployed route restriction.

Local draft review uses Contentful's read-only Preview API on `127.0.0.1`; see
the [README](../../../README.md#local-contentful-draft-review). It is separate
from Contentful publication, generated build output, and verified deployment.
Missing preview credentials stop draft mode. Preserve that separation.

Before releasing the static build, configure and verify a Contentful webhook to the appropriate Netlify build hook. It must rebuild after entry or asset publication, unpublication, and deletion. Content type publication may also require a rebuild. The CMS environment is shared with production; do not create hooks, publish content, or trigger a production build without the user's approval. Build-hook URLs are credentials and must not be committed.

After a controlled publication, verify that the matching Netlify deployment succeeds, its initial HTML contains the changed content, removed paths return 404, and the sitemap matches the same published records. This external publication check is separate from local build verification.

Current CMS evidence, duplicate decisions, draft/publication versions, active
webhooks, approved OG assets, and the matching live release are unverified by
source inspection. Historical handoffs are routing context, not current release
evidence. Resolve and verify those facts in their separately approved scopes.

## Related documentation

- [Specs index](../README.md) — route table and NotFound note.
- Per-route behavior: [`pages/`](../pages/) — each `spec.md` lists Helmet/JSON-LD highlights for that template.

## Additional requirements

### Foundation Giving route metadata

The `/foundation-giving` route SHALL use `react-helmet` with `index, follow` robots, a unique title and meta description, canonical URL `https://rotaract.rotaryzcwest.org/foundation-giving`, and Open Graph / Twitter tags consistent with other indexable inner pages (including absolute `og:url` and a valid image URL).

#### Scenario: Social and crawler signals

- **WHEN** the Foundation Giving page is rendered
- **THEN** `robots` allows indexing and following, and `link rel="canonical"` points to `/foundation-giving` on the production origin

#### Scenario: Structured data

- **WHEN** the page includes JSON-LD
- **THEN** it includes at least a `BreadcrumbList` from Home to the current page title, and does not assert unsupported schema types for tabular financial data
