import { books } from "@/data/bible/books";
import { chapters } from "@/data/bible/verses";
import { people } from "@/data/people";
import { places } from "@/data/places";
import { events } from "@/data/events";
import { topics } from "@/data/themes";
import { studies } from "@/data/studies";
import { fuzzyScore, snippet } from "./text";

export type ResultType = "versiculo" | "libro" | "personaje" | "lugar" | "acontecimiento" | "tema" | "estudio";

export interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle?: string | undefined;
  body: string;
  path: string;
  score: number;
}

interface IndexEntry extends Omit<SearchResult, "score"> {
  haystacks: string[];
}

const bookName = (id: string) => books.find((b) => b.id === id)?.name ?? id;

let cache: IndexEntry[] | null = null;

/** Índice unificado. Cuando exista base de datos, esta función es el único punto a cambiar. */
export function buildIndex(): IndexEntry[] {
  if (cache) return cache;
  const entries: IndexEntry[] = [];

  for (const b of books) {
    entries.push({
      id: `libro:${b.id}`,
      type: "libro",
      title: b.name,
      subtitle: `${b.testament === "AT" ? "Antiguo" : "Nuevo"} Testamento · ${b.group}`,
      body: `${b.chapters} capítulos`,
      path: `/biblia/${b.id}`,
      haystacks: [b.name, b.abbr, b.group],
    });
  }

  for (const c of chapters) {
    for (const v of c.verses) {
      entries.push({
        id: `verso:${c.bookId}:${c.chapter}:${v.number}`,
        type: "versiculo",
        title: `${bookName(c.bookId)} ${c.chapter}:${v.number}`,
        body: v.text,
        path: `/biblia/${c.bookId}/${c.chapter}`,
        haystacks: [v.text, `${bookName(c.bookId)} ${c.chapter}:${v.number}`],
      });
    }
  }

  for (const p of people) {
    entries.push({
      id: `personaje:${p.id}`,
      type: "personaje",
      title: p.name,
      subtitle: p.role,
      body: p.summary,
      path: `/tema/personaje/${p.id}`,
      haystacks: [p.name, ...p.aliases, p.role, p.summary],
    });
  }

  for (const p of places) {
    entries.push({
      id: `lugar:${p.id}`,
      type: "lugar",
      title: p.name,
      subtitle: p.region,
      body: p.summary,
      path: `/tema/lugar/${p.id}`,
      haystacks: [p.name, ...p.aliases, p.region, p.summary],
    });
  }

  for (const e of events) {
    entries.push({
      id: `acontecimiento:${e.id}`,
      type: "acontecimiento",
      title: e.name,
      subtitle: e.period,
      body: e.summary,
      path: `/tema/acontecimiento/${e.id}`,
      haystacks: [e.name, ...e.aliases, e.period, e.summary],
    });
  }

  for (const t of topics) {
    entries.push({
      id: `tema:${t.id}`,
      type: "tema",
      title: t.name,
      subtitle: t.kind,
      body: t.summary,
      path: `/tema/tema/${t.id}`,
      haystacks: [t.name, ...t.aliases, t.kind, t.summary, ...t.refs],
    });
  }

  for (const s of studies) {
    entries.push({
      id: `estudio:${s.slug}`,
      type: "estudio",
      title: s.title,
      subtitle: `Estudio · ${s.minutes} min`,
      body: s.introduction,
      path: `/estudios/${s.slug}`,
      haystacks: [
        s.title,
        s.introduction,
        s.conclusion,
        ...s.keyVerses,
        ...s.sections.map((x) => `${x.heading} ${x.body}`),
      ],
    });
  }

  cache = entries;
  return entries;
}

const weights: Record<ResultType, number> = {
  tema: 1.1,
  estudio: 1.08,
  personaje: 1.06,
  lugar: 1.04,
  acontecimiento: 1.04,
  versiculo: 1,
  libro: 0.95,
};

export function search(query: string, type?: ResultType | "todo"): SearchResult[] {
  const q = query.trim();
  if (q.length < 2) return [];
  const results: SearchResult[] = [];

  for (const entry of buildIndex()) {
    if (type && type !== "todo" && entry.type !== type) continue;
    let best = 0;
    for (const hay of entry.haystacks) best = Math.max(best, fuzzyScore(q, hay));
    if (best < 38) continue;
    results.push({
      id: entry.id,
      type: entry.type,
      title: entry.title,
      subtitle: entry.subtitle,
      body: snippet(entry.body, q),
      path: entry.path,
      score: Math.round(best * weights[entry.type]),
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 60);
}

export const resultTypeLabel: Record<ResultType, string> = {
  versiculo: "Versículo",
  libro: "Libro",
  personaje: "Personaje",
  lugar: "Lugar",
  acontecimiento: "Acontecimiento",
  tema: "Tema",
  estudio: "Estudio",
};

export const suggestedQueries = [
  "fe",
  "perdón",
  "pacto",
  "salvación",
  "las diez vírgenes",
  "Jericó",
  "Eva",
  "Leviatán",
  "Judá",
];
