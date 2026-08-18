import { lightColors, darkColors } from "./colors";
import type { SemanticColors } from "./types";

/** `surfaceHover` -> `surface-hover`, `surface2` -> `surface-2`. */
export const toKebab = (key: string): string =>
  key.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();

/** `fgMuted` -> `--tt-fg-muted`. */
export const cssVarName = (key: string): string => `--tt-${toKebab(key)}`;

export const toCssVars = (colors: SemanticColors): Record<string, string> =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [cssVarName(key), value])
  );

/**
 * The selector the dark variables hang off.
 *
 * The attribute half is not decoration. Tailwind v3 runs `addBase` output
 * through the content scanner, so a bare `.dark { ... }` rule emitted from a
 * plugin is silently dropped unless the literal string "dark" happens to appear
 * in the consumer's scanned source. Pairing the class with an attribute
 * selector makes the rule un-purgeable, and it gives consumers who drive theming
 * off `data-*` rather than a class a supported hook for free.
 */
export const DARK_SELECTOR = '.dark, [data-tt-theme="dark"]';

const block = (selector: string, vars: Record<string, string>): string =>
  `${selector} {\n` +
  Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n") +
  `\n}`;

/**
 * The stylesheet shipped as `@tuttiui/tokens/theme.css`.
 *
 * Generated from the token objects rather than maintained by hand, so the
 * variable list cannot drift from `SemanticColors`.
 */
export const buildThemeCss = (): string =>
  [
    "/* Generated from @tuttiui/tokens. Do not edit by hand. */",
    block(":root", toCssVars(lightColors)),
    "",
    block(DARK_SELECTOR, toCssVars(darkColors)),
    "",
  ].join("\n");
