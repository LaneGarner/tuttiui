# tutti-ui

The convenient, single-install entry point for tutti-ui's React components and design tokens.

## Install

```bash
npm install tutti-ui
```

React and React DOM are peer dependencies, so applications continue to control their versions.

## Usage

Import components and tokens from one package:

```tsx
import { Button, Card, spacing, lightColors } from "tutti-ui";
```

Or use explicit subpaths:

```tsx
import { Button } from "tutti-ui/react";
import { spacing } from "tutti-ui/tokens";
import { tuttiPreset } from "tutti-ui/tailwind";
import "tutti-ui/theme.css";
```

Existing `@tutti-ui/react` and `@tutti-ui/tokens` imports remain fully supported. This package re-exports them; it does not copy their implementations.

React Native projects should continue to install `@tutti-ui/react-native` directly.
