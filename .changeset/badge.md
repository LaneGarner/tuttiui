---
"@tutti-ui/react": minor
---

New `Badge` component — pill-shaped inline status label.

- Variants: `default` / `primary` / `success` / `warning` / `info`, tinted
  with the semantic status tokens (`*-subtle` fills, `*-on-subtle` text) so
  both themes stay accessible with no `dark:` variants
- Sizes `sm` / `md`
- `info` marks informational states (merges, overrides); `warning` is
  reserved strictly for states that need a decision from the user
- `span` element with `forwardRef`, `data-variant` / `data-size` styling hooks
