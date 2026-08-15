import type { BibleBook } from "./types";

type Raw = [name: string, abbr: string, chapters: number, testament: "AT" | "NT", group: string];

const raw: Raw[] = [
  ["Génesis", "Gn", 50, "AT", "Pentateuco"],
  ["Éxodo", "Ex", 40, "AT", "Pentateuco"],
  ["Levítico", "Lv", 27, "AT", "Pentateuco"],
  ["Números", "Nm", 36, "AT", "Pentateuco"],
  ["Deuteronomio", "Dt", 34, "AT", "Pentateuco"],
  ["Josué", "Jos", 24, "AT", "Históricos"],
  ["Jueces", "Jue", 21, "AT", "Históricos"],
  ["Rut", "Rt", 4, "AT", "Históricos"],
  ["1 Samuel", "1S", 31, "AT", "Históricos"],
  ["2 Samuel", "2S", 24, "AT", "Históricos"],
  ["1 Reyes", "1R", 22, "AT", "Históricos"],
  ["2 Reyes", "2R", 25, "AT", "Históricos"],
  ["1 Crónicas", "1Cr", 29, "AT", "Históricos"],
  ["2 Crónicas", "2Cr", 36, "AT", "Históricos"],
  ["Esdras", "Esd", 10, "AT", "Históricos"],
  ["Nehemías", "Neh", 13, "AT", "Históricos"],
  ["Ester", "Est", 10, "AT", "Históricos"],
  ["Job", "Job", 42, "AT", "Poéticos"],
  ["Salmos", "Sal", 150, "AT", "Poéticos"],
  ["Proverbios", "Pr", 31, "AT", "Poéticos"],
  ["Eclesiastés", "Ec", 12, "AT", "Poéticos"],
  ["Cantares", "Cnt", 8, "AT", "Poéticos"],
  ["Isaías", "Is", 66, "AT", "Profetas mayores"],
  ["Jeremías", "Jer", 52, "AT", "Profetas mayores"],
  ["Lamentaciones", "Lm", 5, "AT", "Profetas mayores"],
  ["Ezequiel", "Ez", 48, "AT", "Profetas mayores"],
  ["Daniel", "Dn", 12, "AT", "Profetas mayores"],
  ["Oseas", "Os", 14, "AT", "Profetas menores"],
  ["Joel", "Jl", 3, "AT", "Profetas menores"],
  ["Amós", "Am", 9, "AT", "Profetas menores"],
  ["Obadías", "Ob", 1, "AT", "Profetas menores"],
  ["Jonás", "Jon", 4, "AT", "Profetas menores"],
  ["Miqueas", "Mi", 7, "AT", "Profetas menores"],
  ["Nahúm", "Nah", 3, "AT", "Profetas menores"],
  ["Habacuc", "Hab", 3, "AT", "Profetas menores"],
  ["Sofonías", "Sof", 3, "AT", "Profetas menores"],
  ["Hageo", "Hag", 2, "AT", "Profetas menores"],
  ["Zacarías", "Zac", 14, "AT", "Profetas menores"],
  ["Malaquías", "Mal", 4, "AT", "Profetas menores"],
  ["Mateo", "Mt", 28, "NT", "Evangelios"],
  ["Marcos", "Mr", 16, "NT", "Evangelios"],
  ["Lucas", "Lc", 24, "NT", "Evangelios"],
  ["Juan", "Jn", 21, "NT", "Evangelios"],
  ["Hechos", "Hch", 28, "NT", "Historia"],
  ["Romanos", "Ro", 16, "NT", "Cartas de Pablo"],
  ["1 Corintios", "1Co", 16, "NT", "Cartas de Pablo"],
  ["2 Corintios", "2Co", 13, "NT", "Cartas de Pablo"],
  ["Gálatas", "Ga", 6, "NT", "Cartas de Pablo"],
  ["Efesios", "Ef", 6, "NT", "Cartas de Pablo"],
  ["Filipenses", "Fil", 4, "NT", "Cartas de Pablo"],
  ["Colosenses", "Col", 4, "NT", "Cartas de Pablo"],
  ["1 Tesalonicenses", "1Ts", 5, "NT", "Cartas de Pablo"],
  ["2 Tesalonicenses", "2Ts", 3, "NT", "Cartas de Pablo"],
  ["1 Timoteo", "1Ti", 6, "NT", "Cartas de Pablo"],
  ["2 Timoteo", "2Ti", 4, "NT", "Cartas de Pablo"],
  ["Tito", "Tit", 3, "NT", "Cartas de Pablo"],
  ["Filemón", "Flm", 1, "NT", "Cartas de Pablo"],
  ["Hebreos", "He", 13, "NT", "Cartas generales"],
  ["Santiago", "Stg", 5, "NT", "Cartas generales"],
  ["1 Pedro", "1P", 5, "NT", "Cartas generales"],
  ["2 Pedro", "2P", 3, "NT", "Cartas generales"],
  ["1 Juan", "1Jn", 5, "NT", "Cartas generales"],
  ["2 Juan", "2Jn", 1, "NT", "Cartas generales"],
  ["3 Juan", "3Jn", 1, "NT", "Cartas generales"],
  ["Judas", "Jud", 1, "NT", "Cartas generales"],
  ["Apocalipsis", "Ap", 22, "NT", "Profecía"],
];

export const slugifyBook = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const books: BibleBook[] = raw.map(([name, abbr, chapters, testament, group]) => ({
  id: slugifyBook(name),
  name,
  abbr,
  chapters,
  testament,
  group,
}));

export const getBook = (id: string) => books.find((b) => b.id === id);

export const booksByTestament = (testament: "AT" | "NT") =>
  books.filter((b) => b.testament === testament);

export const adjacentBooks = (id: string) => {
  const i = books.findIndex((b) => b.id === id);
  return { prev: i > 0 ? books[i - 1] : undefined, next: i < books.length - 1 ? books[i + 1] : undefined };
};
