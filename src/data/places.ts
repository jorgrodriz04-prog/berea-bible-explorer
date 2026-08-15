import type { Place } from "./types";

export const places: Place[] = [
  { id: "eden", name: "Edén", aliases: ["huerto del eden", "paraiso"], region: "Mesopotamia", summary: "Huerto plantado por Dios donde vivieron Adán y Eva antes de la caída.", refs: ["Génesis 2:8", "Génesis 3:23"] },
  { id: "jerico", name: "Jericó", aliases: ["jerico", "ciudad de las palmeras"], region: "Canaán, valle del Jordán", summary: "Ciudad fortificada cuyos muros cayeron cuando Israel rodeó la ciudad siete días por fe.", refs: ["Josué 6:1-20", "Hebreos 11:30"] },
  { id: "jerusalen", name: "Jerusalén", aliases: ["sion", "ciudad de david"], region: "Judea", summary: "Ciudad del templo y centro del culto a Jehová; escenario de la crucifixión, resurrección y Pentecostés.", refs: ["2 Samuel 5:7", "Lucas 24:47", "Apocalipsis 21:2"] },
  { id: "egipto", name: "Egipto", aliases: [], region: "Norte de África", summary: "Tierra de esclavitud de Israel y escenario del éxodo y la pascua.", refs: ["Éxodo 1:11", "Éxodo 12:31"] },
  { id: "sinai", name: "Sinaí", aliases: ["monte sinai", "horeb"], region: "Península del Sinaí", summary: "Monte donde Dios entregó la ley y estableció el pacto con Israel.", refs: ["Éxodo 19:20", "Éxodo 20:1"] },
  { id: "nazaret", name: "Nazaret", aliases: [], region: "Galilea", summary: "Aldea donde creció Jesús.", refs: ["Lucas 2:39", "Mateo 2:23"] },
  { id: "berea", name: "Berea", aliases: ["bereanos"], region: "Macedonia", summary: "Ciudad donde los oyentes recibieron la palabra con solicitud y escudriñaban cada día las Escrituras. Da nombre a esta aplicación.", refs: ["Hechos 17:10-11"] },
  { id: "babilonia", name: "Babilonia", aliases: [], region: "Mesopotamia", summary: "Imperio que llevó cautivo a Judá; símbolo profético de los sistemas que se oponen a Dios.", refs: ["2 Reyes 25:1", "Apocalipsis 18:2"] },
];

export const getPlace = (id: string) => places.find((p) => p.id === id);
