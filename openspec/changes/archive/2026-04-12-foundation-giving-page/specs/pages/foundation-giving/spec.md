# Foundation Giving (`/foundation-giving`)

## ADDED Requirements

### Requirement: Public route and layout

The system SHALL expose an indexable route `/foundation-giving` that renders within the standard site chrome (`Navbar`, `Footer`) and is reachable without authentication. The **page-level header** (title and subtitle above the report) SHALL match **`Officers.tsx`**: shared gradient on `main` (`from-cranberry-50 via-white to-pink-50`), `pt-32` (and `pb-12` as on Officers), `max-w-7xl mx-auto px-6`, centered `text-4xl` / `md:text-5xl` heading with optional `text-gradient`, subtitle as used on Officers; report and FAQ content SHALL sit in a **`max-w-5xl mx-auto`** column below that header block.

#### Scenario: Visitor opens the page

- **WHEN** a visitor navigates to `/foundation-giving`
- **THEN** the page loads with global navigation and footer consistent with other public pages

#### Scenario: Header matches inner-page style

- **WHEN** the page renders
- **THEN** the area above the giving report shows a centered page title and subtitle with spacing and typography consistent with other inner pages (not a one-off compact header)

### Requirement: Rotary Foundation giving report

The page SHALL display a titled report for **The Rotary Foundation** club giving that includes a tabular breakdown by **Rotary Year** with numeric columns for **Annual Fund**, **PolioPlus Fund**, **Other Fund**, **Endowment Fund**, and **Total**, with all amounts labeled in **USD** (or the currency label provided by content).

#### Scenario: Report shows five years of data

- **WHEN** content includes multiple Rotary years
- **THEN** each year appears as a row with the five numeric columns populated from content

#### Scenario: Currency clarity

- **WHEN** the page renders the report
- **THEN** the user sees that amounts are in US Dollars or the configured currency label from content

### Requirement: Responsive report layout

On **narrow viewports** (below the site’s chosen breakpoint, e.g. Tailwind `md`), the giving report SHALL **not** rely solely on horizontal scrolling of a wide multi-column table. The page SHALL provide an **alternate layout** (such as one block per Rotary year with fund labels and amounts stacked vertically) so fund figures remain easy to read on a phone. On **wider viewports**, the page MAY show the full columnar table.

#### Scenario: Mobile-friendly layout

- **WHEN** the viewport is narrow enough to trigger the mobile layout
- **THEN** the user sees a non-table presentation of the same numeric data (e.g. per-year cards or stacked rows) without requiring horizontal panning to understand each fund amount

#### Scenario: Desktop table

- **WHEN** the viewport is at or above the desktop breakpoint
- **THEN** the user may see the full tabular layout with column headers as appropriate

### Requirement: Report effective date

The report SHALL show an **as-of** or **effective date** indicating when the figures were current.

#### Scenario: As-of date visible

- **WHEN** the page displays the report
- **THEN** an as-of date from content is visible on the page (for example in a footer line near the table)

### Requirement: Fund FAQ section

Below the report, the page SHALL include an FAQ section that explains what each **fund type** (Annual Fund, PolioPlus, Other, Endowment) represents, using plain language suitable for visitors unfamiliar with Rotary Foundation terminology. Fund explanations SHALL be **visible without interaction** (no accordion, disclosure widgets, or tab panels that hide body copy by default).

#### Scenario: FAQ follows the report

- **WHEN** the user scrolls past the giving report (table or mobile layout)
- **THEN** they find a distinct FAQ section with at least one explanation per fund column (excluding Total unless explicitly added as educational copy)

#### Scenario: FAQ is readable at a glance

- **WHEN** the FAQ section is rendered
- **THEN** all fund explanations are shown as expanded text (e.g. heading + paragraph per fund) without requiring the user to click or tap to reveal content

### Requirement: Contentful-backed content

Report figures, header text, as-of date, and FAQ copy SHALL be loaded from Contentful via the Delivery API using the existing client pattern; the page SHALL NOT require hard-coded giving amounts for production beyond optional fallbacks for development.

#### Scenario: Successful load

- **WHEN** Contentful returns valid entries for the foundation giving report
- **THEN** the page renders the report and FAQ from that data

#### Scenario: Load failure

- **WHEN** Contentful returns an error or empty required data
- **THEN** the page shows a user-visible error or empty state consistent with other CMS-driven pages and does not show misleading numbers

### Requirement: Caching

The client SHALL cache foundation giving fetches with React Query using a stable query key dedicated to this page.

#### Scenario: Repeat visits

- **WHEN** the user revisits the page within the cache window
- **THEN** the app may serve cached data without refetching on every mount, consistent with project cache conventions
