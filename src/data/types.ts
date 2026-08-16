export type Testament = "AT" | "NT";

export interface BibleBook {
  id: string;
  name: string;
  abbr: string;
  testament: Testament;
  chapters: number;
  group: string;
}

export interface Verse {
  number: number;
  text: string;
}

export interface ChapterContent {
  bookId: string;
  chapter: number;
  verses: Verse[];
}

export interface Person {
  id: string;
  name: string;
  aliases: string[];
  role: string;
  summary: string;
  refs: string[];
  places?: string[];
  /** Textos principales donde aparece el personaje. */
  keyTexts?: string[];
  people?: string[];
  events?: string[];
  topics?: string[];
  terms?: string[];
  customs?: string[];
  sources?: string[];
}

export interface Place {
  id: string;
  name: string;
  aliases: string[];
  region: string;
  summary: string;
  refs: string[];
  people?: string[];
  events?: string[];
  topics?: string[];
  terms?: string[];
  customs?: string[];
  historicalContext?: string;
  sources?: string[];
}

export interface BibleEvent {
  id: string;
  name: string;
  aliases: string[];
  period: string;
  summary: string;
  refs: string[];
  people?: string[];
  places?: string[];
  topics?: string[];
  terms?: string[];
  customs?: string[];
  historicalContext?: string;
  sources?: string[];
}

export interface Topic {
  id: string;
  name: string;
  aliases: string[];
  kind: "tema" | "doctrina" | "concepto";
  summary: string;
  refs: string[];
  studies?: string[];
  people?: string[];
  places?: string[];
  events?: string[];
  terms?: string[];
  sources?: string[];
}

/** Tipo de fuente de una afirmación: distingue Biblia, contexto e interpretación. */
export type SourceKind =
  | "biblia"
  | "contexto-historico"
  | "contexto-cultural"
  | "obra-de-referencia"
  | "comentario"
  | "estudio-berea";

export interface Source {
  id: string;
  name: string;
  kind: SourceKind;
  description: string;
  note?: string;
}

/** Término bíblico: palabra o concepto con significado propio en el texto. */
export interface Term {
  id: string;
  name: string;
  aliases: string[];
  category: "palabra" | "doctrina" | "simbolo" | "institucion";
  /** Definición apoyada directamente en el texto bíblico. */
  biblical: string;
  /** Información histórica o lingüística de trasfondo (no es mandato bíblico). */
  background?: string;
  /** Lecturas o interpretaciones posibles, marcadas como tales. */
  interpretations?: string[];
  refs: string[];
  people?: string[];
  places?: string[];
  events?: string[];
  topics?: string[];
  terms?: string[];
  sources?: string[];
}

/** Costumbre o contexto cultural, con las tres capas siempre separadas. */
export interface Custom {
  id: string;
  name: string;
  aliases: string[];
  area:
    | "fiestas"
    | "culto"
    | "familia"
    | "matrimonio"
    | "duelo"
    | "agricultura"
    | "economia"
    | "medidas"
    | "vestimenta"
    | "instituciones";
  summary: string;
  /** 1. Lo que afirma directamente la Biblia. */
  biblical: string;
  /** 2. Lo que procede del contexto histórico/cultural. */
  historical?: string;
  /** 3. Lo que corresponde a una interpretación. */
  interpretation?: string;
  refs: string[];
  people?: string[];
  places?: string[];
  events?: string[];
  terms?: string[];
  sources?: string[];
}

/** Ley o mandamiento del texto bíblico. */
export interface Law {
  id: string;
  name: string;
  aliases: string[];
  category: "moral" | "ceremonial" | "civil" | "mandamiento-nuevo";
  summary: string;
  /** Texto o resumen literal del mandato. */
  biblical: string;
  /** Uso o cumplimiento en el Nuevo Testamento, cuando el texto lo indica. */
  fulfillment?: string;
  interpretation?: string;
  refs: string[];
  people?: string[];
  topics?: string[];
  terms?: string[];
  customs?: string[];
  sources?: string[];
}

/** Referencia cruzada entre pasajes. */
export interface CrossReference {
  /** Referencia de origen, ej. "Juan 3:16". */
  ref: string;
  /** Pasajes relacionados. */
  related: string[];
  reason: string;
  topics?: string[];
  terms?: string[];
  sources?: string[];
}

export interface StudySection {
  heading: string;
  body: string;
}

export interface Study {
  slug: string;
  title: string;
  topic: string;
  minutes: number;
  introduction: string;
  keyVerses: string[];
  sections: StudySection[];
  historicalContext?: string;
  people: string[];
  places: string[];
  crossRefs: string[];
  conclusion: string;
  events?: string[];
  terms?: string[];
  customs?: string[];
  laws?: string[];
  categories?: string[];
  /** Ids de src/data/sources. Nunca atribuir contenido a fuentes no listadas. */
  sources?: string[];
  /** Lecturas distintas de un mismo pasaje, presentadas como interpretación. */
  interpretations?: { view: string; basis: string }[];
}
