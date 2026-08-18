import { people } from "@/data/people";
import { places } from "@/data/places";
import { events } from "@/data/events";
import { topics } from "@/data/themes";
import { terms } from "@/data/terms";
import { customs } from "@/data/customs";
import { laws } from "@/data/laws";
import { studies } from "@/data/studies";
import { crossReferences } from "@/data/crossReferences";
import { getSource, sourceKindLabel } from "@/data/sources";
import { getChapter } from "@/data/bible/verses";
import { parseRef } from "./refs";

export type EntityKind =
  | "personaje"
  | "lugar"
  | "acontecimiento"
  | "tema"
  | "termino"
  | "costumbre"
  | "ley"
  | "estudio";

export const entityKindLabel: Record<EntityKind, string> = {
  personaje: "Personaje",
  lugar: "Lugar",
  acontecimiento: "Acontecimiento",
  tema: "Tema y doctrina",
  termino: "Término bíblico",
  costumbre: "Costumbre y contexto",
  ley: "Ley y mandamiento",
  estudio: "Estudio",
};

export const entityKindPlural: Record<EntityKind, string> = {
  personaje: "Personas relacionadas",
  lugar: "Lugares relacionados",
  acontecimiento: "Acontecimientos relacionados",
  tema: "Temas relacionados",
  termino: "Términos relacionados",
  costumbre: "Contexto histórico y cultural",
  ley: "Leyes relacionadas",
  estudio: "Estudios relacionados",
};

export interface EntityRef {
  kind: EntityKind;
  id: string;
  name: string;
  path: string;
}

/** Capas de información: nunca se mezcla texto bíblico con reconstrucción o lectura. */
export interface KnowledgeLayers {
  biblical?: string;
  historical?: string;
  interpretations?: string[];
}

export interface KnowledgeEntity {
  kind: EntityKind;
  id: string;
  name: string;
  subtitle: string;
  summary: string;
  aliases: string[];
  refs: string[];
  layers: KnowledgeLayers;
  relations: Partial<Record<EntityKind, EntityRef[]>>;
  sources: string[];
}

export const entityPath = (kind: EntityKind, id: string) =>
  kind === "estudio" ? `/estudios/${id}` : `/tema/${kind}/${id}`;

const nameOf = (kind: EntityKind, id: string): string | undefined => {
  switch (kind) {
    case "personaje":
      return people.find((x) => x.id === id)?.name;
    case "lugar":
      return places.find((x) => x.id === id)?.name;
    case "acontecimiento":
      return events.find((x) => x.id === id)?.name;
    case "tema":
      return topics.find((x) => x.id === id)?.name;
    case "termino":
      return terms.find((x) => x.id === id)?.name;
    case "costumbre":
      return customs.find((x) => x.id === id)?.name;
    case "ley":
      return laws.find((x) => x.id === id)?.name;
    case "estudio":
      return studies.find((x) => x.slug === id)?.title;
  }
};

/** Resuelve ids a referencias navegables y descarta los que no existen (sin enlaces falsos). */
export const resolveRefs = (kind: EntityKind, ids: readonly string[] | undefined): EntityRef[] =>
  (ids ?? [])
    .map((id) => {
      const name = nameOf(kind, id);
      return name ? { kind, id, name, path: entityPath(kind, id) } : null;
    })
    .filter((x): x is EntityRef => x !== null);

const relationsOf = (
  raw: Partial<Record<EntityKind, readonly string[] | undefined>>,
): Partial<Record<EntityKind, EntityRef[]>> => {
  const out: Partial<Record<EntityKind, EntityRef[]>> = {};
  for (const [kind, ids] of Object.entries(raw) as [EntityKind, readonly string[] | undefined][]) {
    const resolved = resolveRefs(kind, ids);
    if (resolved.length) out[kind] = resolved;
  }
  return out;
};

