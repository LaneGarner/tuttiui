<p align="center">
  <img src="assets/tuttiui-lockup.svg" alt="" width="360" />
</p>

# tutti-ui

A comprehensive component library for React and React Native with shared design tokens, accessibility-first components, and AI-native UI primitives.

**[Explore the live Storybook →](https://lanegarner.github.io/tutti-ui/)**

## Features

- **38 component families** with 60+ exports on web
- **React Native support: 29 of 38 component families** via NativeWind (see [PARITY.md](./PARITY.md))
- **One set of design tokens** (colors, spacing, typography, radii, shadows) consumed by both platforms
- **Accessible by default** -- ARIA roles and keyboard navigation on web; `accessibilityRole`/`accessibilityState`/`accessibilityLabel` on native
- **Tailwind CSS v3** integration via preset (web) and NativeWind classNames (native)
- **Dark mode and full retheming** through semantic CSS-variable tokens — no `dark:` classes anywhere in component source, and a consumer can point the whole system at their own palette
- **TypeScript strict mode** throughout
- **700+ tests** with Jest + Testing Library (424 web, 289 native)
- **Storybook** for interactive documentation (web + native stories via react-native-web)

## Installation

### React (web)

```bash
npm install tutti-ui
```

The framework-explicit `npm install @tutti-ui/react` remains fully supported.

### React Native

```bash
npm install @tutti-ui/react-native @tutti-ui/tokens @tutti-ui/shared nativewind
npm install react-native-reanimated react-native-svg   # used by Skeleton, Spinner, icons
```

### Tailwind CSS Setup

Add the tutti-ui preset to your `tailwind.config.js`:

```js
const { tuttiPreset } = require("tutti-ui/tailwind");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tutti-ui/react/dist/**/*.{js,mjs}",
  ],
  presets: [tuttiPreset],
};
```

The preset sets `darkMode: "class"` and declares the theme variables for you.
Add `dark` to a root element (usually `<html>`) and every component follows —
there is nothing to configure per component and no `dark:` class to write.

### Theming

Components read their colors from `--tt-*` variables, so overriding those
retints the entire system. Declare them **after** `@tailwind base` so they win
at equal specificity:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --tt-surface: #fffdf7;
  --tt-fg: #1a1a1a;
  --tt-primary: #222222;
  --tt-primary-fg: #fcdc00;
  --tt-focus: #60dbfb;
}

.dark {
  --tt-surface: #303030;
  --tt-field: #2b2b2b;
  --tt-border: #3a3a3a;
}
```

Aliasing works too — `--tt-primary: var(--brand)` — which is usually how this
is wired into an app that already has its own tokens. The full variable list
ships as `@tutti-ui/tokens/theme.css`, and is also importable as objects
(`lightColors` / `darkColors`) for React Native and for anything that needs the
values in JS. Web projects can import the same stylesheet as
`tutti-ui/theme.css`.

Every variant component also carries `data-variant` / `data-state`, which are
supported selectors: `[data-variant="success"] { ... }` is a stable way to
reach a specific state from your own CSS.

## Quick Start

### React (web)

```tsx
import { Button, Input, Label, Card, CardContent } from "tutti-ui";

