# @tutti-ui/react-native

## 0.2.0

### Minor Changes

- [#8](https://github.com/LaneGarner/tutti-ui/pull/8) [`17092f5`](https://github.com/LaneGarner/tutti-ui/commit/17092f59ef9ba5db15a75705784daef8e21dfc3d) Thanks [@LaneGarner](https://github.com/LaneGarner)! - Dark mode, by way of a rethemable semantic color layer.

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
    `@tutti-ui/tokens/theme.css` by `buildThemeCss()`
  - `data-variant` / `data-state` / `data-level` / `data-active` / `data-part` on
    the components that have variants — a supported styling hook, so consumers
    can target `[data-variant="success"]` instead of reaching through a test id
  - `cyan` added to `palette`; `AgentWorkflow`'s streaming state had been
    rendering `bg-cyan-500`, which only worked because consumers happened to
    have Tailwind's stock palette
  - A WCAG contrast harness (`pnpm --filter @tutti-ui/storybook test:contrast`)
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

### Patch Changes

- Updated dependencies [[`17092f5`](https://github.com/LaneGarner/tutti-ui/commit/17092f59ef9ba5db15a75705784daef8e21dfc3d)]:
  - @tutti-ui/tokens@0.3.0
  - @tutti-ui/shared@0.3.0
