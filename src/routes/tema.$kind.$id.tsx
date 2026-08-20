import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { FavoriteButton } from "@/components/berea/favorite-button";
import { SectionTitle } from "@/components/berea/section";
import { RefChipList } from "@/components/berea/ref-chip";
import {
  CrossRefPanel,
  LayeredContent,
  RelationSections,
  SourcesNote,
} from "@/components/berea/knowledge-panels";
import { crossRefsForRef, entityKindLabel, getEntity, type EntityKind } from "@/lib/knowledge";

const kinds: EntityKind[] = [
  "personaje",
  "lugar",
  "acontecimiento",
  "tema",
  "termino",
  "costumbre",
  "ley",
];

export const Route = createFileRoute("/tema/$kind/$id")({
  loader: ({ params }) => {
    if (!kinds.includes(params.kind as EntityKind)) throw notFound();
    const entity = getEntity(params.kind, params.id);
    if (!entity) throw notFound();
    return { entity };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.entity;
    const title = e ? `${e.name} — BEREA` : "BEREA";
    const description = e ? e.summary.slice(0, 155) : "Contenido bíblico en BEREA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: EntityPage,
});

function EntityPage() {
  const { entity } = Route.useLoaderData();
  const crossRefs = entity.refs.filter((r) => crossRefsForRef(r));

  return (
    <AppShell
      title={entity.name}
      subtitle={`${entityKindLabel[entity.kind]}${entity.subtitle ? ` · ${entity.subtitle}` : ""}`}
      back
      action={
        <FavoriteButton
          favorite={{
            id: `${entity.kind}:${entity.id}`,
            kind: "tema",
            title: entity.name,
            subtitle: entityKindLabel[entity.kind],
            body: entity.summary,
            path: `/tema/${entity.kind}/${entity.id}`,
          }}
        />
      }
    >
      <LayeredContent layers={entity.layers} />

      {entity.aliases.length ? (
        <p className="mt-3 text-xs text-muted-foreground">
          También aparece como: {entity.aliases.join(", ")}.
        </p>
      ) : null}

      {entity.refs.length ? (
        <section className="mt-6">
          <SectionTitle>Textos bíblicos</SectionTitle>
          <RefChipList refs={entity.refs} />
        </section>
      ) : null}

      {crossRefs.length ? (
        <section className="mt-6">
          <SectionTitle>Referencias cruzadas</SectionTitle>
          <div className="space-y-3">
            {crossRefs.map((r) => (
              <CrossRefPanel key={r} reference={r} />
            ))}
          </div>
        </section>
      ) : null}

      <RelationSections relations={entity.relations} />

      <SourcesNote ids={entity.sources} />
    </AppShell>
  );
}
