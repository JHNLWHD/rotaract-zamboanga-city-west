# Foundation Giving — delta (`foundation-giving-faq-markdown`)

## ADDED Requirements

### Requirement: FAQ bodies render Markdown from Contentful

The system SHALL treat each of the four FAQ strings supplied by `foundationGivingReport` (`faqAnnualFund`, `faqPolioPlus`, `faqOther`, `faqEndowment`) as **Markdown** and SHALL render them using the same Markdown stack as other site surfaces that consume CMS Markdown (`react-markdown` with `remark-gfm`). The “About these funds” section SHALL remain **always visible** (no accordion, disclosure, or tabs). Rendering SHALL NOT enable raw HTML passthrough from editor content (no unescaped HTML execution from FAQ fields).

#### Scenario: Inline formatting and lists

- **WHEN** a FAQ field contains CommonMark / GFM constructs such as emphasis, bullet lists, or links
- **THEN** the page shows formatted text (not the literal `*` or `#` characters from basic Markdown syntax) in the fund’s FAQ body under the existing fixed fund heading

#### Scenario: No accordion

- **WHEN** the FAQ section is displayed
- **THEN** all fund explanations remain visible without requiring expand/collapse interaction
