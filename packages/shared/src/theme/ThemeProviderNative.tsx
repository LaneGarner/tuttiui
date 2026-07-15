import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "@tutti-ui/tokens";
import { ThemeContext } from "./ThemeContext";
import type { ThemePreference, ThemeMode } from "../types";

interface ThemeProviderProps {
  children: ReactNode;
  initialPreference?: ThemePreference;
  onPreferenceChange?: (preference: ThemePreference) => void;
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
  const colorScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>(initialPreference);
  const systemTheme: ThemeMode = colorScheme === "dark" ? "dark" : "light";

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
