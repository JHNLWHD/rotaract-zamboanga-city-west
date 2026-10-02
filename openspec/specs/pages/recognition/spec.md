# Recognition (`/recognition`)

## Purpose

Present awards, certificates, and citations as dated club records. Show the
issuing organization, source link, and evidence image when supplied. A listed
recognition is not independently verified merely because it is published.

## Route

- **Path:** `/recognition`
- **Component:** `src/pages/Recognition.tsx`

## Data

- Contentful `cardsAwards` records via `fetchAllAwards()`, newest first by
  `dateReceived`. Query key `['recognition']` with yearly cache settings.
- Keep the browser query and build snapshot aligned. Preserve optional issuer,
  source, and image fields without inventing missing evidence.

## States and layout

- Light editorial dossier with `Navbar`, `Footer`, and `PageHeader`. Heading
  “Awards and official citations”, followed by ruled, date-led records.
- **Loading:** Spinner and “Loading recognition records…”.
- **Initial error:** Unavailable message with retry. A failed refresh keeps cached
  records visible, including an empty archive.
- **Empty:** “No recognition records have been published yet.”
- **Success:** Year, name, description, and supplied evidence. Prefer the short
  description; otherwise render the description as Markdown. Images use contain
  sizing and descriptive alt text. Source links open the published source.

## Meta and release status

- Unique title and description, OG/Twitter tags, and canonical `/recognition` on
  the production origin. The build includes this route in its HTML and sitemap.
- Source support for evidence fields does not confirm current CMS values,
  duplicate decisions, or publication. Verify those separately before release;
  see the [publication rules](../../seo/spec.md#content-publication-and-rebuilds).
