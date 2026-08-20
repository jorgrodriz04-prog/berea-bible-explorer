import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { AppShell } from "@/components/berea/app-shell";
import { EmptyState } from "@/components/berea/section";
import { ResultCard } from "@/components/berea/result-card";
import { Input } from "@/components/ui/input";
import { AppLink } from "@/components/berea/app-link";
import {
  search,
  groupedSearch,
  refShortcut,
  suggestedQueries,
  resultTypeLabel,
  type ResultType,
} from "@/lib/search";

const filters: Array<ResultType | "todo"> = [
  "todo",
  "versiculo",
  "tema",
  "personaje",
  "lugar",
  "acontecimiento",
  "termino",
  "ley",
  "costumbre",
  "estudio",
  "libro",
];

export const Route = createFileRoute("/buscar")({
  validateSearch: (input: Record<string, unknown>) => ({
    q: typeof input["q"] === "string" ? (input["q"] as string) : "",
    tipo: (filters as string[]).includes(String(input["tipo"]))
      ? (input["tipo"] as ResultType | "todo")
      : ("todo" as ResultType | "todo"),
  }),
  head: () => ({
    meta: [
      { title: "Buscar — BEREA" },
      {
        name: "description",
        content:
          "Busca palabras, frases, personajes, lugares, acontecimientos, temas y doctrinas bíblicas con búsqueda tolerante a errores.",
      },
      { property: "og:title", content: "Buscar en la Biblia — BEREA" },
      {
        property: "og:description",
        content: "Encuentra contenido bíblico relacionado aunque no escribas la palabra exacta.",
      },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const { q, tipo } = Route.useSearch();
  const navigate = useNavigate({ from: "/buscar" });
  const [term, setTerm] = useState(q);

  useEffect(() => setTerm(q), [q]);

  useEffect(() => {
    if (term === q) return;
    const id = setTimeout(() => {
      navigate({ search: (prev) => ({ ...prev, q: term }), replace: true });
    }, 250);
    return () => clearTimeout(id);
  }, [term, q, navigate]);

  const results = useMemo(() => search(q, tipo), [q, tipo]);
  const groups = useMemo(() => groupedSearch(q, tipo), [q, tipo]);
  const shortcut = useMemo(() => refShortcut(q), [q]);

  const counts = useMemo(() => {
    const all = search(q, "todo");
    const map = new Map<string, number>();
    for (const r of all) map.set(r.type, (map.get(r.type) ?? 0) + 1);
    map.set("todo", all.length);
    return map;
  }, [q]);

  return (
    <AppShell title="Buscar" subtitle="Palabras, temas, personajes y lugares">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Ej.: fe, Jericó, las diez vírgenes"
          className="h-13 rounded-2xl pl-11 pr-11 text-base"
          inputMode="search"
          autoComplete="off"
          aria-label="Buscar en la Biblia"
        />
        {term ? (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => setTerm("")}
            className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      {q.length >= 2 ? (
        <div className="-mx-4 mt-4 overflow-x-auto px-4">
          <div className="flex w-max gap-2">
            {filters.map((f) => {
              const n = counts.get(f) ?? 0;
              if (f !== "todo" && n === 0) return null;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => navigate({ search: (prev) => ({ ...prev, tipo: f }) })}
                  className={`no-tap-highlight min-h-10 shrink-0 rounded-full border px-3.5 text-sm font-semibold ${
                    tipo === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {f === "todo" ? "Todo" : resultTypeLabel[f]} · {n}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {q.length < 2 ? (
        <section className="mt-6">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Búsquedas sugeridas
          </h2>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTerm(s)}
                className="no-tap-highlight min-h-10 rounded-full border border-border bg-secondary px-3.5 text-sm font-semibold text-secondary-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            La búsqueda tolera errores de escritura y acentos: «Juda», «jerico» o «perdon» también
            encuentran resultados.
          </p>
        </section>
      ) : results.length ? (
        <div className="mt-5 space-y-6">
          {shortcut ? (
            <AppLink
              href={shortcut.path}
              className="no-tap-highlight block rounded-2xl border border-primary/40 bg-primary/5 p-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                Abrir en el lector
              </p>
              <p className="mt-1 font-display text-base font-semibold text-foreground">{shortcut.label}</p>
            </AppLink>
          ) : null}
          {groups.map((g) => (
            <section key={g.type}>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {g.label} · {g.results.length}
              </h2>
              <div className="space-y-3">
                {g.results.map((r) => (
                  <ResultCard key={r.id} result={r} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Sin resultados"
            description="No hay información suficiente en BEREA para esta búsqueda. Intenta con otra palabra, un nombre propio o un tema como «pacto» o «salvación»."
          />
        </div>
      )}
    </AppShell>
  );
}
