import { lightColors, darkColors, palette } from "./colors";
import { buildThemeCss, toKebab, cssVarName, toCssVars } from "./css";

describe("semantic color tokens", () => {
  it("defines the same keys in light and dark", () => {
    // The single most likely way this system breaks is someone adding a token
    // to one theme and forgetting the other, which produces a variable that
    // silently keeps its light value in dark mode.
    expect(Object.keys(lightColors).sort()).toEqual(
      Object.keys(darkColors).sort()
    );
  });

  it("has no empty values", () => {
    for (const [theme, colors] of [
      ["light", lightColors],
      ["dark", darkColors],
    ] as const) {
      for (const [key, value] of Object.entries(colors)) {
        expect(`${theme}.${key} = ${value}`).toMatch(/= (#|rgb)/);
      }
    }
  });

  it("keeps light values identical to the pre-0.3.0 rendered literals", () => {
    // Adopting the semantic layer must not change light mode. Spot-check the
    // tokens that stand in for the most widely used literals.
    expect(lightColors.surface).toBe("#FFFFFF");
    expect(lightColors.surface2).toBe(palette.gray[100]);
    expect(lightColors.border).toBe(palette.gray[200]);
    expect(lightColors.borderStrong).toBe(palette.gray[300]);
    expect(lightColors.fg).toBe(palette.gray[900]);
    expect(lightColors.fgMuted).toBe(palette.gray[700]);
    expect(lightColors.fgSubtle).toBe(palette.gray[500]);
    expect(lightColors.fgFaint).toBe(palette.gray[400]);
    expect(lightColors.primary).toBe(palette.blue[600]);
    expect(lightColors.focus).toBe(palette.blue[500]);
    expect(lightColors.dangerStrong).toBe(palette.red[600]);
  });

  it("keeps the deprecated 0.2.0 aliases resolvable", () => {
    // Anything reading useTheme().colors.text should keep working.
    expect(lightColors.text).toBe(lightColors.fg);
    expect(lightColors.textSecondary).toBe(lightColors.fgSubtle);
    expect(lightColors.textTertiary).toBe(lightColors.fgFaint);
    expect(lightColors.surfaceSecondary).toBe(lightColors.surface2);
    expect(darkColors.text).toBe(darkColors.fg);
    expect(darkColors.surfaceSecondary).toBe(darkColors.surface2);
  });
});

describe("buildThemeCss", () => {
  it("kebab-cases keys, including trailing digits", () => {
    expect(toKebab("fgMuted")).toBe("fg-muted");
    expect(toKebab("surface2")).toBe("surface-2");
    expect(toKebab("successOnSubtle")).toBe("success-on-subtle");
    expect(toKebab("dangerStrongHover")).toBe("danger-strong-hover");
    expect(cssVarName("fgFaint")).toBe("--tt-fg-faint");
  });

  it("emits one variable per token, in both themes", () => {
    const css = buildThemeCss();
    const declared = css.match(/--tt-[a-z0-9-]+:/g) ?? [];
    expect(declared).toHaveLength(Object.keys(lightColors).length * 2);
  });

  it("pairs the dark class with an attribute selector", () => {
    // Tailwind's addBase output is content-filtered; a bare `.dark` rule gets
    // dropped when the consumer's source never contains the string "dark".
    expect(buildThemeCss()).toContain('.dark, [data-tt-theme="dark"]');
  });

  it("produces variable names that are unique", () => {
    const names = Object.keys(toCssVars(lightColors));
    expect(new Set(names).size).toBe(names.length);
  });
});
