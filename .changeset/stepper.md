---
"@tutti-ui/react": minor
---

New `Stepper` component: a compact quantity control (− value +) for cart and
list UIs.

- Controlled API: `value` + `onChange(next)`, with `min` (default 0) and
  optional `max`; buttons disable at the bounds and values clamp.
- `role="spinbutton"` with `aria-valuenow`/`min`/`max`, a required
  `aria-label`, labeled Decrease/Increase buttons, and ArrowUp/ArrowDown +
  Home/End keyboard support.
- ~36px visual control inside a guaranteed hit area (`hitSlop`, default 44px)
  baked in via a pseudo-element so consumers cannot ship an undersized touch
  target.
- `longPressRepeat` opt-in: hold to repeat after 500ms, accelerating from
  250ms to 100ms between steps; timers clear on release, leave, and unmount.
- `sm`/`md` sizes via cva.
