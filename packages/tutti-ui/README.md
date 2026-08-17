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

## Tailwind CSS

Add the preset and installed component build to `tailwind.config.js`:

```js
const { tuttiPreset } = require("tutti-ui/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tutti-ui/react/dist/**/*.{js,mjs}",
  ],
  presets: [tuttiPreset],
};
```

The generated semantic theme variables are also available directly:

```css
@import "tutti-ui/theme.css";
```

## What gets installed

`tutti-ui` depends on `@tutti-ui/react` and `@tutti-ui/tokens`. The React package brings in `@tutti-ui/shared` as its own dependency. Package managers can install and deduplicate the underlying packages normally; this package contains only re-export entry points and the generated theme stylesheet.

React Native projects should continue to install `@tutti-ui/react-native` directly.

## Links

- [Storybook](https://lanegarner.github.io/tutti-ui/)
- [GitHub](https://github.com/LaneGarner/tutti-ui)
- [Scoped React package](https://www.npmjs.com/package/@tutti-ui/react)
