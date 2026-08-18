---
"@tuttiui/tokens": patch
"@tuttiui/react": patch
---

Hold action-fill text to WCAG AA (4.5:1) in both themes and lock it in with
contrast tests (DK-02).

- `lightColors.successStrong` darkened green-600 → green-700: OptimisticAction
  `confirmed` rendered white text on `#059669` at 3.77:1; on `#047857` it
  measures 5.48:1. This is a deliberate deviation from the pre-0.3.0 literal —
  action fills carry text the user must read to act.
- New `action fill contrast` test suite asserts `primaryFg` on
  `primary`/`primaryHover`, `dangerFg` on `dangerStrong`/`dangerStrongHover`,
  and `successFg` on `successStrong` all meet 4.5:1 in both light and dark
  sets, so the dark-mode regression DK-02 reported (white on blue-400,
  2.54:1) can never reland. Button already reads `--tt-primary-fg` via
  `text-tt-primary-fg`, so no call-site changes.
- `theme.css` regenerated from the token objects.
