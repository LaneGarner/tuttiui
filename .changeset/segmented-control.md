---
"@tuttiui/react": minor
---

New `SegmentedControl` compound component (`SegmentedControl` / `Segment`).

- Connected pill of mutually exclusive options; the active segment gets the
  raised/filled treatment, `data-state="active" | "inactive"` on segments
- Radiogroup semantics: `role="radiogroup"` on the group, `role="radio"` +
  `aria-checked` on segments, arrow-key navigation that moves focus and
  selects (wrapping, plus Home/End) matching native radio behavior
- Controlled only: `value` + `onChange`
- Sizes `sm` / `md`, group-level and per-segment `disabled`
