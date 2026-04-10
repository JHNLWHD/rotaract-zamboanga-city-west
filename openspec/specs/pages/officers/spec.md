# Officers (`/officers`)

## Purpose

Introduce club leadership for the current Rotary year: executive board, directors, advisors, and past presidents.

## Route

- **Path:** `/officers`
- **Component:** `src/pages/Officers.tsx`

## Data

- **Current term:** `getCurrentTerm()` from `src/data/officers` (drives badge label and officer fetch).
- **Officers:** `useOfficers(currentTerm)` — executive, directors, advisors.
- **Past presidents:** `usePastPresidents()` — separate query.

## States

- **Loading:** Single spinner while either officers or past presidents query is loading.
- **Error:** Red message: “Failed to load officers. Please try again later.”
- **Success:** Renders `ExecutiveBoard`, `BoardOfDirectors`, `ClubAdvisors`, `PastPresidents` in order.

## Layout

- Heading “Our Leadership”, Rotary year badge, sections as above. Gradient background, top padding for header clearance.

## Meta

- JSON-LD `Organization` with `employee` derived from loaded officers (combined executive + directors + advisors); `BreadcrumbList` Home → Great West Leadership; canonical `/officers`.

## Non-goals

- Historical officer terms beyond “past presidents” section are not specified on this page alone.
