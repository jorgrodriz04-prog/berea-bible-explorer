import type { ChapterContent } from "@/data/types";

/**
 * Puente hacia un proveedor de texto bíblico CON LICENCIA (por ejemplo, un API
 * autorizado para distribuir Reina-Valera 1960).
 *
 * BEREA no incluye ese texto en el repositorio. Este módulo solo lo solicita a
 * la fuente configurada por el propietario del proyecto:
 *
 *   BEREA_BIBLE_API_URL      plantilla con {version} {book} {chapter}
 *                            ej: https://api.proveedor.com/{version}/{book}/{chapter}
 *   BEREA_BIBLE_API_KEY      clave del proveedor (opcional según el contrato)
 *   BEREA_BIBLE_VERSION_CODE código de la versión en el proveedor (ej: RVR1960)
 *
 * Sin esas variables, no hay fuente autorizada y la función lo informa; nunca
 * se devuelve otro texto en su lugar.
 */

export type LicensedChapterResult =
  | { status: "sin-proveedor" }
  | { status: "no-disponible"; detail: string }
  | { status: "ok"; content: ChapterContent; attribution: string };

interface ProviderConfig {
  url: string;
  key?: string;
  versionCode: string;
  attribution: string;
}

export function readProviderConfig(): ProviderConfig | null {
  const url = process.env["BEREA_BIBLE_API_URL"];
  if (!url) return null;
  return {
    url,
    ...(process.env["BEREA_BIBLE_API_KEY"] ? { key: process.env["BEREA_BIBLE_API_KEY"] } : {}),
    versionCode: process.env["BEREA_BIBLE_VERSION_CODE"] ?? "RVR1960",
    attribution: process.env["BEREA_BIBLE_ATTRIBUTION"] ?? "Texto provisto bajo licencia del proveedor configurado.",
  };
}

/** Forma mínima esperada del proveedor: { verses: [{ number, text }] }. */
interface ProviderPayload {
  verses?: Array<{ number?: number; verse?: number; text?: string }>;
}

export async function fetchLicensedChapterFromProvider(
  bookId: string,
  chapter: number,
): Promise<LicensedChapterResult> {
  const config = readProviderConfig();
  if (!config) return { status: "sin-proveedor" };

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
    const payload = (await response.json()) as ProviderPayload;
    const verses = (payload.verses ?? [])
      .map((v, i) => ({ number: v.number ?? v.verse ?? i + 1, text: (v.text ?? "").trim() }))
      .filter((v) => v.text.length > 0);
    if (verses.length === 0) {
      return { status: "no-disponible", detail: "El proveedor no devolvió versículos para este capítulo." };
    }
    return {
      status: "ok",
      content: { bookId, chapter, verses },
      attribution: config.attribution,
    };
  } catch {
    return { status: "no-disponible", detail: "No se pudo contactar al proveedor con licencia." };
  }
}
