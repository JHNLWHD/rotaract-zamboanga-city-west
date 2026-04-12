## Context

- `foundationGivingReport` exposes four FAQ fields (`faqAnnualFund`, `faqPolioPlus`, `faqOther`, `faqEndowment`) as Contentful **Text**; the app maps them to strings and prints them inside `<p>` tags in `FoundationGiving.tsx`.
- The codebase already renders CMS-sourced Markdown elsewhere using **`react-markdown`** and **`remark-gfm`** (e.g. `ProjectMainContent.tsx`), with `@tailwindcss/typography` available for `prose` classes.

## Goals / Non-Goals

**Goals:**

- Interpret each FAQ string as **GitHub-flavored Markdown** (lists, emphasis, links, paragraphs) and render it in the “About these funds” section.
- Keep the **four fixed fund headings** (Annual, PolioPlus, Other, Endowment) in the UI so the table columns stay clearly tied to explanations — Markdown applies to the **body** under each heading unless product later moves to a single Rich Text blob.
- Use the **same library stack** as other pages to avoid a second markdown dialect or dependency.

**Non-Goals:**

- Switching FAQ storage to Contentful **Rich Text** JSON (would require `@contentful/rich-text-react-renderer` and model migration).
- Allowing raw HTML embeds from editors — rely on `react-markdown`’s default (no `rehype-raw`) so arbitrary HTML is not executed.
- Accordion or hidden FAQ content (still forbidden).

## Decisions

1. **Renderer:** `react-markdown` + `remark-gfm` — **Rationale:** Already in `package.json` and proven in `ProjectMainContent`. **Alternative:** `marked` + `dangerouslySetInnerHTML` — rejected (XSS and inconsistency).

2. **Where to render:** Replace each FAQ `<p>{data.faq.*}</p>` with a wrapper, e.g. `<ReactMarkdown remarkPlugins={[remarkGfm]}>` inside a `div` with `prose prose-slate prose-sm` (and `max-w-none` if the parent constrains width). Tweak `components` if we need links to open in a new tab for external URLs only.

3. **Empty content:** If a field is empty after trim, render nothing under that heading or hide the list item — **match current behavior** (empty string still shows structure); prefer showing the heading with an empty body only if we already do — today empty string yields blank paragraph; acceptable.

4. **Contentful model:** **No schema change** for v1 — Text fields accept multi-line Markdown. If editors need validation text, add help text in the Contentful UI manually; optional follow-up: migration script to append “Markdown supported” to field descriptions (additive-only if using Management API).

## Risks / Trade-offs

- **[Risk]** Editors paste Word-style HTML → **Mitigation:** It appears as text or is stripped; document Markdown-only in README/scripts.
- **[Risk]** Long Markdown breaks layout → **Mitigation:** `prose` + `max-w-none` within the existing card.

## Migration Plan

1. Ship UI change; editors update Contentful copy to use Markdown where useful.
2. **Rollback:** Revert the component to plain text if needed; CMS content remains valid plain text.

## Open Questions

- Whether external links in FAQ should force `rel="noopener noreferrer"` via custom `components.a` (recommended; small addition in implementation).
