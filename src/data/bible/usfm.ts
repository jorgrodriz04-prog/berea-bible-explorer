import { books } from "./books";

/**
 * Códigos USFM de los 66 libros, en orden canónico.
 * Los usan los proveedores con licencia (por ejemplo API.Bible) para
 * identificar libros y capítulos: GEN.1, JHN.3.16, etc.
 */
export const USFM_CODES = [
  "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
  "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
  "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
  "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
  "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
  "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
  "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
] as const;

const byBookId = new Map<string, string>(
  books.map((book, index) => [book.id, USFM_CODES[index] ?? ""]),
);

/** Código USFM del libro, o null si el identificador no corresponde a un libro. */
export function usfmForBook(bookId: string): string | null {
  return byBookId.get(bookId) || null;
}

const byUsfm = new Map<string, string>(
  books.map((book, index) => [USFM_CODES[index] ?? "", book.id]),
);

/** Identificador interno del libro a partir de su código USFM. */
export function bookIdFromUsfm(code: string): string | null {
  return byUsfm.get(code.toUpperCase()) || null;
}
