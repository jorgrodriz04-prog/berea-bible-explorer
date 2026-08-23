import { books } from "@/data/bible/books";
import { loadBookText } from "@/data/bible/text";
import { normalize, snippet, tokens } from "./text";
import type { SearchResult } from "./search";

/**
 * Búsqueda de versículos sobre la Biblia completa.
 * El texto se carga de forma diferida (un módulo por libro) para no penalizar
 * el arranque de la aplicación en móvil.
 */
export async function searchVerses(query: string, limit = 60): Promise<SearchResult[]> {
  const q = normalize(query);
  if (q.length < 2) return [];
  const qTokens = tokens(q);
  const results: SearchResult[] = [];

  for (const book of books) {
    const data = await loadBookText(book.id);
    if (!data) continue;
    for (let ci = 0; ci < data.chapters.length; ci++) {
      const verses = data.chapters[ci] ?? [];
      for (let vi = 0; vi < verses.length; vi++) {
        const text = verses[vi] ?? "";
        const hay = normalize(text);
        let score = 0;
        if (hay.includes(q)) score = 80;
        else if (qTokens.length > 1 && qTokens.every((t) => hay.includes(t))) score = 62;
        if (!score) continue;
        results.push({
          id: `verso:${book.id}:${ci + 1}:${vi + 1}`,
          type: "versiculo",
          title: `${book.name} ${ci + 1}:${vi + 1}`,
          subtitle: book.group,
          body: snippet(text, query),
          path: `/biblia/${book.id}/${ci + 1}`,
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
