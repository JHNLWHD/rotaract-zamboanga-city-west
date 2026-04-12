## 1. Markdown rendering

- [x] 1.1 In `FoundationGiving.tsx`, render each FAQ body with `react-markdown` and `remark-gfm`, following patterns from `ProjectMainContent.tsx` (import style, plugins).
- [x] 1.2 Wrap rendered output in Tailwind `prose` (e.g. `prose prose-slate prose-sm max-w-none`) so lists and paragraphs match the card; adjust spacing so headings inside Markdown do not fight the fixed `h3` fund titles (prefer styling the markdown container, not duplicate page-level `h3` from CMS unless explicitly allowed later).

## 2. Safety and polish

- [x] 2.1 Optionally customize link `components` so external anchors use `rel="noopener noreferrer"` and `target="_blank"` where appropriate.
- [x] 2.2 Confirm empty or whitespace-only FAQ fields do not break layout.

## 3. Verification

- [x] 3.1 Run `npm run type-check`.
- [x] 3.2 Manually verify with sample Markdown in Contentful (bold, list, link) on `/foundation-giving`.

## 4. Documentation (optional)

- [x] 4.1 Add a short note to `scripts/README.md` under Foundation Giving that FAQ fields support Markdown if editors will rely on it.
