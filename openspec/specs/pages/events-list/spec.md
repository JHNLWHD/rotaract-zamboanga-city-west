# Events list (`/events`)

## Purpose

Promote club events (“Great West in Action”): hero, scroll to full list, optional share per event card.

## Route

- **Path:** `/events`
- **Component:** `src/pages/Events.tsx`

## Data

- **Source:** `fetchEvents()` (`src/hooks/events/fetchEvents.ts`), React Query key `['events']`, `cacheConfig.monthly`.

## States

- **Loading:** `LoadingState`.
- **Error:** `ErrorState` with `error`.
- **Success:** `EventsGrid` with `onShareEvent` opening `ShareModal` (`contentType="event"`).

## Behavior

- Hero CTA “View All Events” smooth-scrolls to `#all-events`.
- **Share:** Modal receives title, description, date, venue, shareable link, time, category from the selected event.

## Layout

- Cranberry gradient banner, then “Club Highlights” section with grid.

## Meta

- `CollectionPage` JSON-LD with `ItemList` of events (when loaded); breadcrumbs Home → Great West in Action; canonical `/events`.

## Non-goals

- Single-event deep content is on event detail, not this list.
