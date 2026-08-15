import { books, slugifyBook } from "@/data/books";

export interface ParsedRef {
  raw: string;
  bookId?: string | undefined;
  bookName?: string | undefined;
  chapter?: number | undefined;
  verse?: number | undefined;
  path?: string | undefined;
}

const bookByName = new Map<string, string>();
for (const b of books) {
  bookByName.set(b.name.toLowerCase(), b.id);
  bookByName.set(b.abbr.toLowerCase(), b.id);
  bookByName.set(slugifyBook(b.name), b.id);
}

/** Convierte "Juan 3:16" o "Hebreos 11:1-6" en una referencia navegable. */
export function parseRef(raw: string): ParsedRef {
  const match = raw.trim().match(/^([1-3]?\s?[^\d:]+)\s*(\d+)?(?::(\d+))?/);
  if (!match) return { raw };
  const name = (match[1] ?? "").trim().toLowerCase();
  const bookId = bookByName.get(name) ?? bookByName.get(slugifyBook(name));
  const chapter = match[2] ? Number(match[2]) : undefined;
  const verse = match[3] ? Number(match[3]) : undefined;
  if (!bookId) return { raw };
  const book = books.find((b) => b.id === bookId);
  return {
    raw,
    bookId,
    bookName: book?.name,
    chapter,
    verse,
    path: chapter ? `/biblia/${bookId}/${chapter}` : `/biblia/${bookId}`,
  };
}
