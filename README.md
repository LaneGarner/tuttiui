# tutti-ui

A comprehensive component library for React and React Native with shared design tokens, accessibility-first components, and AI-native UI primitives.

**[Explore the live Storybook →](https://lanegarner.github.io/tutti-ui/)**

## Features

- **32 component families** with 60+ exports on web
- **React Native support: 27 of 32 component families** via NativeWind (see [PARITY.md](./PARITY.md))
- **One set of design tokens** (colors, spacing, typography, radii, shadows) consumed by both platforms
- **Accessible by default** -- ARIA roles and keyboard navigation on web; `accessibilityRole`/`accessibilityState`/`accessibilityLabel` on native
- **Tailwind CSS v3** integration via preset (web) and NativeWind classNames (native)
- **Dark mode ready** with semantic color tokens and a ThemeProvider for each platform
- **TypeScript strict mode** throughout
- **600+ tests** with Jest + Testing Library (332 web, 271 native)
- **Storybook** for interactive documentation (web + native stories via react-native-web)

## Installation

### React (web)

```bash
npm install @tutti-ui/react @tutti-ui/tokens @tutti-ui/shared
```

### React Native

```bash
npm install @tutti-ui/react-native @tutti-ui/tokens @tutti-ui/shared nativewind
npm install react-native-reanimated react-native-svg   # used by Skeleton, Spinner, icons
```

### Tailwind CSS Setup

Add the tutti-ui preset to your `tailwind.config.js`:

```js
const { tuttiPreset } = require("@tutti-ui/react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tutti-ui/react/dist/**/*.{js,mjs}",
  ],
  presets: [tuttiPreset],
  darkMode: "class",
};
```

## Quick Start

### React (web)

```tsx
import { Button, Input, Label, Card, CardContent } from "@tutti-ui/react";

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

27 of 32 web component families are available in `@tutti-ui/react-native`,
including all form controls, feedback, layout, and AI-native components.
`CommandPalette`, `Breadcrumbs`, and `Sidebar` are web-only by design (their
mobile equivalents belong to the navigation layer); `NavMenu` (as a native
`TabBar`) and `StreamingTable` (as a `StreamingList`) are deferred. Platform
notes for every component live in [PARITY.md](./PARITY.md).

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

The Storybook app builds statically and ships with a Vercel config
(`apps/storybook/vercel.json`). To deploy:

```bash
vercel --cwd apps/storybook
```

(or point a Vercel project's Root Directory at `apps/storybook` — the config
handles the monorepo install and build commands.)

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
