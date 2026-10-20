# Events list (`/events`)

## Purpose

Present dated Contentful event records. Show upcoming events first, followed by
a clearly labeled past-activity archive. A past date alone does not prove that
an event took place.

## Route

- **Path:** `/events`
- **Component:** `src/pages/Events.tsx`

## Data

- **Source:** Contentful via `fetchEvents()`, query key `['events']`, monthly
  cache settings. Keep the browser query and build snapshot aligned.
- Records include the published event fields and available media. Request
  failures reject; a missing optional image does not discard the record.
- Browser refreshes filter detail URLs against the deployed route inventory,
  including the calendar-date segment. Server builds and local previews can
  read all matching records.

## States

- **Loading:** `LoadingState`.
- **Initial error:** `ErrorState` with retry. A failed refresh keeps cached
  records visible.
- **Empty:** “No event records have been published yet.”
- **Success:** Separate `EventsGrid` groups for upcoming events and past activities.
  Each card can open `ShareModal` (`contentType="event"`).

## Behavior

- `isPastEvent` separates upcoming and past records using the club's timezone.
  Time labels hydrate with the build time, then update to the visit time.
- If only past records exist, show the no-upcoming-event notice above the archive.
- **Share:** Modal receives title, description, date, venue, shareable link, time, category from the selected event.

## Layout

- Light editorial dossier with `Navbar`, `Footer`, and `PageHeader`. Heading
  “Events and club activities”, published record count, ruled “Upcoming events”
  and “Past activities” groups, and contain-sized record artwork.

## Meta

- `CollectionPage` JSON-LD with list-item names and URLs from fetched events;
  canonical `/events`.

## Non-goals

- Single-event deep content is on event detail, not this list.
