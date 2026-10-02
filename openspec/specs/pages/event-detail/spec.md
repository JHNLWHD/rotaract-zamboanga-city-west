# Event detail (`/events/:date/:slug`)

## Purpose

Present one event record: narrative, published agenda and highlights,
supporting images, invitation, registration when applicable, and record details.

## Route

- **Path:** `/events/:date/:slug`
- **Params:** `date` and `slug` appear in the URL. Data loading uses `slug` only
  via `useEventBySlug(slug)`; the date is not passed to the hook.
- **Component:** `src/pages/EventDetail.tsx`

## Data

- **Hook:** `useEventBySlug(slug)`.
- Query key `['event', slug]`. The slug fetcher returns the full Contentful event
  record independently of the events-list query. Missing records resolve to
  `null`; request failures reject. Optional media failures preserve the record.

## States

- **Loading:** Spinner and “Loading event record…”, `Navbar` / `Footer`.
- **Request failure without cached data:** `RecordUnavailable` with retry.
- **Missing record:** A successful fetch returning `null` renders `EventNotFound`
  with `noindex, follow`. A failed refresh keeps a cached event visible.

## Layout (success)

- Light editorial dossier rendered by `EventDetail.tsx`: `PageHeader`, archive
  link, share button, contain-sized feature artwork, then narrative and supporting
  images beside a record-details column on wide screens.
- **Narrative:** Markdown, published highlights, and agenda when supplied.
- **Status:** Past event, Registration open, or Upcoming, derived from the date
  and supplied status. Past wording does not assert attendance or completion.
- **Registration:** Show the supplied link only when the event is not past.
- **Invitation:** Preserve the original invitation URL for download through a
  client-side link. Show published requirements when supplied.
- **Share:** `ShareModal` with `contentType="event"`.
- **Gallery:** Captioned thumbnail buttons open original image URLs in a lightbox.
  Preserve descriptive button names, `aria-haspopup="dialog"`, Enter/Space
  activation, caption or fallback alt text, and close behavior. An empty gallery
  adds no gallery section.

## Meta

- Per-event title and summary, OG/Twitter `article` type, canonical
  `/events/{calendar-date}/{slug}` on the production origin, and `Event` JSON-LD.
  A CMS share URL does not replace the canonical URL. Registration offers appear
  only when the event is not past and a registration URL exists.
- Use the known local start time with the Philippine UTC offset, or only the
  calendar date when the time is unknown. See the
  [SEO and missing-page rules](../../seo/spec.md).

## Non-goals

- Client-side slug loading does not validate the URL date segment. The build
  generates detail routes from published dates, and refreshed archives retain
  only routes in the deployed inventory. Do not claim arbitrary date paths are
  generated or served as valid pages.
