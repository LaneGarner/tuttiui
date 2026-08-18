---
"@tuttiui/tokens": patch
"@tuttiui/react": patch
---

Guard the px→rem boundary and lock status tint contrast to AA.

- `Textarea`'s `min-h-[80px]` was the one place a component authored a size in
  px past the preset's rem boundary; it is now `min-h-[5rem]` so the field
  scales with browser font size like everything else. An audit of
  `packages/react/src` found no other offenders — remaining literal px are
  hairline borders and the `9999px` pill radius, which are legitimately px.
- The tokens test suite now computes WCAG contrast for every status family's
  `OnSubtle`-on-`Subtle` pairing (primary/success/warning/danger/info) and
  asserts 4.5:1 in both `lightColors` and `darkColors`, so a future Badge tint
  cannot regress below AA. All current pairs already pass (weakest: light
  warning at 6.84:1).
- `@tuttiui/tokens` README documents the rule: px values are authoring units
  only; consumption is rem via the react tailwind preset.
