import type { ChapterContent } from "../types";
import { getBook } from "./books";

type BookText = { bookId: string; chapters: string[][] };

/** Texto bíblico completo Reina-Valera 1909 (RVR1909, dominio público), un archivo por libro. NO es RVR1960. */
const modules = import.meta.glob<{ default: BookText }>("./text/*.json");

const pathFor = (bookId: string) => `./text/${bookId}.json`;

const cache = new Map<string, BookText>();

export async function loadBookText(bookId: string): Promise<BookText | null> {
  const cached = cache.get(bookId);
  if (cached) return cached;
  const loader = modules[pathFor(bookId)];
  if (!loader) return null;
  const mod = await loader();
  const data = mod.default;
  cache.set(bookId, data);
  return data;
}

/** Devuelve el capítulo con sus versículos numerados. */
export async function loadChapter(bookId: string, chapter: number): Promise<ChapterContent | null> {
  const book = await loadBookText(bookId);
  const verses = book?.chapters[chapter - 1];
  if (!verses) return null;
  return {
    bookId,
    chapter,
    verses: verses.map((text, i) => ({ number: i + 1, text })),
  };
}

/** Estructuralmente todos los capítulos de un libro tienen texto. */
export const hasChapterText = (bookId: string, chapter: number) => {
  const book = getBook(bookId);
  return Boolean(book && chapter >= 1 && chapter <= book.chapters);
};
