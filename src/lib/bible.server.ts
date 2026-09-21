import type { ChapterContent } from "@/data/types";
import { usfmForBook, bookIdFromUsfm } from "@/data/bible/usfm";

/**
 * Adaptador de texto bíblico CON LICENCIA para Reina-Valera 1960.
 *
 * BEREA no incluye el texto de RVR1960 en el repositorio: lo solicita a la
 * fuente autorizada configurada por el propietario del proyecto. Proveedor
 * preferente: API.Bible (api.scripture.api.bible).
 *
 * Secretos (solo servidor, nunca expuestos al cliente):
 *   API_BIBLE_KEY       clave de API.Bible
 *   API_BIBLE_BIBLE_ID  identificador de la Biblia RVR1960 licenciada
 *   API_BIBLE_ATTRIBUTION (opcional) texto de atribución exigido por la licencia
 *
 * Alternativa genérica (otro proveedor con licencia):
 *   BEREA_BIBLE_API_URL plantilla con {version} {book} {chapter}
 *   BEREA_BIBLE_API_KEY clave del proveedor
 *   BEREA_BIBLE_VERSION_CODE código de la versión en el proveedor
 *
 * Sin configuración no hay fuente autorizada: se informa y nunca se devuelve
 * el texto de otra versión en su lugar.
 */

const API_BIBLE_BASE = "https://api.scripture.api.bible/v1";

export type ProviderKind = "api-bible" | "generico";

export interface ProviderStatus {
  configured: boolean;
  kind: ProviderKind | null;
  /** Nombres de variables que faltan para completar la configuración. */
  missing: string[];
  attribution: string;
}

interface ApiBibleConfig {
  kind: "api-bible";
  key: string;
  bibleId: string;
  attribution: string;
}

interface GenericConfig {
  kind: "generico";
  url: string;
  key?: string;
  versionCode: string;
  attribution: string;
}

type ProviderConfig = ApiBibleConfig | GenericConfig;

const env = (name: string) => {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
};

export function readProviderConfig(): ProviderConfig | null {
  const key = env("API_BIBLE_KEY");
  const bibleId = env("API_BIBLE_BIBLE_ID");
  if (key && bibleId) {
    return {
      kind: "api-bible",
      key,
      bibleId,
      attribution:
        env("API_BIBLE_ATTRIBUTION") ??
        "Reina-Valera 1960 © Sociedades Bíblicas Unidas, servida bajo licencia mediante API.Bible.",
    };
  }

  const url = env("BEREA_BIBLE_API_URL");
  if (url) {
    return {
      kind: "generico",
      url,
      ...(env("BEREA_BIBLE_API_KEY") ? { key: env("BEREA_BIBLE_API_KEY")! } : {}),
      versionCode: env("BEREA_BIBLE_VERSION_CODE") ?? "RVR1960",
      attribution:
        env("BEREA_BIBLE_ATTRIBUTION") ??
        "Texto provisto bajo licencia del proveedor autorizado configurado.",
    };
  }
  return null;
}

export function readProviderStatus(): ProviderStatus {
  const config = readProviderConfig();
  if (!config) {
    return {
      configured: false,
      kind: null,
      missing: ["API_BIBLE_KEY", "API_BIBLE_BIBLE_ID"],
      attribution: "",
    };
  }
  return { configured: true, kind: config.kind, missing: [], attribution: config.attribution };
}

export type LicensedChapterResult =
  | { status: "sin-proveedor" }
  | { status: "no-disponible"; detail: string }
  | { status: "ok"; content: ChapterContent; attribution: string };

export type LicensedVersesResult =
  | { status: "sin-proveedor" }
  | { status: "no-disponible"; detail: string }
  | { status: "ok"; verses: { ref: string; text: string }[]; attribution: string };

export type LicensedSearchResult =
  | { status: "sin-proveedor" }
  | { status: "no-disponible"; detail: string }
  | {
      status: "ok";
      results: { bookId: string; chapter: number; verse: number; reference: string; text: string }[];
      attribution: string;
    };

const apiBibleHeaders = (config: ApiBibleConfig) => ({ "api-key": config.key });

const cleanText = (value: string) =>
  value.replace(/\s+/g, " ").replace(/\u00b6/g, "").trim();

/** API.Bible devuelve el capítulo como texto con los números entre corchetes. */
function parseNumberedText(content: string): { number: number; text: string }[] {
  const verses: { number: number; text: string }[] = [];
  const regex = /\[(\d+)\]\s*/g;
  const matches = [...content.matchAll(regex)];
  if (matches.length === 0) return verses;
  matches.forEach((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1]!.index ?? content.length : content.length;
    const text = cleanText(content.slice(start, end));
    const number = Number(match[1]);
    if (text && Number.isFinite(number)) verses.push({ number, text });
  });
  return verses;
}

async function apiBibleGet(config: ApiBibleConfig, path: string): Promise<{ ok: true; data: unknown } | { ok: false; detail: string }> {
  try {
    const response = await fetch(`${API_BIBLE_BASE}${path}`, { headers: apiBibleHeaders(config) });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return { ok: false, detail: "La clave de API.Bible no es válida o no autoriza esta Biblia." };
      }
      return { ok: false, detail: `El proveedor con licencia respondió ${response.status}.` };
    }
    const payload = (await response.json()) as { data?: unknown };
    return { ok: true, data: payload.data };
  } catch {
    return { ok: false, detail: "No se pudo contactar al proveedor con licencia." };
  }
}

