export type ThemeMode = "dark" | "light";

export interface ThemeColors {
  background: string;
  card: string;
  surface: string;
  foreground: string;
  muted: string;
  mutedLight: string;
  border: string;

  teal: string;
  blue: string;
  purple: string;
  coral: string;
  gold: string;
  emerald: string;

  // Semantic
  cardMuted: string;
  overlayLight: string;
}

export const darkColors: ThemeColors = {
  background: "#0A0E1A",
  card: "#111827",
  surface: "#1E293B",
  foreground: "#E2E8F0",
  muted: "#94A3B8",
  mutedLight: "rgba(255,255,255,0.3)",
  border: "rgba(255,255,255,0.06)",

  teal: "#14B8A6",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  coral: "#F43F5E",
  gold: "#F59E0B",
  emerald: "#10B981",

  cardMuted: "rgba(255,255,255,0.03)",
  overlayLight: "rgba(255,255,255,0.06)",
};

export const lightColors: ThemeColors = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  surface: "#F1F5F9",
  foreground: "#0F172A",
  muted: "#64748B",
  mutedLight: "rgba(15,23,42,0.3)",
  border: "rgba(15,23,42,0.06)",

  teal: "#0D9488",
  blue: "#2563EB",
  purple: "#7C3AED",
  coral: "#E11D48",
  gold: "#D97706",
  emerald: "#059669",

  cardMuted: "rgba(15,23,42,0.03)",
  overlayLight: "rgba(15,23,42,0.06)",
};

export const Colors: ThemeColors = darkColors;
