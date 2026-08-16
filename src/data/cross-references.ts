import type { CrossReference } from "./types";

/**
 * Referencias cruzadas entre pasajes. Se declaran explícitamente para no
 * generar enlaces inventados: la interfaz solo muestra como abribles las
 * referencias cuyo texto existe en src/data/verses.ts.
 */
export const crossReferences: CrossReference[] = [
  {
    ref: "Juan 3:16",
    related: ["Romanos 5:8", "1 Juan 4:9-10", "Efesios 2:4-5", "Isaías 53:5"],
    reason: "El amor de Dios como origen del envío del Hijo y de la salvación del creyente.",
    topics: ["salvacion", "amor"],
    terms: ["evangelio"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Hebreos 11:1",
    related: ["Hebreos 11:6", "Romanos 8:28", "2 Corintios 5:7"],
    reason: "Definición de la fe y su relación con la confianza en lo que no se ve.",
    topics: ["fe"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Hebreos 11:30",
    related: ["Josué 6:20", "Josué 6:2", "2 Corintios 10:4"],
    reason: "La caída de Jericó citada como ejemplo de fe obediente.",
    topics: ["fe"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Josué 6:20",
    related: ["Hebreos 11:30", "Josué 6:2", "1 Samuel 15:22"],
    reason: "Relato de la caída del muro y su lectura posterior.",
    topics: ["fe"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Salmos 51:10",
    related: ["Jeremías 31:33", "Ezequiel 36:26", "Salmos 51:17"],
    reason: "Petición de un corazón nuevo y su promesa en los profetas.",
    topics: ["perdon", "arrepentimiento"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Jeremías 31:31",
    related: ["Hebreos 8:6", "Lucas 22:20", "Éxodo 19:5", "Génesis 15:18"],
    reason: "El nuevo pacto en relación con los pactos anteriores.",
    topics: ["pacto"],
    terms: ["pacto-termino"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Efesios 2:8",
    related: ["Romanos 4:3", "Tito 3:5", "Génesis 15:6"],
    reason: "Salvación por gracia mediante la fe, no por obras.",
    topics: ["salvacion"],
    terms: ["justicia"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Isaías 53:5",
    related: ["1 Pedro 2:24", "Romanos 4:25", "Juan 3:16"],
    reason: "El siervo herido por las rebeliones ajenas y su lectura en el Nuevo Testamento.",
    topics: ["salvacion"],
    terms: ["expiacion", "mesias"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Mateo 25:13",
    related: ["Lucas 12:35", "1 Tesalonicenses 5:6", "Mateo 25:1"],
    reason: "Llamado a velar ante una venida cuya hora no se conoce.",
    topics: ["vigilancia"],
    terms: ["reino-de-dios"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Génesis 3:15",
    related: ["Romanos 5:12", "Gálatas 4:4", "Apocalipsis 12:9"],
    reason: "Primera promesa de redención tras la caída.",
    topics: ["salvacion", "profecia"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Job 41:1",
    related: ["Salmos 74:14", "Isaías 27:1", "Job 41:33"],
    reason: "Descripciones bíblicas del leviatán.",
    topics: ["profecia"],
    terms: ["leviatan"],
    sources: ["biblia-rv"],
  },
  {
    ref: "Hechos 17:11",
    related: ["Hechos 17:10", "2 Timoteo 2:15", "1 Tesalonicenses 5:21"],
    reason: "El método berea: comprobar en las Escrituras lo que se enseña.",
    sources: ["biblia-rv"],
  },
];

export const crossRefsFor = (ref: string) =>
  crossReferences.find((c) => c.ref.toLowerCase() === ref.trim().toLowerCase());
