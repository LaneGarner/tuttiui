# Migrating to tuttiui

The design system is moving to the lowercase `tuttiui` brand and npm namespace.
Published npm packages cannot be renamed, so consumers must update package names
and imports.

| Previous package | New package |
| --- | --- |
| `tutti-ui` | `tuttiui` |
| `@tutti-ui/react` | `@tuttiui/react` |
| `@tutti-ui/react-native` | `@tuttiui/react-native` |
| `@tutti-ui/tokens` | `@tuttiui/tokens` |
| `@tutti-ui/shared` | `@tuttiui/shared` |

For web projects, the recommended migration is to the single-install package:

```bash
npm uninstall tutti-ui @tutti-ui/react @tutti-ui/tokens @tutti-ui/shared
npm install tuttiui
```

```diff
-import { Button } from "@tutti-ui/react";
-import { spacing } from "@tutti-ui/tokens";
+import { Button, spacing } from "tuttiui";
```

Framework-explicit imports remain available under `@tuttiui/*`. React Native
projects should replace the old scope directly:

```bash
npm uninstall @tutti-ui/react-native @tutti-ui/tokens @tutti-ui/shared
npm install @tuttiui/react-native nativewind
```

The CSS custom properties (`--tt-*`) and theme attribute
(`data-tt-theme`) are unchanged, so application theme overrides do not need to
be rewritten.
