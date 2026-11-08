# Site context

The website's primary purpose is to prove that the club is legitimate, active,
and accountable. Put verifiable Rotary affiliation, current leadership,
projects, recognition, Foundation giving, and contact information first.
Participation is a supported secondary action.

The current decision is [ADR 0002](docs/adr/0002-legitimacy-as-primary-purpose.md).
It supersedes the participation-first decision in ADR 0001.

## Domain glossary

### Proof

Verifiable records of the club's affiliation, leadership, community work,
recognition, Foundation giving, and contact information.

### Club record

A dated account or directory entry supplied by the club. A published record
can support proof; its presence alone does not verify its claims.

### Participation

Joining the club, volunteering, or starting a community partnership.

### Foundation giving

The club's reported contributions to The Rotary Foundation, grouped by Rotary
Year and fund, with a currency label and an as-of date. This is a financial
record, not a donation checkout.

### Intake period

The annual period when membership applications are open. Outside this period,
the approved direction is a notification action for the next intake period.

## Maintainer guidance

- Preserve the light editorial dossier: warm neutral surfaces, serif headings,
  thin rules, and restrained cranberry accents. Keep the chatbot and the two
  distinct homepage actions: Get to Know Great West and View Our Projects.
- Keep Contentful as the record source. Use the existing club contact details;
  add totals, officer contact details, or source evidence only after verification.
- Read the [page specs](openspec/specs/README.md) for current behavior and labeled
  gaps. Closed intake currently has no notification action; see the
  [home spec](openspec/specs/pages/home/spec.md#seasonal-intake).
- Keep local draft review, publication, build output, and verified deployment
  distinct. Read the [release rules](openspec/specs/seo/spec.md#content-publication-and-rebuilds)
  before publication or build-hook work. Those actions require separate approval.
