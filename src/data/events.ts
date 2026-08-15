import type { BibleEvent } from "./types";

export const events: BibleEvent[] = [
  { id: "creacion", name: "La creación", aliases: ["principio", "seis dias"], period: "Principio", summary: "Dios crea los cielos y la tierra por su palabra, culminando en el hombre a su imagen.", refs: ["Génesis 1:1-27", "Juan 1:3"] },
  { id: "caida", name: "La caída", aliases: ["pecado original", "serpiente", "eva y la serpiente"], period: "Patriarcal", summary: "Adán y Eva desobedecen y el pecado entra al mundo, junto con la primera promesa de redención.", refs: ["Génesis 3:1-21", "Romanos 5:12"] },
  { id: "diluvio", name: "El diluvio", aliases: ["arca de noe"], period: "Patriarcal", summary: "Juicio universal por agua y preservación de Noé y su familia en el arca.", refs: ["Génesis 7:11", "Génesis 9:11"] },
  { id: "exodo", name: "El éxodo", aliases: ["salida de egipto", "pascua", "mar rojo"], period: "Éxodo", summary: "Dios libera a Israel de Egipto con señales, la pascua y la apertura del mar Rojo.", refs: ["Éxodo 12:31", "Éxodo 14:21"] },
  { id: "caida-jerico", name: "La caída de Jericó", aliases: ["muros de jerico", "siete dias"], period: "Conquista", summary: "Israel rodea Jericó siete días y los muros caen por la fe y la obediencia.", refs: ["Josué 6:1-20", "Hebreos 11:30"] },
  { id: "cautividad", name: "La cautividad babilónica", aliases: ["exilio", "destierro"], period: "Monarquía tardía", summary: "Judá es llevada cautiva a Babilonia por su infidelidad al pacto; setenta años de exilio.", refs: ["2 Reyes 25:1", "Jeremías 25:11"] },
  { id: "crucifixion", name: "La crucifixión y resurrección", aliases: ["calvario", "cruz", "resurreccion"], period: "Evangelios", summary: "Jesús muere en lugar del pecador y resucita al tercer día, fundamento del evangelio.", refs: ["Isaías 53:5", "Lucas 24:6", "1 Corintios 15:3-4"] },
  { id: "pentecostes", name: "Pentecostés", aliases: ["espiritu santo", "nacimiento de la iglesia"], period: "Hechos", summary: "El Espíritu Santo desciende sobre los discípulos y comienza la expansión de la iglesia.", refs: ["Hechos 2:1-4", "Hechos 2:41"] },
  { id: "segunda-venida", name: "La segunda venida", aliases: ["parusia", "regreso de cristo", "diez virgenes"], period: "Futuro", summary: "Cristo vuelve por su pueblo; la parábola de las diez vírgenes llama a velar y estar preparados.", refs: ["Mateo 25:1-13", "Apocalipsis 21:1-4"] },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);
