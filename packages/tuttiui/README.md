# tuttiui

The convenient, single-install entry point for tuttiui's React components and design tokens.

## Install

```bash
npm install tuttiui
```

React and React DOM are peer dependencies, so applications continue to control their versions.

## Usage

Import components and tokens from one package:

```tsx
import { Button, Card, spacing, lightColors } from "tuttiui";
```

Or use explicit subpaths:

```tsx
import { Button } from "tuttiui/react";
import { spacing } from "tuttiui/tokens";
import { tuttiPreset } from "tuttiui/tailwind";
import "tuttiui/theme.css";
```

Existing `@tuttiui/react` and `@tuttiui/tokens` imports remain fully supported. This package re-exports them; it does not copy their implementations.

## Tailwind CSS

Add the preset and installed component build to `tailwind.config.js`:

```js
const { tuttiPreset } = require("tuttiui/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tuttiui/react/dist/**/*.{js,mjs}",
  ],
  presets: [tuttiPreset],
};
```

The generated semantic theme variables are also available directly:

```css
@import "tuttiui/theme.css";
```

## What gets installed

`tuttiui` depends on `@tuttiui/react` and `@tuttiui/tokens`. The React package brings in `@tuttiui/shared` as its own dependency. Package managers can install and deduplicate the underlying packages normally; this package contains only re-export entry points and the generated theme stylesheet.

React Native projects should continue to install `@tuttiui/react-native` directly.

## Links

- [Storybook](https://lanegarner.github.io/tuttiui/)
- [GitHub](https://github.com/LaneGarner/tuttiui)
- [Scoped React package](https://www.npmjs.com/package/@tuttiui/react)

> **Parked (2026-08-18):** this package is marked `private` so releases skip it — npm currently rejects the name as too similar to `tutti-ui` (also owned by Lane). When ready to claim it: unpublish/resolve `tutti-ui`, set `"private": false`, restore `tuttiui` to the linked group in `.changeset/config.json`, and publish.
