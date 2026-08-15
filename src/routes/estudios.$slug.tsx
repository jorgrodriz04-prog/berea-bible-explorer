import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { FavoriteButton } from "@/components/berea/favorite-button";
import { Panel, SectionTitle } from "@/components/berea/section";
import { RefChipList } from "@/components/berea/ref-chip";
import { getStudy } from "@/data/studies";
import { getPerson } from "@/data/people";
import { getPlace } from "@/data/places";
import { getTopic } from "@/data/topics";

export const Route = createFileRoute("/estudios/$slug")({
  loader: ({ params }) => {
    const study = getStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    const title = s ? `${s.title} — BEREA` : "Estudio — BEREA";
    const description = s ? s.introduction.slice(0, 155) : "Estudio bíblico en BEREA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: StudyPage,
});

function StudyPage() {
  const { study } = Route.useLoaderData();
  const topic = getTopic(study.topic);

  return (
    <AppShell
      title={study.title}
      subtitle={`${topic?.name ?? study.topic} · ${study.minutes} min`}
      back
      action={
        <FavoriteButton
          favorite={{
            id: `estudio:${study.slug}`,
            kind: "estudio",
            title: study.title,
            subtitle: "Estudio",
            body: study.introduction,
            path: `/estudios/${study.slug}`,
          }}
        />
      }
    >
      <article>
        <h2 className="font-display text-2xl font-semibold leading-snug text-foreground">{study.title}</h2>
        <p className="scripture mt-3 text-muted-foreground">{study.introduction}</p>

        <section className="mt-6">
          <SectionTitle>Textos bíblicos clave</SectionTitle>
          <RefChipList refs={study.keyVerses} />
        </section>

        <section className="mt-6 space-y-4">
          <SectionTitle>Explicación</SectionTitle>
          {study.sections.map((s) => (
            <Panel key={s.heading}>
              <h3 className="font-display text-base font-semibold text-foreground">{s.heading}</h3>
              <p className="scripture mt-2 text-card-foreground">{s.body}</p>
            </Panel>
          ))}
        </section>

        {study.historicalContext ? (
          <section className="mt-6">
            <SectionTitle>Contexto histórico y cultural</SectionTitle>
            <Panel className="bg-surface">
              <p className="scripture text-surface-foreground">{study.historicalContext}</p>
            </Panel>
          </section>
        ) : null}

        {study.people.length ? (
          <section className="mt-6">
            <SectionTitle>Personajes relacionados</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {study.people.map((id) => {
                const p = getPerson(id);
                if (!p) return null;
                return (
                  <AppLink
                    key={id}
                    href={`/tema/personaje/${id}`}
                    className="no-tap-highlight min-h-10 rounded-full border border-border bg-secondary px-3.5 text-sm font-semibold text-secondary-foreground"
                  >
                    {p.name}
                  </AppLink>
                );
              })}
            </div>
          </section>
        ) : null}

        {study.places.length ? (
          <section className="mt-6">
            <SectionTitle>Lugares relacionados</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {study.places.map((id) => {
                const p = getPlace(id);
                if (!p) return null;
                return (
                  <AppLink
                    key={id}
                    href={`/tema/lugar/${id}`}
                    className="no-tap-highlight min-h-10 rounded-full border border-border bg-secondary px-3.5 text-sm font-semibold text-secondary-foreground"
                  >
                    {p.name}
                  </AppLink>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <SectionTitle>Referencias relacionadas</SectionTitle>
          <RefChipList refs={study.crossRefs} />
        </section>

        <section className="mt-6">
          <SectionTitle>Conclusión</SectionTitle>
          <Panel className="border-primary/30">
            <p className="scripture text-card-foreground">{study.conclusion}</p>
          </Panel>
        </section>
      </article>
    </AppShell>
  );
}
