# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build          # Build all packages (topological: tokens -> shared -> react/react-native -> storybook)
pnpm test           # Run all tests (Jest in @tutti-ui/react and @tutti-ui/react-native)
pnpm typecheck      # tsc --noEmit across all packages
pnpm storybook      # Launch Storybook at localhost:6006
pnpm clean          # Remove all dist/ and storybook-static/

# Single package
pnpm --filter @tutti-ui/react test          # Run only react tests
pnpm --filter @tutti-ui/react-native test   # Run only react-native tests
pnpm --filter @tutti-ui/tokens build        # Build only tokens
pnpm --filter @tutti-ui/react test -- --testPathPattern=Button  # Run a single test file
```

## Architecture

This is a pnpm + Turborepo monorepo for a design system targeting React (web) and React Native from one set of design tokens. See `PARITY.md` for the web/native component parity map (27 of 32 families ported; CommandPalette/Breadcrumbs/Sidebar are web-only by design, NavMenu/StreamingTable native equivalents deferred).

### Package dependency graph

```
@tutti-ui/tokens  (no deps)
       ↓
@tutti-ui/shared  (depends on tokens; peers: react, react-native [optional]; "./native" subpath export)
       ↓                              ↓
@tutti-ui/react                @tutti-ui/react-native
(peers: react, react-dom,      (peers: react, react-native, nativewind;
 tailwindcss)                   optional: react-native-reanimated, react-native-svg)
       ↓                              ↓
