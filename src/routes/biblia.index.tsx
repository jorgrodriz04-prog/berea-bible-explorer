import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { booksByTestament } from "@/data/bible/books";
import { Input } from "@/components/ui/input";
import { normalize } from "@/lib/text";

export const Route = createFileRoute("/biblia/")({
  head: () => ({
    meta: [
      { title: "Biblia — BEREA" },
      {
        name: "description",
        content: "Navega el Antiguo y el Nuevo Testamento por libros y capítulos en BEREA.",
      },
      { property: "og:title", content: "Biblia — BEREA" },
      { property: "og:description", content: "Antiguo y Nuevo Testamento, libro por libro." },
    ],
  }),
  component: BibliaIndex,
});

function BibliaIndex() {
  const [testament, setTestament] = useState<"AT" | "NT">("AT");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const all = booksByTestament(testament);
    const q = normalize(query);
    if (!q) return all;
    return all.filter((b) => normalize(`${b.name} ${b.abbr} ${b.group}`).includes(q));
  }, [testament, query]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof list>();
    for (const b of list) map.set(b.group, [...(map.get(b.group) ?? []), b]);
    return [...map.entries()];
  }, [list]);

  return (
    <AppShell title="Biblia" subtitle="Selecciona un libro">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1">
        {(["AT", "NT"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTestament(t)}
            className={`no-tap-highlight min-h-11 rounded-xl text-sm font-semibold transition-colors ${
              testament === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
            }`}
          >
            {t === "AT" ? "Antiguo Testamento" : "Nuevo Testamento"}
          </button>
        ))}
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filtrar libros…"
        className="mt-4 h-12 rounded-xl text-base"
        inputMode="search"
      />

      <div className="mt-5 space-y-6">
        {groups.map(([group, items]) => (
          <section key={group}>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {group}
            </h2>
            <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {items.map((b) => (
                <li key={b.id} className="border-b border-border last:border-b-0">
                  <AppLink
                    href={`/biblia/${b.id}`}
                    className="no-tap-highlight flex min-h-14 items-center justify-between gap-3 px-4"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-foreground">{b.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {b.chapters} capítulo{b.chapters > 1 ? "s" : ""}
                      </span>
                    </span>
                    <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                  </AppLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {!groups.length ? (
          <p className="text-center text-sm text-muted-foreground">No se encontraron libros.</p>
        ) : null}
      </div>
    </AppShell>
  );
}
