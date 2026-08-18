import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import { lightColors, darkColors } from "@tuttiui/tokens";
import { ThemeContext } from "./ThemeContext";
import type { ThemePreference, ThemeMode } from "../types";

interface ThemeProviderProps {
  children: ReactNode;
  initialPreference?: ThemePreference;
  onPreferenceChange?: (preference: ThemePreference) => void;
}

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(preference: ThemePreference, systemTheme: ThemeMode): ThemeMode {
  if (preference === "system") return systemTheme;
  return preference;
}

export function ThemeProvider({
  children,
  initialPreference = "system",
  onPreferenceChange,
}: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(initialPreference);
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const setPreference = useCallback(
    (newPreference: ThemePreference) => {
      setPreferenceState(newPreference);
      onPreferenceChange?.(newPreference);
    },
    [onPreferenceChange]
  );

  const theme = resolveTheme(preference, systemTheme);
  const colors = theme === "dark" ? darkColors : lightColors;

  const value = useMemo(
    () => ({ theme, preference, setPreference, colors }),
    [theme, preference, setPreference, colors]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
