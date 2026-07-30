import type { SemanticColors, ColorPalette } from "./types";

export const palette: ColorPalette = {
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },
  blue: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
    950: "#172554",
  },
  green: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
    950: "#022C22",
  },
  amber: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
    950: "#451A03",
  },
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
    950: "#450A0A",
  },
  // Added in 0.3.0. AgentWorkflow's "streaming" state was already rendering
  // bg-cyan-500, which only worked because consumers happened to have
  // Tailwind's stock palette — it was never in this file.
  cyan: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    200: "#A5F3FC",
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#06B6D4",
    600: "#0891B2",
    700: "#0E7490",
    800: "#155E75",
    900: "#164E63",
    950: "#083344",
  },
};

const p = palette;

/**
 * Light theme.
 *
 * Every value here is the literal color the components rendered before the
 * semantic layer existed. Adopting `bg-tt-surface` in place of `bg-white` must
 * not change a single pixel in light mode — that constraint is what makes this
 * migration verifiable, since any light-mode visual diff is by definition a
 * mistake rather than a design decision.
 */
export const lightColors: SemanticColors = {
  canvas: p.gray[50],
  surface: "#FFFFFF",
  surface2: p.gray[100],
  surface3: p.gray[200],
  surfaceHover: p.gray[100],
  surfaceActive: p.gray[200],
  field: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.5)",
  inverse: p.gray[900],
  inverseFg: "#FFFFFF",

  fg: p.gray[900],
  fgStrong: p.gray[800],
  fgMuted: p.gray[700],
  fgSubtle: p.gray[500],
  fgFaint: p.gray[400],

  border: p.gray[200],
  borderStrong: p.gray[300],
  focus: p.blue[500],

  primary: p.blue[600],
  primaryHover: p.blue[700],
  primaryFg: "#FFFFFF",
  primarySubtle: p.blue[50],
  primaryOnSubtle: p.blue[900],

  success: p.green[500],
  successFg: "#FFFFFF",
  successSubtle: p.green[50],
  successOnSubtle: p.green[800],
  successBorder: p.green[200],

  warning: p.amber[500],
  warningFg: "#FFFFFF",
  warningSubtle: p.amber[50],
  warningOnSubtle: p.amber[800],
  warningBorder: p.amber[200],

  danger: p.red[500],
  dangerFg: "#FFFFFF",
  dangerSubtle: p.red[50],
  dangerOnSubtle: p.red[800],
  dangerBorder: p.red[200],

  info: p.blue[500],
  infoFg: "#FFFFFF",
  infoSubtle: p.blue[50],
  infoOnSubtle: p.blue[800],
  infoBorder: p.blue[200],

  dangerStrong: p.red[600],
  dangerStrongHover: p.red[700],
  successStrong: p.green[600],

  stream: p.cyan[500],
  streamFg: "#FFFFFF",

  // legacy aliases
  background: p.gray[50],
  surfaceSecondary: p.gray[100],
  text: p.gray[900],
  textSecondary: p.gray[500],
  textTertiary: p.gray[400],
  primaryDark: p.blue[700],
  error: p.red[500],
};

/**
 * Dark theme.
 *
 * Unlike light, these values are chosen rather than inherited, so they follow
 * the rule light mode couldn't: solid status fills go *brighter* and take dark
 * foregrounds. White on a mid-tone green sits near 2.5:1 — legal nowhere — and
 * the only reason light mode still does it is the pixel-identity constraint
 * above. Dark mode has no such excuse, so it doesn't.
 */
export const darkColors: SemanticColors = {
  canvas: "#0A0A0A",
  surface: "#18181B",
  surface2: "#27272A",
  surface3: "#3F3F46",
  surfaceHover: "#27272A",
  surfaceActive: "#3F3F46",
  field: "#18181B",
  overlay: "rgba(0, 0, 0, 0.7)",
  inverse: "#F4F4F5",
  inverseFg: "#18181B",

  fg: "#FAFAFA",
  fgStrong: "#E4E4E7",
  fgMuted: "#D4D4D8",
  fgSubtle: "#A1A1AA",
  fgFaint: "#8B8B93",

  border: "#27272A",
  borderStrong: "#3F3F46",
  focus: p.blue[400],

  primary: p.blue[400],
  primaryHover: p.blue[300],
  primaryFg: p.blue[950],
  primarySubtle: p.blue[950],
  primaryOnSubtle: p.blue[200],

  success: p.green[400],
  successFg: p.green[950],
  successSubtle: p.green[950],
  successOnSubtle: p.green[300],
  successBorder: p.green[800],

  warning: p.amber[400],
  warningFg: p.amber[950],
  warningSubtle: p.amber[950],
  warningOnSubtle: p.amber[300],
  warningBorder: p.amber[800],

  danger: p.red[400],
  dangerFg: p.red[950],
  dangerSubtle: p.red[950],
  dangerOnSubtle: p.red[300],
  dangerBorder: p.red[800],

  info: p.blue[400],
  infoFg: p.blue[950],
  infoSubtle: p.blue[950],
  infoOnSubtle: p.blue[200],
  infoBorder: p.blue[800],

  dangerStrong: p.red[400],
  dangerStrongHover: p.red[300],
  successStrong: p.green[400],

  stream: p.cyan[400],
  streamFg: p.cyan[950],

  // legacy aliases
  background: "#0A0A0A",
  surfaceSecondary: "#27272A",
  text: "#FAFAFA",
  textSecondary: "#A1A1AA",
  textTertiary: "#8B8B93",
  primaryDark: p.blue[400],
  error: p.red[400],
};
