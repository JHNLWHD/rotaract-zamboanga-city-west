# Event detail (`/events/:date/:slug`)

## Purpose

Single-event page: invitation, registration, narrative content, optional gallery with lightbox, share, back navigation.

## Route

- **Path:** `/events/:date/:slug`
- **Params:** `date` and `slug` appear in the URL; **data loading uses `slug` only** via `useEventBySlug(slug)` (`date` is not passed to the hook in `EventDetail.tsx`).
- **Component:** `src/pages/EventDetail.tsx`

## Data

- **Hook:** `useEventBySlug(slug)`.

## States

- **Loading:** Spinner + “Loading event details…”, `Navbar` / `Footer`.
- **Error or missing event:** `EventNotFound` (dedicated UI, not global `NotFound` route).

## Layout (success)

- `BackToEventsButton`, `EventDetailHeader` (share opens `ShareModal`, `contentType="event"`), `EventRegistration`, `EventInvitation` (download uses client-side link + Sonner toast), `EventContent`, optional `EventGallery` + `Lightbox` (captions, download, thumbnails plugins).

## Meta

- Per-event Helmet: OG `event` type, canonical uses `event.shareableLink` (not necessarily the in-app `/events/:date/:slug` URL), JSON-LD `Event` with registration offers when applicable, `BreadcrumbList`.

## Non-goals

- URL `date` segment is not validated against loaded event date in the snippet reviewed; consistency depends on link generation elsewhere.