@tutti-ui/storybook  (app, renders both via react-native-web + shims)
```

### Package roles

- **`packages/tokens`** — Design tokens (colors, spacing, typography, radii, shadows + `nativeShadows` for RN shadow objects). All numeric values are unitless px; conversion to rem happens at the consumption boundary (see `packages/react/src/tailwind.ts`). `lightColors`/`darkColors` hold the 55 semantic colors; `buildThemeCss()` generates `dist/theme.css` from them so the stylesheet cannot drift from the objects.
- **`packages/shared`** — `cn()` (clsx + tailwind-merge, works with NativeWind classNames too), `ThemeProvider`/`useTheme`. The web entry (`.`) detects system preference via `matchMedia`; the native entry (`./native`, built from `src/native.ts`) uses RN's `useColorScheme` (`ThemeProviderNative.tsx`). Both accept `onPreferenceChange` for persistence (no storage baked in).
- **`packages/react`** — Web components built with `forwardRef` + `cva` (class-variance-authority) + `cn()`. Exports a Tailwind v3 preset at `@tutti-ui/react/tailwind` that transforms token px values to rem. Tests use Jest + @testing-library/react.
- **`packages/react-native`** — RN components styled with NativeWind classNames, same CVA variants and prop APIs as the web versions where the platform allows. Accessibility via `accessibilityRole`/`accessibilityLabel`/`accessibilityState`/`accessibilityValue`. Tests run against lightweight RN mocks (`jest/react-native-mock.js`) with a `@testing-library/react-native`-compatible shim (`jest/testing-library-shim.js`) on jsdom — no Metro/babel needed. `src/nativewind.d.ts` augments RN types with `className`.
- **`apps/storybook`** — Storybook 8 with `@storybook/react-vite`, configured with the tutti-ui Tailwind preset. Renders RN stories through `react-native-web` plus web shims for reanimated/svg (`src/shims/`). Deployable to Vercel via `apps/storybook/vercel.json`.

### Key patterns

- All packages build with **tsup** (CJS + ESM + .d.ts)
- Components use **forwardRef** + **cva** for variant definitions + **cn()** for class merging
- When cva has a `size` variant, use `Omit<HTMLAttributes, "size">` to avoid conflicts with the native HTML `size` attribute
- Compound components use React context to share state (RadioGroup, FormField, Avatar, Tabs, Sidebar, Tooltip)
- Controlled/uncontrolled pattern: check `controlledValue !== undefined`, use internal useState for uncontrolled
- Portal-based components (Dialog, CommandPalette) use `ReactDOM.createPortal` to `document.body`
- No external animation libraries — CSS animations/transitions only (`animate-pulse`, `animate-spin`, `transition-*`)
- **Colors are always semantic.** Components use `bg-tt-surface` / `text-tt-fg-muted` / `border-tt-border`, never `bg-white` or `text-gray-700`. Each name resolves to a `--tt-*` variable, which is what makes dark mode and consumer retheming work with no `dark:` variants in component source. A literal color class in a component is a bug; `grep -rE '(bg|text|border|ring)-(white|gray|blue|green|amber|red)' packages/*/src/components --include=*.tsx` should stay empty
- Variant components expose `data-variant` / `data-state` / `data-level` on the styled node. Tests assert those rather than class strings — a class-name assertion churns on every restyle and passes happily when a theme is unreadable
- Contrast is verified in a real browser, not Jest: `pnpm --filter @tutti-ui/storybook test:contrast` renders both themes and asserts WCAG AA. jsdom has no stylesheet, so `getComputedStyle` there tells you nothing about color
- In `exports` fields, `types` must come before `import`/`require` to avoid bundler warnings
- Jest config is `.js` (not `.ts`) to avoid needing ts-node; uses `moduleNameMapper` to resolve workspace packages to source
- Tests use Jest + @testing-library/react + @testing-library/user-event (web); the RN package uses the same Jest/jsdom stack against RN mocks via `moduleNameMapper`
- Stories live in component dirs (`packages/*/src/components/[Name]/[Name].stories.tsx`); storybook main.ts picks them up via glob (RN stories are titled `React Native/...`)
- `.stories.tsx` files are excluded from package tsconfigs (`@storybook/react` types aren't installed in the packages); Storybook's own build type-handles them
- React peer deps: `^18.0.0 || ^19.0.0`; React Native `>=0.74.0`
- Tailwind v3 (not v4); NativeWind v4 for RN

## Components (32 families, 60+ exports)

### Form Inputs & Controls
| Component | Key features |
|-----------|-------------|
| **Button** | 5 variants (primary/secondary/outline/ghost/danger), 3 sizes, loading state |
| **Input** | 3 sizes, error state, extends native input |
| **Textarea** | Error state, extends native textarea |
| **Select** | 3 sizes, error state, placeholder option, custom chevron |
| **Checkbox** | 3 sizes, native checkbox with accent-color |
| **Radio** | RadioGroup + RadioItem, context-based, controlled/uncontrolled |
| **Switch** | Button role="switch", 3 sizes, track + thumb pattern |
| **Label** | Optional required asterisk |
| **Form** | FormField (context), FormError (role="alert"), FormHint, useFormField hook |

### Display & Feedback
| Component | Key features |
|-----------|-------------|
| **Card** | Compound: Card/Header/Title/Description/Content/Footer, 3 variants |
| **Avatar** | Compound: Avatar/Image/Fallback, size context, load/error tracking |
| **Tooltip** | Compound: Tooltip/Trigger/Content, CSS positioning (4 sides), hover delay |
| **Alert** | 5 color variants, AlertTitle/AlertDescription, optional dismiss |
| **Dialog** | Portal-based, focus trap, Escape close, full ARIA (role="dialog", aria-modal) |
| **Toast** | ToastProvider + useToast hook + ToastViewport, auto-dismiss, 5 variants |
| **Skeleton** | animate-pulse placeholder, sized via className |
| **Progress** | Track + bar, 3 sizes, 4 color variants, full ARIA (role="progressbar") |
| **Spinner** | SVG spinner, 3 sizes, role="status", aria-label |

### Layout & Navigation
| Component | Key features |
|-----------|-------------|
| **Stack/VStack/HStack** | Flex layout with spacing/align/justify/wrap variants |
| **Divider** | Horizontal (hr) / vertical (div), decorative vs semantic |
| **Tabs** | Compound: Tabs/List/Trigger/Content, roving tabindex, arrow key nav |
| **Breadcrumbs** | Compound: Breadcrumbs/Item/Link/Separator/Page, auto-separator insertion |
| **NavMenu** | Compound: NavMenu/Item/Link, horizontal/vertical, active state |
| **Sidebar** | Compound: Sidebar/Header/Content/Footer/Group/GroupLabel/Item, collapsible |
| **CommandPalette** | Portal-based, search filtering, arrow key nav, Cmd+K global shortcut |

### AI-Native
| Component | Key features |
|-----------|-------------|
| **StreamingText** | Token-by-token reveal, blinking cursor, speed control, prefers-reduced-motion |
| **AIChat** | Chat bubbles (user/assistant/system), loading dots, auto-scroll |
| **AIInput** | Auto-expanding textarea, Enter to submit, Shift+Enter newline, send button |
| **OptimisticAction** | State machine (idle/pending/confirmed/failed), auto-reset |
| **AgentWorkflow** | Multi-step workflow, 6 states, progress bars, connector lines |
| **ConfidenceIndicator** | Color-coded bar (red/amber/green), role="meter", 3 sizes |
| **StreamingTable** | Streaming rows with skeleton cells, pending/streaming/complete states |

## React Native package (`@tutti-ui/react-native`)

27 of the 32 families above are ported with matching prop APIs — all Form Inputs & Controls, all Display & Feedback, Stack/Divider/Tabs, and all seven AI-Native minus StreamingTable. Platform adaptations: Select is a trigger + bottom-sheet Modal picker (`options`/`value`/`onValueChange`), Tooltip opens on long-press with timed auto-hide, Dialog uses RN `Modal`. Not ported: CommandPalette, Breadcrumbs, Sidebar (web-only by design), NavMenu and StreamingTable (native equivalents deferred). Full rationale in `PARITY.md`.

### Known issues

- `@storybook/react` types are not installed in the component packages, so `.stories.tsx` files are excluded from package `tsconfig.json` typecheck (Storybook itself builds them fine)
- `react-native-reanimated` and `react-native-svg` are marked optional peer deps of `@tutti-ui/react-native`, but Skeleton/Spinner/Checkbox/Select icons import them directly — apps using those components need them installed
