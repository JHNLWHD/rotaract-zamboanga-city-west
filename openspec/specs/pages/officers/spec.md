# Officers (`/officers`)

## Purpose

Present the published leadership record for the current Rotary Year: executive
board, directors, advisors, and the presidential record.

## Route

- **Path:** `/officers`
- **Component:** `src/pages/Officers.tsx`

## Data

- **Current term:** `getCurrentTerm()` sets the Rotary Year label and query term.
- **Officers:** `useOfficers(currentTerm)` — executive, directors, advisors.
- **Past presidents:** `usePastPresidents()` — separate query.
- Public cards show names, roles, terms, and supplied profile images. The build
  snapshot includes only displayed officer fields. Exclude unused officer email,
  phone, responsibilities, and social profile fields from that snapshot.

## States

- **Loading:** Spinner and “Loading officer records…” while either query is loading.
- **Initial error:** “Officer records are temporarily unavailable.” Retry both
  queries. A failed refresh keeps cached records visible.
- **Empty roster:** “No current officer records have been published yet.”
- **Success:** Executive board, Directors, and Club advisors groups, followed by
  the Presidential record when supplied. Empty groups are omitted. Presidential
  status labels come from the published record.

## Layout

- Light editorial dossier with `Navbar`, `Footer`, and `PageHeader`.
  Heading “Current club officers”, Rotary Year label, ruled officer rows, and
  a separate presidential archive.

## Meta

- JSON-LD `Organization` with `employee` names and roles from the displayed roster;
  canonical `/officers`. No officer contact details are emitted in this JSON-LD.

## Non-goals

- Historical officer terms beyond the presidential record are not specified here.
- A published name and role do not establish an official officer email address.
