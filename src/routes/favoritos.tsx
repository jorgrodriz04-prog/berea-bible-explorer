import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { EmptyState } from "@/components/berea/section";
import { favoriteKindLabel, useFavorites, type FavoriteKind } from "@/lib/favorites";

const kinds: Array<FavoriteKind | "todos"> = ["todos", "versiculo", "estudio", "tema", "busqueda", "ia"];

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — BEREA" },
      {
        name: "description",
        content: "Tus versículos, estudios, temas y búsquedas guardadas en BEREA, siempre a mano.",
      },
      { property: "og:title", content: "Favoritos — BEREA" },
      { property: "og:description", content: "Guarda y recupera lo que estás estudiando." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { favorites, remove, ready } = useFavorites();
  const [kind, setKind] = useState<FavoriteKind | "todos">("todos");

  const list = useMemo(
    () => (kind === "todos" ? favorites : favorites.filter((f) => f.kind === kind)),
    [favorites, kind],
  );

  return (
    <AppShell title="Favoritos" subtitle={`${favorites.length} elemento(s) guardado(s)`}>
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`no-tap-highlight min-h-10 shrink-0 rounded-full border px-3.5 text-sm font-semibold ${
                kind === k
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {k === "todos" ? "Todos" : favoriteKindLabel[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {!ready ? null : list.length ? (
          list.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <AppLink href={f.path} className="min-w-0 no-tap-highlight">
                  <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-secondary-foreground">
                    {favoriteKindLabel[f.kind]}
                  </span>
                  <h2 className="mt-2 font-display text-base font-semibold text-foreground">{f.title}</h2>
                  {f.body ? (
                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{f.body}</p>
                  ) : null}
                </AppLink>
                <button
                  type="button"
                  aria-label={`Quitar ${f.title}`}
                  onClick={() => remove(f.id)}
                  className="no-tap-highlight flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="Aún no tienes favoritos"
            description="Guarda versículos, estudios, temas o resultados de búsqueda tocando el corazón."
          >
            <Link
              to="/buscar"
              search={{ q: "", tipo: "todo" }}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Ir a Buscar
            </Link>
          </EmptyState>
        )}
      </div>
    </AppShell>
  );
}