function App() {
  return (
    <Card>
      <CardContent>
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <Button variant="primary">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### React Native

Same tokens, same prop APIs, NativeWind under the hood:

```tsx
import { Button, Input, Label, Card, CardContent } from "@tutti-ui/react-native";
import { ThemeProvider } from "@tutti-ui/shared/native";

function App() {
  return (
    <ThemeProvider>
      <Card>
        <CardContent>
          <Label required>Email</Label>
          <Input placeholder="you@example.com" keyboardType="email-address" />
          <Button variant="primary" onPress={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

Add the tutti-ui preset to your NativeWind `tailwind.config.js` `content` and
`presets` the same way as on web (see Tailwind CSS Setup above), pointing
`content` at `./node_modules/@tutti-ui/react-native/dist/**/*.{js,mjs}`.

### React Native parity

29 of 38 web component families are available in `@tutti-ui/react-native`,
including all original form controls, feedback, layout, and AI-native
components plus the new `Sheet` and `TabBar`. `CommandPalette`, `Breadcrumbs`,
and `Sidebar` are web-only by design (their mobile equivalents belong to the
navigation layer); `NavMenu` is superseded by `TabBar`; native ports of
`Stepper`, `Collapsible`, `Badge`, `SegmentedControl`, and `StreamingTable`
(as a `StreamingList`) are deferred. Platform notes for every component live
in [PARITY.md](./PARITY.md).

## Components

### Form Inputs & Controls

| Component | Description |
|-----------|-------------|
| `Button` | 5 variants, 3 sizes, loading state |
| `Input` | Text input with size and error variants |
| `Textarea` | Multi-line input with error state |
| `Select` | Native select with custom chevron, placeholder support |
| `Checkbox` | Native checkbox, 3 sizes |
| `RadioGroup` / `RadioItem` | Radio group with context, controlled/uncontrolled |
| `Switch` | Toggle switch with track + thumb, 3 sizes |
| `Label` | Form label with optional required indicator |
| `FormField` / `FormError` / `FormHint` | Form context utilities with `useFormField` hook |
| `Stepper` | Numeric stepper with `role="spinbutton"`, long-press repeat |
| `SegmentedControl` / `Segment` | Segmented single-select with radiogroup semantics and arrow-key navigation |

### Display & Feedback

| Component | Description |
|-----------|-------------|
| `Card` | Compound card with Header, Title, Description, Content, Footer |
| `Avatar` | Image with fallback, 4 sizes |
| `Tooltip` | Hover tooltip with 4 placement sides |
| `Alert` | 5 color variants with optional dismiss |
| `Dialog` | Modal with portal, focus trap, Escape to close |
| `Toast` / `ToastProvider` | Toast notifications with `useToast` hook, auto-dismiss |
| `Skeleton` | Pulsing loading placeholder |
| `Progress` | Progress bar with ARIA, 3 sizes, 4 colors |
| `Spinner` | Accessible loading spinner |
| `Badge` | Status badge with semantic subtle variants |
| `Sheet` | Bottom-anchored modal with snap points and drag-to-dismiss |

### Layout & Navigation

| Component | Description |
|-----------|-------------|
| `Stack` / `VStack` / `HStack` | Flex layout with spacing, alignment, justify variants |
| `Divider` | Horizontal/vertical separator, decorative or semantic |
| `Tabs` | Tabbed interface with keyboard navigation (arrow keys, Home/End) |
| `Breadcrumbs` | Navigation breadcrumb trail with auto-separators |
| `NavMenu` | Vertical/horizontal navigation menu |
| `Sidebar` | Collapsible sidebar with groups and items |
| `CommandPalette` | Searchable command list with Cmd+K, arrow key navigation |
| `TabBar` | Fixed bottom navigation with safe-area support |
| `Collapsible` | CSS-only expand/collapse disclosure |

### AI-Native

| Component | Description |
|-----------|-------------|
| `StreamingText` | Token-by-token text reveal with cursor, respects `prefers-reduced-motion` |
| `AIChat` | Chat message bubbles for user/assistant/system, loading indicator |
| `AIInput` | Auto-expanding prompt input with Enter to submit |
| `OptimisticAction` | Button with idle/pending/confirmed/failed state machine |
| `AgentWorkflow` | Multi-step workflow visualization with 6 states |
| `ConfidenceIndicator` | Color-coded confidence meter (red/amber/green) |
| `StreamingTable` | Table with streaming row updates and skeleton cells |

## Packages

| Package | Description |
|---------|-------------|
| `tutti-ui` | Single-install React components and design tokens (recommended for web) |
| `@tutti-ui/tokens` | Design tokens (colors, spacing, typography, radii, shadows + `nativeShadows`) |
| `@tutti-ui/shared` | `cn()` utility, `ThemeProvider`, `useTheme` hook (web at `.`, RN at `./native`) |
| `@tutti-ui/react` | React (web) components + Tailwind preset |
| `@tutti-ui/react-native` | React Native components (NativeWind) |
| `@tutti-ui/storybook` | Storybook app (internal) |

### Dependency Graph

```
@tutti-ui/tokens
       |
@tutti-ui/shared
       |
       +---------------------+
       |                     |
@tutti-ui/react    @tutti-ui/react-native
       |                     |
       +---------------------+
       |
@tutti-ui/storybook
```

## Development

```bash
pnpm install            # Install dependencies
pnpm build              # Build all packages
pnpm test               # Run all tests
pnpm typecheck          # Type-check all packages
pnpm storybook          # Launch Storybook at localhost:6006
pnpm clean              # Remove all build artifacts
```

### Deploying Storybook

Storybook deploys automatically to
[GitHub Pages](https://lanegarner.github.io/tutti-ui/) on every push to `main`
(`.github/workflows/deploy-storybook.yml`).

The app also builds statically for Vercel via `apps/storybook/vercel.json` as
an alternative:

```bash
vercel --cwd apps/storybook
```

(or point a Vercel project's Root Directory at `apps/storybook` — the config
handles the monorepo install and build commands.)

### Publishing to npm

Releases are managed by Changesets and `.github/workflows/release.yml`. A push
to `main` opens or updates the version PR; merging that PR publishes the new
versions. The workflow uses npm trusted publishing (OIDC), so it does not need
a long-lived `NPM_TOKEN`.

The unscoped `tutti-ui` name needs a one-time bootstrap before its first
automated release:

1. Sign in to the npm account that should own the package and make sure 2FA is
   enabled:

   ```bash
   npm login
   npm whoami
   ```

2. Build and inspect the exact package:

   ```bash
   pnpm build
   pnpm --filter tutti-ui pack --pack-destination /tmp
   ```

3. Publish `0.2.0` once. The package is unscoped and therefore always public:

   ```bash
   pnpm --filter tutti-ui publish --access public --no-git-checks
   ```

4. On npmjs.com, open **Packages → tutti-ui → Settings → Trusted Publisher**
   and configure:

   - Provider: GitHub Actions
   - Organization or user: `LaneGarner`
   - Repository: `tutti-ui`
   - Workflow filename: `release.yml`
   - Environment: leave blank
   - Allowed action: `npm publish`

5. Verify the existing `@tutti-ui/react`, `@tutti-ui/react-native`,
   `@tutti-ui/tokens`, and `@tutti-ui/shared` packages use the same trusted
   publisher. Each npm package has its own trusted-publisher setting.

After the bootstrap, do not publish `tutti-ui` manually. Add a changeset,
merge the generated version PR, and let the release workflow publish the
linked versions with provenance.

### Single Package Commands

```bash
pnpm --filter @tutti-ui/react test                              # Run react tests
pnpm --filter @tutti-ui/react test -- --testPathPattern=Button   # Run single test
pnpm --filter @tutti-ui/tokens build                             # Build tokens only
```

## Tech Stack

- **React** 18/19, **React Native** 0.74+
- **TypeScript** (strict mode)
- **Tailwind CSS** v3 (web) / **NativeWind** v4 (native)
- **class-variance-authority** for component variants
- **clsx** + **tailwind-merge** for class composition
- **tsup** for building (CJS + ESM + .d.ts)
- **Turborepo** for monorepo orchestration
- **pnpm** for package management
- **Jest** + **React Testing Library** for tests
- **Storybook** 8 for documentation

## License

MIT
