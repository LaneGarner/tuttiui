import {
  spacing,
  fontSizes,
  radii,
  palette,
  shadows,
  lightColors,
  darkColors,
  toCssVars,
  cssVarName,
  DARK_SELECTOR,
} from "@tuttiui/tokens";
import plugin from "tailwindcss/plugin";

function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

function mapValues<T extends Record<string, number>>(
  obj: T,
  fn: (value: number) => string
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value as number)])
  );
}

/**
 * Semantic colors as Tailwind color names, each pointing at a CSS variable
 * rather than a literal. `bg-tt-surface` resolves to whatever `--tt-surface`
 * says at that point in the DOM, which is what makes both dark mode and
 * consumer retheming work without a single `dark:` variant in component source.
 *
 * Names are prefixed `tt-` for three separate reasons: consumers routinely
 * define their own `surface`/`border`/`accent` colors and would otherwise
 * silently win the merge; unprefixed words like `subtle` and `none` collide
 * with real Tailwind utilities (`bg-center`, `border-none`); and the prefix
 * keeps tailwind-merge's class-group resolution unambiguous, so a consumer's
 * `className` override still beats the component's default.
 */
const semanticColors: Record<string, string> = Object.fromEntries(
  Object.keys(lightColors).map((key) => [
    `tt-${cssVarName(key).replace(/^--tt-/, "")}`,
    `var(${cssVarName(key)})`,
  ])
);

/**
 * Declares the semantic variables for both themes.
 *
 * The dark rule is emitted against `.dark, [data-tt-theme="dark"]` rather than
 * a bare `.dark`. Tailwind v3 passes `addBase` output through the content
 * scanner, so a lone class selector is dropped whenever the consumer's scanned
 * source never contains the string "dark" — which is exactly the case for an
 * app that has finished migrating off `dark:` utilities. Pairing the class with
 * an attribute selector makes the rule survive, and hands `data-*`-driven
 * theming a supported hook at no extra cost.
 *
 * Consumers override by redeclaring any `--tt-*` variable after `@tailwind
 * base`; equal specificity means the later declaration wins.
 */
const themeVariablesPlugin = plugin(({ addBase, config }) => {
  const darkMode = config("darkMode");
  const strategy = Array.isArray(darkMode) ? darkMode[0] : darkMode;

  addBase({ ":root": toCssVars(lightColors) });

  if (strategy === "media") {
    addBase({
      "@media (prefers-color-scheme: dark)": { ":root": toCssVars(darkColors) },
    });
  } else {
    addBase({ [DARK_SELECTOR]: toCssVars(darkColors) });
  }
});

export const tuttiPreset = {
  // Opt into class-based dark mode by default. The variable layer above keys
  // off `.dark`, and a consumer who prefers the media strategy can still set
  // `darkMode: "media"` in their own config — presets are overridable, and the
  // plugin reads the resolved value and emits a media query instead.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic names first — the vocabulary components actually use.
        ...semanticColors,
        // Raw scales stay exported so consumers keep their own `bg-blue-600`.
        gray: palette.gray,
        blue: palette.blue,
        green: palette.green,
        amber: palette.amber,
        red: palette.red,
        cyan: palette.cyan,
      },
      spacing: mapValues(spacing as unknown as Record<string, number>, pxToRem),
      fontSize: Object.fromEntries(
        Object.entries(fontSizes).map(([key, value]) => [key, pxToRem(value)])
      ),
      borderRadius: mapValues(radii as unknown as Record<string, number>, (v) =>
        v === 9999 ? "9999px" : pxToRem(v)
      ),
      boxShadow: shadows,
    },
  },
  plugins: [themeVariablesPlugin],
};
