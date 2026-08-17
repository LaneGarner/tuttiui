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

  // Web puts `.dark` on <html>; native has no such class, so NativeWind needs
  // telling directly or the `--tt-*` variables never flip and every component
  // stays light no matter what this provider resolves. Doing it here makes the
  // provider the single switch for both the variable layer and `colors`.
  //
  // Imported lazily and defensively: nativewind is a peer of the components,
  // not of this package, and a consumer using ThemeProvider purely as a state
  // holder shouldn't be forced to install it.
  useEffect(() => {
    let cancelled = false;
    // Specifier held in a variable on purpose: nativewind is not a dependency
    // of this package, so a literal import would fail typecheck here even
    // though it resolves fine in any app that actually renders the components.
    const specifier = "nativewind";
    import(specifier)
      .then((mod: { colorScheme?: { set?: (mode: ThemeMode) => void } }) => {
        if (!cancelled) mod.colorScheme?.set?.(theme);
      })
      .catch(() => {
        /* nativewind not installed — `colors` still resolves correctly */
      });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  const value = useMemo(
    () => ({ theme, preference, setPreference, colors }),
    [theme, preference, setPreference, colors]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
