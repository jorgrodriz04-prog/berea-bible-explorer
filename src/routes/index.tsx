import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Search, Sparkles } from "lucide-react";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { Panel, SectionTitle } from "@/components/berea/section";
import { studies } from "@/data/studies";
import { topics } from "@/data/topics";
import { getChapter } from "@/data/verses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BEREA — Estudia la Biblia con profundidad" },
      {
        name: "description",
        content:
          "Lee la Biblia, busca personajes, lugares, temas y doctrinas, y profundiza con estudios organizados. Diseñada para el teléfono.",
      },
      { property: "og:title", content: "BEREA — Estudia la Biblia con profundidad" },
      {
        property: "og:description",
        content: "Lectura bíblica, buscador temático y estudios en una aplicación móvil sencilla.",
      },
    ],
  }),
  component: Home,
});

const accesses = [
  { href: "/biblia", label: "Leer la Biblia", detail: "66 libros", icon: BookOpen },
  { href: "/buscar", label: "Buscar", detail: "Temas y palabras", icon: Search },
  { href: "/estudios", label: "Estudios", detail: `${studies.length} disponibles`, icon: GraduationCap },
];

function Home() {
  const psalm = getChapter("salmos", 23);
  const verse = psalm?.verses[0];
  const featured = studies.slice(0, 2);

  return (
    <AppShell title="BEREA" subtitle="Escudriñando cada día las Escrituras">
      <section className="gradient-hero shadow-soft relative overflow-hidden rounded-3xl p-5 text-primary-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">Hechos 17:11</p>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-snug">
          Recibieron la palabra con toda solicitud
        </h2>
        <p className="mt-2 text-sm leading-relaxed opacity-90">
          BEREA te acompaña a leer, buscar y comprender la Escritura con orden y profundidad.
        </p>
        <Link
          to="/buscar"
          search={{ q: "", tipo: "todo" }}
          className="no-tap-highlight mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-card px-4 text-sm font-semibold text-card-foreground"
        >
          <Search className="size-4" />
          Buscar en la Biblia
        </Link>
      </section>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {accesses.map(({ href, label, detail, icon: Icon }) => (
          <AppLink
            key={href}
            href={href}
            className="no-tap-highlight flex min-h-24 flex-col justify-between rounded-2xl border border-border bg-card p-3 shadow-soft"
          >
            <Icon className="size-5 text-primary" />
            <span>
              <span className="block text-sm font-semibold leading-tight text-foreground">{label}</span>
              <span className="block text-[11px] text-muted-foreground">{detail}</span>
            </span>
          </AppLink>
        ))}
      </div>

      {verse ? (
        <section className="mt-6">
          <SectionTitle
            action={
              <AppLink href="/biblia/salmos/23" className="text-xs font-semibold text-primary">
                Abrir capítulo
              </AppLink>
            }
          >
            Versículo del día
          </SectionTitle>
          <Panel>
            <p className="scripture text-card-foreground">{verse.text}</p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">Salmos 23:1</p>
          </Panel>
        </section>
      ) : null}

      <section className="mt-6">
        <SectionTitle
          action={
            <Link to="/estudios" className="text-xs font-semibold text-primary">
              Ver todos
            </Link>
          }
        >
          Estudios destacados
        </SectionTitle>
        <div className="space-y-3">
          {featured.map((s) => (
            <AppLink
              key={s.slug}
              href={`/estudios/${s.slug}`}
              className="no-tap-highlight block rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <span className="text-[11px] font-bold uppercase tracking-wide text-primary">
                {s.minutes} min de lectura
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.introduction}</p>
            </AppLink>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>Temas para explorar</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {topics.slice(0, 8).map((t) => (
            <AppLink
              key={t.id}
              href={`/tema/tema/${t.id}`}
              className="no-tap-highlight inline-flex min-h-10 items-center rounded-full border border-border bg-secondary px-3.5 text-sm font-semibold text-secondary-foreground"
            >
              {t.name}
            </AppLink>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <Panel className="border-dashed">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold text-foreground">
                Asistente bíblico con IA
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Próximamente podrás hacer preguntas de estudio y guardar las respuestas en favoritos.
                La estructura ya está preparada.
              </p>
            </div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
