import { spacing, fontSizes, radii, palette, shadows } from "@tutti-ui/tokens";

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

export const tuttiPreset = {
  theme: {
    extend: {
      colors: {
        gray: palette.gray,
        blue: palette.blue,
        green: palette.green,
        amber: palette.amber,
        red: palette.red,
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
};
