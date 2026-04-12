# SEO (site-wide) — delta for Foundation Giving

## ADDED Requirements

### Requirement: Foundation Giving route metadata

The `/foundation-giving` route SHALL use `react-helmet` with `index, follow` robots, a unique title and meta description, canonical URL `https://rotaract.rotaryzcwest.org/foundation-giving`, and Open Graph / Twitter tags consistent with other indexable inner pages (including absolute `og:url` and a valid image URL).

#### Scenario: Social and crawler signals

- **WHEN** the Foundation Giving page is rendered
- **THEN** `robots` allows indexing and following, and `link rel="canonical"` points to `/foundation-giving` on the production origin

#### Scenario: Structured data

- **WHEN** the page includes JSON-LD
- **THEN** it includes at least a `BreadcrumbList` from Home to the current page title, and does not assert unsupported schema types for tabular financial data
