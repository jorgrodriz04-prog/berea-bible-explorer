import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface Settings {
  theme: ThemeMode;
  fontScale: number;
}

const STORAGE_KEY = "berea.settings.v1";
const defaults: Settings = { theme: "system", fontScale: 1 };

interface Ctx extends Settings {
  setTheme: (theme: ThemeMode) => void;
  setFontScale: (scale: number) => void;
  resolvedTheme: "light" | "dark";
}

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaults, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      /* ignorar */
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = settings.theme === "system" ? (systemDark ? "dark" : "light") : settings.theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.setProperty("--reading-scale", String(settings.fontScale));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignorar */
    }
  }, [resolvedTheme, settings]);

  const value = useMemo<Ctx>(
    () => ({
      ...settings,
      resolvedTheme,
      setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
      setFontScale: (fontScale) => setSettings((s) => ({ ...s, fontScale })),
    }),
    [settings, resolvedTheme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings debe usarse dentro de SettingsProvider");
  return ctx;
}
