import { createContext } from "react";
import { lightColors } from "@tutti-ui/tokens";
import type { ThemeContextValue } from "../types";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  preference: "system",
  setPreference: () => {},
  colors: lightColors,
});
