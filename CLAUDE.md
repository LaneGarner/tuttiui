# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build          # Build all packages (topological: tokens -> shared -> react -> storybook)
pnpm test           # Run all tests (Jest in @tutti-ui/react)
pnpm typecheck      # tsc --noEmit across all packages
pnpm storybook      # Launch Storybook at localhost:6006
pnpm clean          # Remove all dist/ and storybook-static/

# Single package
pnpm --filter @tutti-ui/react test          # Run only react tests
pnpm --filter @tutti-ui/tokens build        # Build only tokens
pnpm --filter @tutti-ui/react test -- --testPathPattern=Button  # Run a single test file
```

## Architecture

This is a pnpm + Turborepo monorepo for a design system targeting React (web) with React Native planned later.

### Package dependency graph

```
@tutti-ui/tokens  (no deps)
       ↓
@tutti-ui/shared  (depends on tokens; peers: react)
       ↓
@tutti-ui/react   (depends on shared + tokens; peers: react, react-dom, tailwindcss)
       ↓
@tutti-ui/storybook  (app, depends on all three)
```

### Package roles

- **`packages/tokens`** — Design tokens (colors, spacing, typography, radii, shadows). All numeric values are unitless px; conversion to rem happens at the consumption boundary (see `packages/react/src/tailwind.ts`). Semantic colors (`lightColors`/`darkColors`) are sourced from tribe-tracker's theme.
- **`packages/shared`** — `cn()` (clsx + tailwind-merge, web-only), `ThemeProvider`/`useTheme` with system preference detection via `matchMedia`. ThemeProvider accepts `onPreferenceChange` callback for persistence (no storage baked in).
- **`packages/react`** — Web components built with `forwardRef` + `cva` (class-variance-authority) + `cn()`. Exports a Tailwind v3 preset at `@tutti-ui/react/tailwind` that transforms token px values to rem. Tests use Jest + @testing-library/react.
- **`apps/storybook`** — Storybook 8 with `@storybook/react-vite`, configured with the tutti-ui Tailwind preset.

### Key patterns

- All packages build with **tsup** (CJS + ESM + .d.ts)
- Components use **forwardRef** + **cva** for variant definitions + **cn()** for class merging
- When cva has a `size` variant, use `Omit<HTMLAttributes, "size">` to avoid conflicts with the native HTML `size` attribute
- Compound components use React context to share state (RadioGroup, FormField, Avatar, Tabs, Sidebar, Tooltip)
- Controlled/uncontrolled pattern: check `controlledValue !== undefined`, use internal useState for uncontrolled
- Portal-based components (Dialog, CommandPalette) use `ReactDOM.createPortal` to `document.body`
- No external animation libraries — CSS animations/transitions only (`animate-pulse`, `animate-spin`, `transition-*`)
- In `exports` fields, `types` must come before `import`/`require` to avoid bundler warnings
- Jest config is `.js` (not `.ts`) to avoid needing ts-node; uses `moduleNameMapper` to resolve workspace packages to source
- Tests use Jest + @testing-library/react + @testing-library/user-event
- Stories live in component dirs (`packages/react/src/components/[Name]/[Name].stories.tsx`); storybook main.ts picks them up via glob
- React peer deps: `^18.0.0 || ^19.0.0`
- Tailwind v3 (not v4)

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

### Known issues

- `@storybook/react` types not installed in the react package — typecheck shows module resolution errors for all `.stories.tsx` files (cosmetic, does not affect build or runtime)
