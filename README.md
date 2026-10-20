# Rotaract Zamboanga City West

Welcome to the official repository for the Rotaract Zamboanga City West website!

The website's primary purpose is proof of the club's legitimacy, activity, and
accountability. It presents affiliation, leadership, projects, recognition,
Foundation giving, and contact information in a light editorial dossier.
Participation is a supported secondary action.

## Project Info

- **Canonical public URL in source:** [Rotaract Zamboanga City West](https://rotaract.rotaryzcwest.org/). Verify the live deployment separately.
- **Domain guidance:** Read [CONTEXT.md](CONTEXT.md) before changes and [ADR 0002](docs/adr/0002-legitimacy-as-primary-purpose.md) for the current purpose and design decision.
- **Page behavior specs:** [openspec/specs/README.md](openspec/specs/README.md) (route index and per-page documentation).

## Tech Stack

This project is built with:

- [Bun](https://bun.sh/) – Fast all-in-one JavaScript runtime
- [Vite](https://vitejs.dev/) – Next Generation Frontend Tooling
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript at Any Scale
- [React](https://react.dev/) – A JavaScript library for building user interfaces
- [shadcn/ui](https://ui.shadcn.com/) – Beautifully designed UI components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [PostHog](https://posthog.com/) – Product analytics suite

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- [Bun](https://bun.sh/) (Install via `curl -fsSL https://bun.sh/install | bash`)

### Installation & Development

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies:**
   ```sh
   bun install
   ```
3. **Start the development server:**
   ```sh
   bun run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080) by default.

## Pull request tests

Every pull request runs the **Tests and coverage** GitHub Actions check on
Node.js 22. It installs the locked dependencies with `npm ci` and runs
`npm run test:coverage`. A failed test or coverage threshold fails the check.
No Contentful credentials are needed. Netlify also keeps its existing test,
lint, and build checks.

## Local Contentful draft review

Set `VITE_CONTENTFUL_PREVIEW_TOKEN` in your ignored `.env.local`, using the
preview token associated with the existing Contentful delivery API key. Then run:

```sh
npm run dev:drafts
```

This binds to `127.0.0.1` and reads the latest entries and asset captions through
Contentful's read-only Preview API. Refresh the page after changing a draft.
Nothing is published. Do not expose this local server or its token publicly.
Regular development, `build`, and `build:dev` continue to use published content.
Missing preview credentials stop draft mode instead of silently showing live copy.

## Publication and deployment

### Develop draft review

The `develop` branch uses `npm run build:draft-review`. It reads project and
event drafts at build time and marks every page as a draft preview. Other
sections still use published records. The browser reads a saved record snapshot;
rebuild develop to review later Contentful edits.

Use `CONTENTFUL_PREVIEW_TOKEN` as the server-side credential. When Netlify
supports granular scopes, use **Builds** scope and a value only for `develop`.
The current host already has `VITE_CONTENTFUL_PREVIEW_TOKEN`; the guarded build
can reuse it and removes that variable before Vite runs. It is never used by
the hosted review browser.
The build fails when access is missing or when invoked in a production context.
Production and other preview branches keep their existing published-content
builds. Draft review output has `noindex, nofollow` protection; this controls
indexing, not access to the review URL.

For a local check, supply the server-side token to `npm run build:draft-review`
and serve `dist` locally. The build does not publish entries or assets.

### Release states

Keep these states distinct:

- **Local draft review:** The read-only Preview API shows unpublished edits.
- **Publication:** An approved Contentful publication changes the public record.
- **Build output:** The build uses published records to generate route HTML,
  public-only query snapshots, the sitemap, and `404.html`.
- **Verified deployment:** Check the matching Netlify deployment, initial HTML,
  headers, sitemap, and missing-route HTTP status on the live host.

Preserve branch and deploy-preview `noindex, nofollow` protection, real HTTP 404
responses, and cached records when a browser refresh fails. New project and event
links appear only when their detail routes exist in the deployed snapshot.

CMS publication and build-hook changes require separate approval. Local checks
do not verify current CMS evidence, draft/publication versions, active hooks, OG
asset approval, or release status. See the
[SEO and release rules](openspec/specs/seo/spec.md#content-publication-and-rebuilds)
for the remaining external checks. Seasonal intake intent and its current
closed-intake gap are in the [home spec](openspec/specs/pages/home/spec.md#seasonal-intake).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
