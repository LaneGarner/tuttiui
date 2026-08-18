# @tuttiui/tokens

Design tokens for the tuttiui design system. Includes colors, spacing, typography, radii, and shadows.

## Install

```bash
npm install @tuttiui/tokens
```

## Usage

```ts
import { lightColors, darkColors, spacing, typography } from '@tuttiui/tokens';
```

All numeric values are unitless px. px values are authoring units only; consumption is rem via the react tailwind preset (`@tuttiui/react/tailwind` converts spacing, fontSize, and borderRadius at the boundary — see `packages/react/src/tailwind.ts`). Components must not hard-code px sizes in class strings or inline styles; sizes authored in px break Dynamic Type / browser font scaling. The only legitimate literal px values are hairline borders (`1px`) and the pill radius (`9999px`).

## Links

- [GitHub](https://github.com/lanegarner/tuttiui)
- [Documentation](https://github.com/lanegarner/tuttiui#readme)

## License

MIT