export async function fetchLicensedChapterFromProvider(
  bookId: string,
  chapter: number,
): Promise<LicensedChapterResult> {
  const config = readProviderConfig();
  if (!config) return { status: "sin-proveedor" };

  if (config.kind === "api-bible") {
    const usfm = usfmForBook(bookId);
    if (!usfm) return { status: "no-disponible", detail: "Libro no reconocido." };
    const query =
      "?content-type=text&include-verse-numbers=true&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-spans=false";
    const res = await apiBibleGet(config, `/bibles/${config.bibleId}/chapters/${usfm}.${chapter}${query}`);
    if (!res.ok) return { status: "no-disponible", detail: res.detail };
    const data = res.data as { content?: string } | undefined;
    const verses = parseNumberedText(data?.content ?? "");
    if (verses.length === 0) {
      return { status: "no-disponible", detail: "El proveedor no devolvió versículos para este capítulo." };
    }
    return { status: "ok", content: { bookId, chapter, verses }, attribution: config.attribution };
  }

  const endpoint = config.url
    .replace("{version}", encodeURIComponent(config.versionCode))
    .replace("{book}", encodeURIComponent(bookId))
    .replace("{chapter}", String(chapter));
  try {
    const response = await fetch(endpoint, {
      headers: config.key ? { authorization: `Bearer ${config.key}`, "api-key": config.key } : {},
    });
    if (!response.ok) {
      return { status: "no-disponible", detail: `El proveedor respondió ${response.status}.` };
    }
    const payload = (await response.json()) as {
      verses?: Array<{ number?: number; verse?: number; text?: string }>;
    };
    const verses = (payload.verses ?? [])
      .map((v, i) => ({ number: v.number ?? v.verse ?? i + 1, text: cleanText(v.text ?? "") }))
      .filter((v) => v.text.length > 0);
    if (verses.length === 0) {
      return { status: "no-disponible", detail: "El proveedor no devolvió versículos para este capítulo." };
    }
    return { status: "ok", content: { bookId, chapter, verses }, attribution: config.attribution };
  } catch {
    return { status: "no-disponible", detail: "No se pudo contactar al proveedor con licencia." };
  }
}

/** Texto de referencias concretas (Inicio, fichas, referencias cruzadas, contexto de IA). */
export async function fetchLicensedVersesFromProvider(
  refs: { ref: string; bookId: string; chapter: number; verse?: number | undefined }[],
): Promise<LicensedVersesResult> {
  const config = readProviderConfig();
  if (!config) return { status: "sin-proveedor" };

  const out: { ref: string; text: string }[] = [];
  let lastDetail = "";
  const chapters = new Map<string, ChapterContent>();

  for (const item of refs.slice(0, 24)) {
    const cacheKey = `${item.bookId}:${item.chapter}`;
    let content = chapters.get(cacheKey);
    if (!content) {
      const result = await fetchLicensedChapterFromProvider(item.bookId, item.chapter);
      if (result.status === "sin-proveedor") return { status: "sin-proveedor" };
      if (result.status === "no-disponible") {
        lastDetail = result.detail;
        continue;
      }
      content = result.content;
      chapters.set(cacheKey, content);
    }
    const verse =
      item.verse === undefined
        ? content.verses[0]
        : content.verses.find((v) => v.number === item.verse);
    if (verse) out.push({ ref: item.ref, text: verse.text });
  }

  if (out.length === 0 && lastDetail) return { status: "no-disponible", detail: lastDetail };
  return { status: "ok", verses: out, attribution: config.attribution };
}

/** Búsqueda de palabras y frases en el texto licenciado. */
export async function searchLicensedVersesFromProvider(
  query: string,
  limit = 60,
): Promise<LicensedSearchResult> {
  const config = readProviderConfig();
  if (!config) return { status: "sin-proveedor" };
  if (config.kind !== "api-bible") {
    return {
      status: "no-disponible",
      detail: "El proveedor configurado no ofrece búsqueda de versículos.",
    };
  }

  const res = await apiBibleGet(
    config,
    `/bibles/${config.bibleId}/search?query=${encodeURIComponent(query)}&limit=${limit}&sort=relevance`,
  );
  if (!res.ok) return { status: "no-disponible", detail: res.detail };

  const data = res.data as
    | { verses?: Array<{ id?: string; reference?: string; text?: string }> }
    | undefined;
  const results = (data?.verses ?? [])
    .map((v) => {
      const parts = (v.id ?? "").split(".");
      const bookId = bookIdFromUsfm(parts[0] ?? "");
      const chapter = Number(parts[1]);
      const verse = Number(parts[2]);
      if (!bookId || !Number.isFinite(chapter) || !Number.isFinite(verse)) return null;
      const text = cleanText(v.text ?? "");
      if (!text) return null;
      return { bookId, chapter, verse, reference: v.reference ?? "", text };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  return { status: "ok", results, attribution: config.attribution };
}
