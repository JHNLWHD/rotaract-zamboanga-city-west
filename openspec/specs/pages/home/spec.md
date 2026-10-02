# Home (`/`)

## Purpose

Present proof of the club's legitimacy, activity, and accountability. Put Rotary
affiliation, club records, leadership, recognition, Foundation giving, and
contact information first. Participation is a supported secondary action.

## Route

- **Path:** `/`
- **Component:** `src/pages/Index.tsx`

## Layout and composition

- Global chrome: `Navbar`, `Footer`.
- **Main, in order:** `Hero`, `Credentials`, `About`, `Contact`, and `Join`
  when intake is open (under `src/components/home/`).
- **Design:** Light editorial dossier with warm neutral surfaces, serif
  headings, thin rules, and restrained cranberry accents.
- **Hero:** Club identity and Rotary affiliation, including the sponsoring club
  and institutional links. Get to Know Great West links to `#club-profile`.
  View Our Projects links to `/projects` (current label: “View our projects”).
- **Club records:** Up to three recent projects, current leadership, up to three
  recognition records, and the latest Foundation giving row with its as-of date.
  Each section links to its full record page. Missing records do not produce
  invented totals or evidence.
- **Contact:** Club email, social links, and a Netlify contact form with sending,
  success, and error states. Local form submission simulates success; it does
  not verify delivery on a deployed host.

## Data

- Contentful supplies hero copy, the club profile and image, projects, current
  officers, recognition, and Foundation giving. Query keys include
  `['heroContent']`, `['aboutContent']`, and `['homepageEvidence', term]`.
- Hero and profile queries use yearly cache settings. The combined club records
  query uses monthly cache settings. Keep browser data and build snapshots aligned.
- Project records are filtered against the deployed route inventory before the
  homepage selects three. Server builds and local previews have no such filter.
- `Credentials` has loading and initial-request-error states with retry. `About`
  has a loading state and a missing-copy message; `Hero` uses its existing copy
  and image fallbacks. A failed refresh keeps cached query data. See the
  [snapshot rules](../../seo/spec.md).

## Seasonal intake

- **Approved intent:** Open applications only during the annual intake period.
  Outside it, show “Applications closed — get notified next cycle” with a
  notification action.
- **Current:** `APPLICATIONS_OPEN` is true only when
  `VITE_MEMBERSHIP_APPLICATIONS_OPEN` equals `true`. `Join` then shows the existing
  application form, and desktop and mobile navigation show “Applications open”.
- **Gap:** When the flag is false or unset, `Join` returns no content and the
  application navigation links are hidden. The current
  [membership config](../../../../src/config/membership.ts),
  [Join](../../../../src/components/home/Join.tsx), and
  [Navbar](../../../../src/components/layout/Navbar.tsx) have no closed-intake
  notification action or interest-form setting. That action needs a separate
  runtime change and a confirmed destination.

## Meta and scripts

- `react-helmet` supplies the page title, description, OG/Twitter tags, geo tags,
  light theme color, production canonical, and `Organization` JSON-LD with
  affiliation, sponsor, and public club contact details. There is no site search.
- The shared [HTML shell](../../../../index.html) keeps the Botpress chatbot
  “Ask the club” on all routes. Preserve its quiet launcher and public-record role.
- Preserve local draft review and branch/deploy-preview noindex protection;
  see the [publication and rebuild rules](../../seo/spec.md#content-publication-and-rebuilds).

## Non-goals

- The homepage summarizes club records. Full project, event, recognition,
  officer, and Foundation giving records have separate routes.
- This spec records the closed-intake gap; it does not authorize its implementation
  or establish current CMS publication or deployment status.
