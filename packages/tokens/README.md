# @tutti-ui/tokens

Design tokens for the tutti-ui design system. Includes colors, spacing, typography, radii, and shadows.

## Install

```bash
npm install @tutti-ui/tokens
```

## Usage

```ts
import { lightColors, darkColors, spacing, typography } from '@tutti-ui/tokens';
```

All numeric values are unitless px. px values are authoring units only; consumption is rem via the react tailwind preset (`@tutti-ui/react/tailwind` converts spacing, fontSize, and borderRadius at the boundary — see `packages/react/src/tailwind.ts`). Components must not hard-code px sizes in class strings or inline styles; sizes authored in px break Dynamic Type / browser font scaling. The only legitimate literal px values are hairline borders (`1px`) and the pill radius (`9999px`).

## Links

- [GitHub](https://github.com/lanegarner/tutti-ui)
- [Documentation](https://github.com/lanegarner/tutti-ui#readme)

## License

MIT
