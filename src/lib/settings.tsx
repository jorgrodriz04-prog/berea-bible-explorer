import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PUBLIC_DOMAIN_VERSION_ID, getVersion } from "@/data/bible/versions";

export type ThemeMode = "light" | "dark" | "system";

interface Settings {
  theme: ThemeMode;
  fontScale: number;
  /** Versión bíblica elegida para la lectura. */
  versionId: string;
}

const STORAGE_KEY = "berea.settings.v1";
/**
 * Por defecto se lee la versión de dominio público incluida (RVR1909): es la
 * única cuyo texto BEREA puede mostrar sin una licencia de distribución.
 */
const defaults: Settings = { theme: "system", fontScale: 1, versionId: PUBLIC_DOMAIN_VERSION_ID };

interface Ctx extends Settings {
  setTheme: (theme: ThemeMode) => void;
  setFontScale: (scale: number) => void;
  setVersionId: (id: string) => void;
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
