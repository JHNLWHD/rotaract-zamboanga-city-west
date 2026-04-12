# SEO (site-wide)

## Purpose

Define how the public site exposes metadata for search engines and social platforms. The implementation is **per-page** via `react-helmet` in `src/pages/*.tsx`. This spec captures **cross-cutting rules** and **page-type patterns**; route-specific composition is summarized in [`pages/`](../pages/) specs.

## Stack

- **Library:** `react-helmet` — each routed page mounts a `<Helmet>` tree for that view.
- **Runtime:** Client-rendered SPA; crawlers see tags as produced by React on each route (ensure hosting/prerender strategy matches product expectations).

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

| Context | `robots` |
|---------|----------|
| All primary content routes (home, lists, details, officers, foundation giving) | `index, follow` with snippet/image/video preview directives where set |
| NotFound (404) | `noindex, nofollow` |

### Images

- **Default OG/Twitter image** for many routes: `https://rotaract.rotaryzcwest.org/og-image.png`.
- **Events list** Twitter image: `/images/events-og-image.jpg` (absolute URL in code).
- **Project detail:** `og:image` / `twitter:image` use the project’s primary image URL from CMS.
- **Event detail:** Uses invitation image or event image (absolute or site-prefixed).

### Theme color

- **Home:** `#dc2626` (red).
- **Other major pages:** `#BE185D` (cranberry) for `theme-color` / `msapplication-TileColor` where set.

### Icons and PWA hints

- Home Helmet includes favicon links, `apple-touch-icon`, `site.webmanifest`, `application-name`, Apple web app title — align new top-level pages if you add shared head helpers.

## Page-type SEO patterns

### Home (`/`)

- Full SEO surface: title, meta title/description/keywords, author, robots, viewport, geo, OG, Twitter, theme, icons, canonical, font preconnects.
- **JSON-LD:** `Organization` (contact, address, sameAs, awards, etc.) and `WebSite` with `SearchAction` pointing at `https://rotaract.rotaryzcwest.org/search?q={search_term_string}` — if on-site search is not implemented, treat this as **technical debt** or confirm intent with marketing.
- **Third-party scripts** in head (e.g. chat): documented in home page spec; consider impact on CLS and crawl budget.

### List pages (`/projects`, `/events`)

- **`CollectionPage`** JSON-LD with `ItemList` / item entries derived from fetched data when available.
- Breadcrumbs in JSON-LD: Home → section name.
- Canonical matches path under `rotaract.rotaryzcwest.org`.

### Detail pages (`/projects/:slug`, `/events/:date/:slug`)

- **OG `type`:** `article` for projects; **`event`** for event detail.
- **Canonical:** Project uses `/projects/{slug}`. Event detail uses **`event.shareableLink`** as canonical and `og:url` — may differ from the in-app path; document any SEO implications when share URLs change.
- **JSON-LD:** `Project` + `BreadcrumbList` (projects); `Event` (rich: location, offers, registration) + `BreadcrumbList` (events).

### Officers (`/officers`)

- **JSON-LD:** `Organization` with `employee` populated from loaded officer data; breadcrumbs Home → leadership.

### Foundation Giving (`/foundation-giving`)

- **Canonical / `og:url`:** `https://rotaract.rotaryzcwest.org/foundation-giving`.
- **`robots`:** `index, follow` (primary content).
- **JSON-LD:** `BreadcrumbList` Home → Foundation Giving; avoid asserting financial `Dataset` precision unless product requires it.
- **Images:** Default site OG image unless a dedicated asset is added later.

### NotFound

- Title and description for error UX; **`noindex, nofollow`**; canonical `https://rotaract.rotaryzcwest.org/404`.
- See [specs README](../README.md#catch-all-and-notfound).

## Structured data summary

| Schema.org type | Where used |
|-----------------|------------|
| `Organization` | Home, officers (different shapes), project/event organizers |
| `WebSite` | Home |
| `CollectionPage` | Projects list, events list |
| `ItemList` | Inside collection pages |
| `Project` | Project detail; project items in list JSON-LD |
| `Event` | Event detail; event items in list JSON-LD |
| `BreadcrumbList` | Projects, events, officers, foundation giving, project detail, event detail |

## Requirements (maintenance)

1. **New route:** Add or reuse Helmet patterns consistent with the closest page type (list vs detail); set canonical to the stable public URL; choose `robots` intentionally (index vs noindex).
2. **CMS-driven pages:** Titles, descriptions, and images must remain accurate when content changes; avoid duplicate or empty descriptions in JSON-LD.
3. **Social previews:** Ensure each indexable page has at least title, description, and a valid absolute image for OG/Twitter where previews matter.

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

