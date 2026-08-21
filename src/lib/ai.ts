/**
 * Capa de IA bíblica de BEREA.
 *
 * Principio: la IA nunca responde "de memoria". Primero se recupera el
 * conocimiento estructurado de src/data (pasajes, referencias cruzadas,
 * personas, lugares, términos, costumbres, leyes y estudios) y solo ese
 * contexto se enviaría a un modelo.
 *
 * Hoy no hay ninguna clave ni llamada externa: `askBibleQuestion` construye el
 * contexto real y devuelve una respuesta controlada basada únicamente en lo
 * recuperado. Si la evidencia es insuficiente, lo declara en lugar de inventar.
 */
import { search, type ResultType } from "./search";
import { crossRefsForRef, getEntity, sourceLabels, verseText, type EntityKind } from "./knowledge";
import { parseRef } from "./refs";
import { tokens } from "./text";

export interface BibleAiQuestion {
  question: string;
  context?: { bookId?: string; chapter?: number; studySlug?: string };
}

export interface RetrievedPassage {
  ref: string;
  text: string;
  path: string;
}

export interface RetrievedEntity {
  kind: EntityKind;
  id: string;
  name: string;
  summary: string;
  path: string;
}

/** Contexto estructurado que se enviaría al modelo. Es auditable y trazable. */
export interface BibleAiContext {
  question: string;
  keywords: string[];
  passages: RetrievedPassage[];
  crossReferences: { ref: string; related: string[]; reason: string }[];
  entities: RetrievedEntity[];
  studies: { slug: string; title: string; path: string }[];
  sources: { id: string; name: string; kind: string; note?: string }[];
}

export interface BibleAiAnswer {
  answer: string;
  /** Referencias bíblicas efectivamente usadas (existen en los datos de BEREA). */
  refs: string[];
  /** Naturaleza de la respuesta: texto, contexto o interpretación. */
  nature: "texto-biblico" | "contexto" | "interpretacion" | "insuficiente";
  context: BibleAiContext;
  sources: { id: string; name: string; kind: string; note?: string }[];
  disclaimer: string;
  /** Pasos sugeridos al usuario según el principio de Berea. */
  nextSteps: string[];
}

export const AI_SCOPE_RULES = [
  "Responder únicamente sobre contenido bíblico y su estudio.",
  "Usar primero el conocimiento estructurado de BEREA antes que cualquier otra fuente.",
  "Citar siempre las referencias bíblicas utilizadas y su fuente.",
  "Distinguir el texto bíblico del contexto histórico y de la interpretación.",
  "No presentar una interpretación humana como decreto divino.",
  "Si la información disponible es insuficiente, decirlo y sugerir qué revisar.",
];

/** Método de estudio que BEREA promueve y que la IA debe acompañar, no sustituir. */
export const BEREA_METHOD = [
  "Leer el texto completo del pasaje.",
  "Observar el contexto inmediato del capítulo y del libro.",
  "Comparar otros pasajes relacionados.",
  "Considerar la información histórica y cultural, identificada como tal.",
  "Revisar las interpretaciones existentes cuando el texto admite más de una lectura.",
  "Formar una conclusión razonada a partir de la evidencia.",
];

export const aiEnabled = false;

const typeToKind: Partial<Record<ResultType, EntityKind>> = {
  personaje: "personaje",
  lugar: "lugar",
  acontecimiento: "acontecimiento",
  tema: "tema",
  termino: "termino",
  costumbre: "costumbre",
  ley: "ley",
};

