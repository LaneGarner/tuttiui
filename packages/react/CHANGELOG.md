# @tuttiui/react

## 0.3.0

### Minor Changes

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`5991492`](https://github.com/LaneGarner/tuttiui/commit/5991492706773770eacb1fc62f6182f85a2acc2b) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `Badge` component — pill-shaped inline status label.

  - Variants: `default` / `primary` / `success` / `warning` / `info`, tinted
    with the semantic status tokens (`*-subtle` fills, `*-on-subtle` text) so
    both themes stay accessible with no `dark:` variants
  - Sizes `sm` / `md`
  - `info` marks informational states (merges, overrides); `warning` is
    reserved strictly for states that need a decision from the user
  - `span` element with `forwardRef`, `data-variant` / `data-size` styling hooks

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`f5d0fe0`](https://github.com/LaneGarner/tuttiui/commit/f5d0fe0348b386cc2ae071b530660aa729de37b0) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `Collapsible` compound component (`Collapsible` / `CollapsibleTrigger` /
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

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`5991492`](https://github.com/LaneGarner/tuttiui/commit/5991492706773770eacb1fc62f6182f85a2acc2b) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `SegmentedControl` compound component (`SegmentedControl` / `Segment`).

  - Connected pill of mutually exclusive options; the active segment gets the
    raised/filled treatment, `data-state="active" | "inactive"` on segments
  - Radiogroup semantics: `role="radiogroup"` on the group, `role="radio"` +
    `aria-checked` on segments, arrow-key navigation that moves focus and
    selects (wrapping, plus Home/End) matching native radio behavior
  - Controlled only: `value` + `onChange`
  - Sizes `sm` / `md`, group-level and per-segment `disabled`

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

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`0bd05c6`](https://github.com/LaneGarner/tuttiui/commit/0bd05c66bcc97c085f144b6cbe11a8a1b39b9421) Thanks [@LaneGarner](https://github.com/LaneGarner)! - New `Stepper` component: a compact quantity control (− value +) for cart and
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

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`72529da`](https://github.com/LaneGarner/tuttiui/commit/72529daadb50f01248b87b52d22ad0a6b57f7828) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Hold action-fill text to WCAG AA (4.5:1) in both themes and lock it in with
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

- [#13](https://github.com/LaneGarner/tuttiui/pull/13) [`13299df`](https://github.com/LaneGarner/tuttiui/commit/13299df606133164dfb0a61157cdd689b2c68764) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Guard the px→rem boundary and lock status tint contrast to AA.

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

- Updated dependencies [[`72529da`](https://github.com/LaneGarner/tuttiui/commit/72529daadb50f01248b87b52d22ad0a6b57f7828), [`17092f5`](https://github.com/LaneGarner/tuttiui/commit/17092f59ef9ba5db15a75705784daef8e21dfc3d), [`19c9a2b`](https://github.com/LaneGarner/tuttiui/commit/19c9a2b89b7db95740a99eab43c8d6cc9fafc3e5), [`13299df`](https://github.com/LaneGarner/tuttiui/commit/13299df606133164dfb0a61157cdd689b2c68764)]:
  - @tuttiui/tokens@0.3.0
  - @tuttiui/shared@0.3.0

## 0.2.0

### Minor Changes

- [#2](https://github.com/LaneGarner/tuttiui/pull/2) [`0e1d148`](https://github.com/LaneGarner/tuttiui/commit/0e1d1482ad546be1ad4aabd1dfe2f9ed09be8656) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Initial release of tuttiui design system

### Patch Changes

- Updated dependencies [[`0e1d148`](https://github.com/LaneGarner/tuttiui/commit/0e1d1482ad546be1ad4aabd1dfe2f9ed09be8656)]:
  - @tuttiui/tokens@0.2.0
  - @tuttiui/shared@0.2.0