/** Estudios que mencionan la entidad indicada. */
export const studiesFor = (kind: EntityKind, id: string): string[] =>
  studies
    .filter((s) => {
      switch (kind) {
        case "personaje":
          return s.people.includes(id);
        case "lugar":
          return s.places.includes(id);
        case "acontecimiento":
          return (s.events ?? []).includes(id);
        case "termino":
          return (s.terms ?? []).includes(id);
        case "costumbre":
          return (s.customs ?? []).includes(id);
        case "ley":
          return (s.laws ?? []).includes(id);
        case "tema":
          return s.topic === id;
        default:
          return false;
      }
    })
    .map((s) => s.slug);

/** Devuelve una entidad normalizada del cerebro de conocimiento. */
export function getEntity(kind: string, id: string): KnowledgeEntity | undefined {
  const withStudies = (
    base: Omit<KnowledgeEntity, "relations">,
    raw: Partial<Record<EntityKind, readonly string[] | undefined>>,
  ): KnowledgeEntity => ({
    ...base,
    relations: relationsOf({ ...raw, estudio: studiesFor(base.kind, base.id) }),
  });

  if (kind === "personaje") {
    const p = people.find((x) => x.id === id);
    if (!p) return undefined;
    return withStudies(
      {
        kind: "personaje",
        id,
        name: p.name,
        subtitle: p.role,
        summary: p.summary,
        aliases: p.aliases,
        refs: [...p.refs, ...(p.keyTexts ?? [])],
        layers: { biblical: p.summary },
        sources: p.sources ?? ["biblia-rv"],
      },
      { personaje: p.people, lugar: p.places, acontecimiento: p.events, tema: p.topics, termino: p.terms, costumbre: p.customs },
    );
  }

  if (kind === "lugar") {
    const p = places.find((x) => x.id === id);
    if (!p) return undefined;
    return withStudies(
      {
        kind: "lugar",
        id,
        name: p.name,
        subtitle: p.region,
        summary: p.summary,
        aliases: p.aliases,
        refs: p.refs,
        layers: { biblical: p.summary, historical: p.historicalContext },
        sources: p.sources ?? ["biblia-rv"],
      },
      { personaje: p.people, lugar: p.places, acontecimiento: p.events, tema: p.topics, termino: p.terms, costumbre: p.customs },
    );
  }

  if (kind === "acontecimiento") {
    const e = events.find((x) => x.id === id);
    if (!e) return undefined;
    return withStudies(
      {
        kind: "acontecimiento",
        id,
        name: e.name,
        subtitle: e.period,
        summary: e.summary,
        aliases: e.aliases,
        refs: e.refs,
        layers: { biblical: e.summary, historical: e.historicalContext },
        sources: e.sources ?? ["biblia-rv"],
      },
      { personaje: e.people, lugar: e.places, tema: e.topics, termino: e.terms, costumbre: e.customs },
    );
  }

  if (kind === "tema") {
    const t = topics.find((x) => x.id === id);
    if (!t) return undefined;
    return withStudies(
      {
        kind: "tema",
        id,
        name: t.name,
        subtitle: t.kind,
        summary: t.summary,
        aliases: t.aliases,
        refs: t.refs,
        layers: { biblical: t.summary },
        sources: t.sources ?? ["biblia-rv"],
      },
      { personaje: t.people, lugar: t.places, acontecimiento: t.events, termino: t.terms },
    );
  }

  if (kind === "termino") {
    const t = terms.find((x) => x.id === id);
    if (!t) return undefined;
    return withStudies(
      {
        kind: "termino",
        id,
        name: t.name,
        subtitle: t.category,
        summary: t.biblical,
        aliases: t.aliases,
        refs: t.refs,
        layers: { biblical: t.biblical, historical: t.background, interpretations: t.interpretations },
        sources: t.sources ?? ["biblia-rv"],
      },
      { personaje: t.people, lugar: t.places, acontecimiento: t.events, tema: t.topics, termino: t.terms },
    );
  }

  if (kind === "costumbre") {
    const c = customs.find((x) => x.id === id);
    if (!c) return undefined;
    return withStudies(
      {
        kind: "costumbre",
        id,
        name: c.name,
        subtitle: c.summary,
        summary: c.summary,
        aliases: c.aliases,
        refs: c.refs,
        layers: {
          biblical: c.biblical,
          historical: c.historical,
          interpretations: c.interpretation ? [c.interpretation] : undefined,
        },
        sources: c.sources ?? ["biblia-rv"],
      },
      { personaje: c.people, lugar: c.places, acontecimiento: c.events, termino: c.terms },
    );
  }

  if (kind === "ley") {
    const l = laws.find((x) => x.id === id);
    if (!l) return undefined;
    return withStudies(
      {
        kind: "ley",
        id,
        name: l.name,
        subtitle: l.summary,
        summary: l.summary,
        aliases: l.aliases,
        refs: l.refs,
        layers: {
          biblical: l.fulfillment ? `${l.biblical}\n\nCumplimiento señalado en el texto: ${l.fulfillment}` : l.biblical,
          interpretations: l.interpretation ? [l.interpretation] : undefined,
        },
        sources: l.sources ?? ["biblia-rv"],
      },
      { personaje: l.people, tema: l.topics, termino: l.terms, costumbre: l.customs },
    );
  }

  return undefined;
}

