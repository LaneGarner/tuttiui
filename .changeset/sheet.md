---
"@tuttiui/react": minor
"@tuttiui/react-native": minor
---

New `Sheet` component family: a bottom-anchored modal panel that slides up
from the edge of the screen, with rounded top corners and a grab handle.

Web (`@tuttiui/react`):

- Parts mirror Dialog: `Sheet`, `SheetOverlay`, `SheetContent`, `SheetHeader`,
  `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` — portal via
  `createPortal`, focus moved into the sheet on open, Escape and overlay click
  close, `role="dialog"` + `aria-modal` + `aria-labelledby`/`describedby`,
  `data-state` attrs.
- `snapPoints` (viewport fractions, e.g. `[0.5, 0.9]`): the sheet opens at the
  first point and dragging up/down moves between points; height animates with
  CSS transitions (`motion-reduce:transition-none`), no animation libraries.
- `dismissOnDrag`: dragging the sheet downward past a threshold closes it
  (pointer events).
- Body scroll is locked while open.

React Native (`@tuttiui/react-native`):

- Same part names wrapping RN `Modal` (`animationType="slide"`, transparent),
  hardware back closes via `onRequestClose`.
- `snapPoints` degrades to the first point as a fixed height (see PARITY.md).
