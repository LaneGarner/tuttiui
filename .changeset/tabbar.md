---
"@tutti-ui/react": minor
"@tutti-ui/react-native": minor
---

New `TabBar` component: fixed bottom navigation for mobile layouts, the
native-counterpart answer to NavMenu planned in PARITY.md.

Web (`@tutti-ui/react`):

- `TabBar` renders a `nav` landmark (default `aria-label="Main"`) fixed to
  the bottom edge with a hairline `tt-border` top border; `safeArea` adds
  `env(safe-area-inset-bottom)` padding for notched devices.
- `TabBarItem` takes `icon`/`label`/`active`; renders a button, or an anchor
  when `href` is given. Active items get `aria-current="page"` +
  `data-active` and primary color; inactive items are muted. Items are
  evenly distributed with a guaranteed 44px minimum touch target.

React Native (`@tutti-ui/react-native`):

- Same compound API: `TabBar` (`accessibilityRole="tablist"`, `bottomInset`
  prop for safe-area padding) + `TabBarItem` (`Pressable` with
  `accessibilityRole="tab"`, `accessibilityState.selected`, 44pt minimum
  height).
