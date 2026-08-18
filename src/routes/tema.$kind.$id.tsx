import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { FavoriteButton } from "@/components/berea/favorite-button";
import { Panel, SectionTitle } from "@/components/berea/section";
import { RefChipList } from "@/components/berea/ref-chip";
import { getPerson } from "@/data/people";
import { getPlace } from "@/data/places";
import { getEvent } from "@/data/events";
import { getTopic } from "@/data/themes";
import { studies } from "@/data/studies";

type Kind = "personaje" | "lugar" | "acontecimiento" | "tema";

const kindLabel: Record<Kind, string> = {
  personaje: "Personaje",
  lugar: "Lugar",
  acontecimiento: "Acontecimiento",
  tema: "Tema y doctrina",
};

export const Route = createFileRoute("/tema/$kind/$id")({
  loader: ({ params }) => {
    const kind = params.kind as Kind;
    const entity =
      kind === "personaje"
        ? getPerson(params.id)
        : kind === "lugar"
          ? getPlace(params.id)
          : kind === "acontecimiento"
            ? getEvent(params.id)
            : kind === "tema"
              ? getTopic(params.id)
              : undefined;
    if (!entity) throw notFound();
    const name = "name" in entity ? entity.name : params.id;
    const subtitle =
      "role" in entity
        ? entity.role
        : "region" in entity
          ? entity.region
          : "period" in entity
            ? entity.period
            : "kind" in entity
              ? entity.kind
              : "";
    return { kind, id: params.id, name, subtitle, summary: entity.summary, refs: entity.refs };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} — BEREA` : "BEREA";
    const description = loaderData?.summary.slice(0, 155) ?? "Contenido bíblico en BEREA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: EntityPage,
});

function EntityPage() {
  const { kind, id, name, subtitle, summary, refs } = Route.useLoaderData();
  const related = studies.filter(
    (s) => s.topic === id || s.people.includes(id) || s.places.includes(id),
  );

  return (
    <AppShell
      title={name}
      subtitle={`${kindLabel[kind]}${subtitle ? ` · ${subtitle}` : ""}`}
      back
      action={
        <FavoriteButton
          favorite={{
            id: `${kind}:${id}`,
            kind: "tema",
            title: name,
            subtitle: kindLabel[kind],
            body: summary,
            path: `/tema/${kind}/${id}`,
          }}
        />
      }
    >
      <Panel>
        <p className="scripture text-card-foreground">{summary}</p>
      </Panel>

      <section className="mt-6">
        <SectionTitle>Referencias bíblicas</SectionTitle>
        <RefChipList refs={refs} />
      </section>

      {related.length ? (
        <section className="mt-6">
          <SectionTitle>Estudios relacionados</SectionTitle>
          <div className="space-y-3">
            {related.map((s) => (
              <AppLink
                key={s.slug}
                href={`/estudios/${s.slug}`}
                className="no-tap-highlight block rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.introduction}</p>
              </AppLink>
            ))}
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
