import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkColors, lightColors, type ThemeColors, type ThemeMode } from "@/theme/colors";

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  toggle: () => void;
  setMode: (m: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "vita-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          setModeState(stored);
        }
      } catch {
        // ignore
      }
    } else {
      AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
        if (stored === "light" || stored === "dark") {
          setModeState(stored);
        }
      });
    }
  }, []);

  function setMode(next: ThemeMode) {
    setModeState(next);
    if (Platform.OS === "web") {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
    } else {
      AsyncStorage.setItem(STORAGE_KEY, next);
    }
  }

  const toggle = () => setMode(mode === "dark" ? "light" : "dark");
  const colors = mode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggle, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
