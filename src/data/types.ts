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
}

export interface Place {
  id: string;
  name: string;
  aliases: string[];
  region: string;
  summary: string;
  refs: string[];
}

export interface BibleEvent {
  id: string;
  name: string;
  aliases: string[];
  period: string;
  summary: string;
  refs: string[];
}

export interface Topic {
  id: string;
  name: string;
  aliases: string[];
  kind: "tema" | "doctrina" | "concepto";
  summary: string;
  refs: string[];
  studies?: string[];
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
}
