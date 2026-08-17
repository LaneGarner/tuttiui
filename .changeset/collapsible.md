---
"@tutti-ui/react": minor
---

New `Collapsible` compound component (`Collapsible` / `CollapsibleTrigger` /
`CollapsibleContent`).

- Controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) modes
- Trigger is a real button with `aria-expanded` and `aria-controls` wired to
  the content via `useId`
- CSS-only expand/collapse using the `grid-template-rows` 0fr/1fr technique —
  no animation libraries, and the transition is disabled under
  `prefers-reduced-motion`
- Content is removed from the accessibility tree while closed
- `data-state="open" | "closed"` on root, trigger, and content as a styling
  hook
