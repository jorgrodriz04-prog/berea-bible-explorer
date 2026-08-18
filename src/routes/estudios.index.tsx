import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { studies } from "@/data/studies";
import { topics } from "@/data/themes";

export const Route = createFileRoute("/estudios/")({
  head: () => ({
    meta: [
      { title: "Estudios bíblicos — BEREA" },
      {
        name: "description",
        content: "Estudios bíblicos por temas: contexto histórico, textos clave, explicación y conclusión.",
      },
      { property: "og:title", content: "Estudios bíblicos — BEREA" },
      { property: "og:description", content: "Estudia la Escritura por temas, con referencias y contexto." },
    ],
  }),
  component: EstudiosIndex,
});

function EstudiosIndex() {
  const [topic, setTopic] = useState<string>("todos");
  const usedTopics = useMemo(() => {
    const ids = new Set(studies.map((s) => s.topic));
    return topics.filter((t) => ids.has(t.id));
  }, []);
  const list = useMemo(
    () => (topic === "todos" ? studies : studies.filter((s) => s.topic === topic)),
    [topic],
  );

  return (
    <AppShell title="Estudios" subtitle={`${studies.length} estudios organizados por tema`}>
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2">
          {[{ id: "todos", name: "Todos" }, ...usedTopics].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopic(t.id)}
              className={`no-tap-highlight min-h-10 shrink-0 rounded-full border px-3.5 text-sm font-semibold ${
                topic === t.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {list.map((s) => (
          <AppLink
            key={s.slug}
            href={`/estudios/${s.slug}`}
            className="no-tap-highlight block rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-primary">
              <span>{topics.find((t) => t.id === s.topic)?.name ?? s.topic}</span>
              <span className="text-muted-foreground">· {s.minutes} min</span>
            </div>
            <h2 className="mt-1 font-display text-lg font-semibold text-foreground">{s.title}</h2>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {s.introduction}
            </p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              {s.keyVerses.slice(0, 3).join(" · ")}
            </p>
          </AppLink>
        ))}
      </div>
    </AppShell>
  );
}
