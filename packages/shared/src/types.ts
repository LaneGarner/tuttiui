import type { SemanticColors } from "@tutti-ui/tokens";

export type ThemeMode = "light" | "dark";

export type ThemePreference = "system" | "light" | "dark";

export interface ThemeContextValue {
  theme: ThemeMode;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  colors: SemanticColors;
}
