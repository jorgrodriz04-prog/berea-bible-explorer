import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type FavoriteKind = "versiculo" | "estudio" | "tema" | "busqueda" | "ia";

export interface Favorite {
  id: string;
  kind: FavoriteKind;
  title: string;
  subtitle?: string;
  body?: string;
  path: string;
  createdAt: number;
}

const STORAGE_KEY = "berea.favorites.v1";

interface Ctx {
  favorites: Favorite[];
  isFavorite: (id: string) => boolean;
  toggle: (fav: Omit<Favorite, "createdAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
  ready: boolean;
}

const FavoritesContext = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw) as Favorite[]);
    } catch {
      /* almacenamiento no disponible */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [favorites, ready]);

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);

  const toggle = useCallback((fav: Omit<Favorite, "createdAt">) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === fav.id)
        ? prev.filter((f) => f.id !== fav.id)
        : [{ ...fav, createdAt: Date.now() }, ...prev],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clear = useCallback(() => setFavorites([]), []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggle, remove, clear, ready }),
    [favorites, isFavorite, toggle, remove, clear, ready],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}

export const favoriteKindLabel: Record<FavoriteKind, string> = {
  versiculo: "Versículos",
  estudio: "Estudios",
  tema: "Temas",
  busqueda: "Búsquedas",
  ia: "Respuestas IA",
};
