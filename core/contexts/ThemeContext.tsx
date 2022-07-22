import { ThemeContextValue, ThemeProviderProps } from "@core/types";
import { createContext, useState } from "react";

export const ThemeContext = createContext({} as ThemeContextValue);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setAppTheme(appTheme === "light" ? "dark" : "light");
  };

  const setAppThemeToLight = () => {
    setAppTheme("light");
  };

  const setAppThemeToDark = () => {
    setAppTheme("dark");
  };

  const themeValue = {
    appTheme,
    toggleTheme,
    setAppThemeToLight,
    setAppThemeToDark,
  };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};
