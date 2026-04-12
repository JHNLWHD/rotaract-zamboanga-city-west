## Why

The “About these funds” copy is stored in Contentful but rendered as **plain text**, so editors cannot use **bold**, lists, or short links without those characters showing literally. Treating FAQ fields as **Markdown** matches patterns already used on the site (e.g. project descriptions) and keeps editorial control in the CMS without a deploy.

## What Changes

- Render each fund’s FAQ body on `/foundation-giving` through a **Markdown pipeline** (`react-markdown`, aligned with existing usage such as `ProjectMainContent`).
- Apply **readable typography** (e.g. Tailwind `prose`) so lists, emphasis, and paragraphs from Markdown look intentional and consistent with the rest of the page.
- **Document** in design (and optionally Contentful field help) that the four FAQ fields are **Markdown**, not raw HTML; no change to the “always visible, no accordion” rule.

## Capabilities

### New Capabilities

_(none — behavior extends the existing Foundation Giving page spec.)_

### Modified Capabilities

- `pages/foundation-giving`: Normative requirement that FAQ copy from Contentful is **rendered as Markdown** (safe subset via the chosen renderer); visibility and non-accordion behavior unchanged.

## Impact

- **Frontend:** `FoundationGiving.tsx` (and optionally a small shared Markdown wrapper), imports for `react-markdown` / `remark-gfm` if not already colocated.
- **Dependencies:** None new — `react-markdown` and `remark-gfm` are already project dependencies.
- **Contentful:** FAQ fields remain the same four text fields; editors adopt Markdown in content (optional script or Management API change only if we later widen field types for very long copy — **out of scope** unless validation errors appear).
- **Specs:** Delta under this change; main `openspec/specs/pages/foundation-giving/spec.md` updated on archive.