/** 1-8: recupera del conocimiento de BEREA todo lo relacionado con la pregunta. */
export function buildBibleAiContext(input: BibleAiQuestion): BibleAiContext {
  const question = input.question.trim();
  const keywords = tokens(question);
  const results = search(question, "todo");

  const passages: RetrievedPassage[] = [];
  const entities: RetrievedEntity[] = [];
  const studies: { slug: string; title: string; path: string }[] = [];
  const crossReferences: BibleAiContext["crossReferences"] = [];
  const sourceIds = new Set<string>();

  const directRef = parseRef(question);
  if (directRef.path && directRef.bookName && directRef.chapter) {
    const ref = `${directRef.bookName} ${directRef.chapter}${directRef.verse ? `:${directRef.verse}` : ""}`;
    const text = verseText(ref);
    if (text) {
      passages.push({ ref, text, path: directRef.path });
      sourceIds.add("biblia-rv");
    }
  }

  for (const r of results.slice(0, 24)) {
    if (r.type === "versiculo") {
      const text = verseText(r.title);
      if (text && !passages.some((p) => p.ref === r.title)) {
        passages.push({ ref: r.title, text, path: r.path });
        sourceIds.add("biblia-rv");
      }
      continue;
    }
    if (r.type === "estudio") {
      const slug = r.id.replace("estudio:", "");
      studies.push({ slug, title: r.title, path: r.path });
      sourceIds.add("estudio-berea");
      continue;
    }
    const kind = typeToKind[r.type];
    if (!kind) continue;
    const id = r.id.split(":")[1] ?? "";
    const entity = getEntity(kind, id);
    if (!entity) continue;
    entities.push({ kind, id, name: entity.name, summary: entity.summary, path: r.path });
    for (const s of entity.sources) sourceIds.add(s);
  }

  for (const p of passages) {
    const cross = crossRefsForRef(p.ref);
    if (!cross) continue;
    crossReferences.push({
      ref: cross.ref,
      related: [...cross.available.map((a) => a.ref), ...cross.unavailable],
      reason: cross.reason,
    });
    for (const s of cross.sources) sourceIds.add(s);
  }

  return {
    question,
    keywords,
    passages: passages.slice(0, 12),
    crossReferences,
    entities: entities.slice(0, 12),
    studies: studies.slice(0, 6),
    sources: sourceLabels([...sourceIds]),
  };
}

/**
 * 9-10: aquí se enviaría el contexto a un modelo de IA (Lovable AI Gateway) y se
 * devolvería la respuesta con sus fuentes. Sin API configurada, BEREA responde
 * con el material recuperado, sin generar afirmaciones nuevas.
 */
export async function askBibleQuestion(input: BibleAiQuestion): Promise<BibleAiAnswer> {
  const context = buildBibleAiContext(input);
  const hasEvidence = context.passages.length > 0 || context.entities.length > 0;

  if (!hasEvidence) {
    return {
      answer:
        "La información disponible en BEREA no alcanza para responder esta pregunta. No se generará una respuesta sin respaldo en los datos.",
      refs: [],
      nature: "insuficiente",
      context,
      sources: context.sources,
      disclaimer:
        "BEREA no inventa contenido bíblico: cuando no hay evidencia en sus datos, lo indica.",
      nextSteps: [
        "Reformula la pregunta con un nombre, lugar o término bíblico concreto.",
        "Busca el pasaje directamente, por ejemplo «Juan 3:16».",
        "Revisa en tu Biblia el libro y capítulo relacionado con el tema.",
      ],
    };
  }

  const lines: string[] = [];
  if (context.passages.length) {
    lines.push("Textos bíblicos encontrados en BEREA:");
    for (const p of context.passages.slice(0, 4)) lines.push(`• ${p.ref} — «${p.text}»`);
  }
  if (context.entities.length) {
    lines.push("");
    lines.push("Información relacionada en el cerebro de conocimiento:");
    for (const e of context.entities.slice(0, 4)) lines.push(`• ${e.name}: ${e.summary}`);
  }
  if (context.crossReferences.length) {
    lines.push("");
    lines.push("Referencias cruzadas para comparar:");
    for (const c of context.crossReferences.slice(0, 3))
      lines.push(`• ${c.ref} → ${c.related.join(", ")} (${c.reason})`);
  }

  return {
    answer: lines.join("\n"),
    refs: context.passages.map((p) => p.ref),
    nature: context.passages.length ? "texto-biblico" : "contexto",
    context,
    sources: context.sources,
    disclaimer:
      "Respuesta construida solo con el conocimiento estructurado de BEREA. Aún no hay modelo de IA conectado; cuando se conecte, recibirá exactamente este contexto y deberá citar sus fuentes.",
    nextSteps: BEREA_METHOD,
  };
}
