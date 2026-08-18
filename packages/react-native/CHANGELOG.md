# @tuttiui/react-native

## 0.2.0

### Minor Changes

- [#8](https://github.com/LaneGarner/tuttiui/pull/8) [`17092f5`](https://github.com/LaneGarner/tuttiui/commit/17092f59ef9ba5db15a75705784daef8e21dfc3d) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Dark mode, by way of a rethemable semantic color layer.

  Components no longer hardcode Tailwind color literals. Every color now comes
  from a `--tt-*` CSS variable behind a semantic Tailwind name, so `Card` says
  `bg-tt-surface` once and that resolves to white, `#18181B`, or a consumer's
  brand color depending on who is asking. There are no `dark:` variants in
  component source, on either platform.

  Consumers get dark mode by adding `.dark` to a root element (the preset now
  sets `darkMode: "class"`), and retheme by redeclaring any `--tt-*` variable
  after `@tailwind base`. lanegarner.dev replaced 24 hand-written `dark:` patches
  and a whole Card wrapper component with a 35-line variable block.

  **New**

  - 55 semantic tokens on `SemanticColors`, generated into
    `@tuttiui/tokens/theme.css` by `buildThemeCss()`
  - `data-variant` / `data-state` / `data-level` / `data-active` / `data-part` on
    the components that have variants — a supported styling hook, so consumers
    can target `[data-variant="success"]` instead of reaching through a test id
  - `cyan` added to `palette`; `AgentWorkflow`'s streaming state had been
    rendering `bg-cyan-500`, which only worked because consumers happened to
    have Tailwind's stock palette
  - A WCAG contrast harness (`pnpm --filter @tuttiui/storybook test:contrast`)
    that renders every component in both themes in a real browser and asserts AA
  - Storybook has a real theme toggle; the old backgrounds swatch only repainted
    the canvas behind the components, which is a large part of why a library with
    no dark styles looked fine there
  - `Input` now sets `aria-invalid` when `error` is set, matching Textarea and
    Select. The error state had been purely visual.

  **Breaking (0.x)**

  - `SemanticColors` grows from 12 keys to 55. The original twelve remain as
    deprecated aliases, so `useTheme().colors.text` keeps working.
  - The preset now sets `darkMode: "class"`. Overridable; consumers relying on
    Tailwind's `media` default should set it explicitly. The variable plugin
    reads the resolved value and emits a media query when it is `media`.
  - `Select` renders its chevron as an inline `<svg>` sibling inside a
    positioning wrapper instead of a `background-image` data URI, because a CSS
    variable cannot reach a color baked into a URL-encoded SVG. Anything styling
    `select` via `style` or relying on it being a single element needs a look.
    A new `wrapperClassName` prop targets the wrapper.
  - React Native `Input`, `Textarea`, `AIInput`, `Checkbox`, `Select`, `Button`
    and `OptimisticAction` read `useTheme()` for the colors that live in value
    props rather than classNames (`placeholderTextColor`, icon fills, spinner
    tints). They need a `ThemeProvider` above them to render those correctly in
    dark; `ThemeContext` defaults to `lightColors`, so a tree without one
    degrades to light rather than crashing.
  - `ThemeProviderNative` now calls nativewind's `colorScheme.set()`. Native has
    no `.dark` class, so without it the variables never flip.

  Light mode is unchanged: every light token is the exact literal the components
  rendered before, which is why this is safe to adopt in place.

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`6e340a9`](https://github.com/LaneGarner/tuttiui/commit/6e340a980460ea0febcdac618c25efa3c752acbf) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `Sheet` component family: a bottom-anchored modal panel that slides up
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

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`f1fabea`](https://github.com/LaneGarner/tuttiui/commit/f1fabeab0300e7606b7d1b0cf834b3ed21fefab5) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `TabBar` component: fixed bottom navigation for mobile layouts, the
  native-counterpart answer to NavMenu planned in PARITY.md.

  Web (`@tuttiui/react`):

  - `TabBar` renders a `nav` landmark (default `aria-label="Main"`) fixed to
    the bottom edge with a hairline `tt-border` top border; `safeArea` adds
    `env(safe-area-inset-bottom)` padding for notched devices.
  - `TabBarItem` takes `icon`/`label`/`active`; renders a button, or an anchor
    when `href` is given. Active items get `aria-current="page"` +
    `data-active` and primary color; inactive items are muted. Items are
    evenly distributed with a guaranteed 44px minimum touch target.

  React Native (`@tuttiui/react-native`):

  - Same compound API: `TabBar` (`accessibilityRole="tablist"`, `bottomInset`
    prop for safe-area padding) + `TabBarItem` (`Pressable` with
    `accessibilityRole="tab"`, `accessibilityState.selected`, 44pt minimum
    height).

- [#15](https://github.com/LaneGarner/tuttiui/pull/15) [`19c9a2b`](https://github.com/LaneGarner/tuttiui/commit/19c9a2b89b7db95740a99eab43c8d6cc9fafc3e5) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Publish the design system under the lowercase `tuttiui` brand and `@tuttiui` npm scope. Package APIs and the `--tt-*` theming namespace remain unchanged; see `MIGRATION.md` for the package-name mapping.

### Patch Changes

- Updated dependencies [[`72529da`](https://github.com/LaneGarner/tuttiui/commit/72529daadb50f01248b87b52d22ad0a6b57f7828), [`17092f5`](https://github.com/LaneGarner/tuttiui/commit/17092f59ef9ba5db15a75705784daef8e21dfc3d), [`19c9a2b`](https://github.com/LaneGarner/tuttiui/commit/19c9a2b89b7db95740a99eab43c8d6cc9fafc3e5), [`13299df`](https://github.com/LaneGarner/tuttiui/commit/13299df606133164dfb0a61157cdd689b2c68764)]:
  - @tuttiui/tokens@0.3.0
  - @tuttiui/shared@0.3.0
