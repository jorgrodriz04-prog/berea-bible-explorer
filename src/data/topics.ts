import type { Topic } from "./types";

export const topics: Topic[] = [
  { id: "fe", name: "Fe", aliases: ["creer", "confianza"], kind: "doctrina", summary: "Certeza de lo que se espera y convicción de lo que no se ve; el medio por el cual el creyente recibe las promesas de Dios.", refs: ["Hebreos 11:1", "Hebreos 11:6", "Efesios 2:8"], studies: ["la-fe-que-agrada-a-dios"] },
  { id: "perdon", name: "Perdón", aliases: ["perdonar", "misericordia"], kind: "tema", summary: "Dios borra la culpa del que se arrepiente y llama a su pueblo a perdonar como fue perdonado.", refs: ["Salmos 51:1", "Jeremías 31:34", "Efesios 4:32"], studies: ["el-perdon-que-restaura"] },
  { id: "pacto", name: "Pacto", aliases: ["alianza", "nuevo pacto", "testamento"], kind: "doctrina", summary: "Relación que Dios establece con su pueblo mediante promesas y señales, desde Abraham hasta el nuevo pacto en Cristo.", refs: ["Génesis 15:18", "Jeremías 31:31-34", "Hebreos 8:6"], studies: ["el-pacto-de-dios"] },
  { id: "salvacion", name: "Salvación", aliases: ["salvar", "redencion", "gracia"], kind: "doctrina", summary: "Obra de Dios que libra al pecador de la condenación por la muerte y resurrección de Cristo, recibida por gracia mediante la fe.", refs: ["Juan 3:16", "Efesios 2:8-9", "Romanos 8:1"], studies: ["salvacion-por-gracia"] },
  { id: "oracion", name: "Oración", aliases: ["orar", "clamor"], kind: "tema", summary: "Comunión del creyente con Dios: adoración, confesión, gratitud y petición.", refs: ["Mateo 6:9", "Filipenses 4:6", "Santiago 5:16"] },
  { id: "esperanza", name: "Esperanza", aliases: ["consuelo"], kind: "tema", summary: "Confianza firme en las promesas de Dios y en la vida venidera.", refs: ["Romanos 8:24", "1 Corintios 13:13", "Apocalipsis 21:4"] },
  { id: "amor", name: "Amor", aliases: ["caridad", "agape"], kind: "doctrina", summary: "Carácter esencial de Dios y mandamiento supremo para su pueblo.", refs: ["1 Corintios 13:4", "Juan 3:16", "1 Juan 4:8"] },
  { id: "arrepentimiento", name: "Arrepentimiento", aliases: ["conversion", "contricion"], kind: "doctrina", summary: "Cambio de mente y de dirección: dejar el pecado y volverse a Dios.", refs: ["Salmos 51:17", "Hechos 2:38"] },
  { id: "profecia", name: "Profecía", aliases: ["escatologia", "ultimos tiempos", "leviatan"], kind: "tema", summary: "Palabra de Dios sobre el futuro y el juicio, incluidas las imágenes simbólicas del leviatán, Babilonia y la nueva creación.", refs: ["Job 41:1", "Daniel 2:44", "Apocalipsis 21:1"] },
  { id: "vigilancia", name: "Vigilancia", aliases: ["velar", "preparacion", "diez virgenes"], kind: "tema", summary: "Llamado a estar preparados para la venida del Señor con una fe viva y provista.", refs: ["Mateo 25:1-13", "1 Tesalonicenses 5:6"], studies: ["las-diez-virgenes"] },
];

export const getTopic = (id: string) => topics.find((t) => t.id === id);