/** ¿El texto de esta referencia está disponible en BEREA? Evita enlaces falsos. */
export function refAvailable(ref: string): boolean {
  const parsed = parseRef(ref);
  if (!parsed.bookId || !parsed.chapter) return false;
  return Boolean(getChapter(parsed.bookId, parsed.chapter));
}

export function verseText(ref: string): string | undefined {
  const parsed = parseRef(ref);
  if (!parsed.bookId || !parsed.chapter) return undefined;
  const chapter = getChapter(parsed.bookId, parsed.chapter);
  if (!chapter) return undefined;
  if (parsed.verse === undefined) return chapter.verses[0]?.text;
  return chapter.verses.find((v) => v.number === parsed.verse)?.text;
}

export interface CrossRefResult {
  ref: string;
  reason: string;
  available: { ref: string; path: string }[];
  unavailable: string[];
  sources: string[];
}

/** Referencias cruzadas de un pasaje, separando las que se pueden abrir. */
export function crossRefsForRef(ref: string): CrossRefResult | undefined {
  const norm = ref.trim().toLowerCase();
  const entry = crossReferences.find((c) => c.ref.toLowerCase() === norm);
  if (!entry) return undefined;
  const available: { ref: string; path: string }[] = [];
  const unavailable: string[] = [];
  for (const r of entry.related) {
    const parsed = parseRef(r);
    if (parsed.path && refAvailable(r)) available.push({ ref: r, path: parsed.path });
    else unavailable.push(r);
  }
  return { ref: entry.ref, reason: entry.reason, available, unavailable, sources: entry.sources ?? ["biblia-rv"] };
}

/** Referencias cruzadas disponibles para un capítulo completo (lector bíblico). */
export function crossRefsForChapter(bookId: string, chapter: number): CrossRefResult[] {
  return crossReferences
    .filter((c) => {
      const parsed = parseRef(c.ref);
      return parsed.bookId === bookId && parsed.chapter === chapter;
    })
    .map((c) => crossRefsForRef(c.ref))
    .filter((c): c is CrossRefResult => Boolean(c));
}

export function sourceLabels(ids: readonly string[]): { id: string; name: string; kind: string; note?: string }[] {
  return ids
    .map((id) => getSource(id))
    .filter((s): s is NonNullable<ReturnType<typeof getSource>> => Boolean(s))
    .map((s) => ({ id: s.id, name: s.name, kind: sourceKindLabel[s.kind], ...(s.note ? { note: s.note } : {}) }));
}
