import type { Term } from "../types";

/**
 * Términos bíblicos. Cada término separa la definición apoyada en el texto
 * (biblical) del trasfondo histórico o lingüístico (background) y de las
 * lecturas posibles (interpretations).
 */
export const terms: Term[] = [
  {
    id: "leviatan",
    name: "Leviatán",
    aliases: ["leviathan", "leviatan", "monstruo marino"],
    category: "simbolo",
    biblical:
      "Criatura marina descrita en Job 41 como imposible de dominar por el hombre; aparece también en los Salmos e Isaías dentro de imágenes del poder de Dios sobre el caos.",
    background:
      "En la literatura del antiguo Cercano Oriente existían relatos de monstruos marinos que representaban el caos; los lectores originales reconocían esa imagen.",
    interpretations: [
      "Interpretación: un animal real, hoy no identificado con certeza (por ejemplo, un gran reptil acuático).",
      "Interpretación: una figura poética del caos y de los poderes que se oponen a Dios.",
    ],
    refs: ["Job 41:1", "Job 41:33", "Salmos 74:14", "Isaías 27:1"],
    people: ["job-persona"],
    topics: ["profecia"],
    sources: ["biblia-rv", "contexto-cultural-general", "interpretaciones-comunes"],
  },
  {
    id: "pacto-termino",
    name: "Pacto (berit)",
    aliases: ["berit", "alianza", "covenant"],
    category: "doctrina",
    biblical:
      "Compromiso solemne que Dios establece con personas o con su pueblo, con promesas, señales y consecuencias: Noé, Abraham, Sinaí y el nuevo pacto en Cristo.",
    background:
      "Los tratados del antiguo Cercano Oriente seguían una forma fija (preámbulo, historia, estipulaciones, señales, testigos) que la Biblia utiliza al describir los pactos.",
    refs: ["Génesis 9:11", "Génesis 15:18", "Éxodo 19:5", "Jeremías 31:31", "Hebreos 8:6"],
    people: ["abraham", "moises", "jesus"],
    places: ["sinai"],
    events: ["exodo"],
    topics: ["pacto"],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "expiacion",
    name: "Expiación",
    aliases: ["kipper", "propiciacion", "atonement"],
    category: "doctrina",
    biblical:
      "Acción por la cual el pecado es cubierto y la relación con Dios restaurada; en la ley mediante sacrificio, y en el Nuevo Testamento por la muerte de Cristo.",
    background:
      "El día de la expiación (Yom Kipur) era el rito anual más solemne del calendario israelita.",
    refs: ["Levítico 16:30", "Isaías 53:5", "Romanos 3:25", "Hebreos 9:22"],
    people: ["jesus", "moises"],
    topics: ["salvacion"],
    customs: ["dia-expiacion"],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "mesias",
    name: "Mesías",
    aliases: ["cristo", "ungido", "christos"],
    category: "doctrina",
    biblical:
      "«Ungido»: el rey y libertador prometido en el Antiguo Testamento. El Nuevo Testamento identifica a Jesús como ese Mesías.",
    background:
      "En el siglo I existían expectativas diversas sobre el Mesías, muchas de ellas de carácter político y nacional.",
    refs: ["Isaías 53:5", "Daniel 9:25", "Juan 1:41", "Mateo 16:16"],
    people: ["jesus", "pedro", "david"],
    topics: ["salvacion", "profecia"],
    terms: ["reino-de-dios"],
    sources: ["biblia-rv", "contexto-historico-general"],
  },
  {
    id: "sabiduria",
    name: "Sabiduría",
    aliases: ["hokma", "prudencia"],
    category: "palabra",
    biblical:
      "Habilidad para vivir conforme al temor de Jehová; los libros sapienciales la presentan como don de Dios y camino de vida.",
    refs: ["Proverbios 1:7", "Proverbios 9:10", "Santiago 1:5"],
    people: ["salomon", "job-persona"],
    topics: ["oracion"],
    sources: ["biblia-rv"],
  },
  {
    id: "justicia",
    name: "Justicia",
    aliases: ["tsedaqah", "justificacion", "rectitud"],
    category: "doctrina",
    biblical:
      "Conformidad con el carácter y la norma de Dios. En Pablo, la justicia que Dios atribuye al que cree, no la que se gana por obras.",
    refs: ["Génesis 15:6", "Salmos 89:14", "Romanos 3:22", "Romanos 4:3"],
    people: ["abraham", "pablo"],
    topics: ["salvacion"],
    sources: ["biblia-rv"],
  },
  {
    id: "santidad",
    name: "Santidad",
    aliases: ["qadosh", "santo", "consagracion"],
    category: "palabra",
    biblical:
      "Ser separado para Dios. Se aplica a Dios mismo, al pueblo, al tiempo y a los objetos del culto.",
    refs: ["Levítico 19:2", "Isaías 6:3", "1 Pedro 1:16"],
    people: ["isaias", "pedro"],
    customs: ["templo"],
    sources: ["biblia-rv"],
  },
  {
    id: "sheol",
    name: "Sheol",
    aliases: ["seol", "hades", "sepulcro"],
    category: "palabra",
    biblical:
      "Palabra hebrea para el lugar de los muertos. El Antiguo Testamento habla de él como el destino común de todos, sin describirlo en detalle.",
    background:
      "En griego se traduce «Hades». Las descripciones más desarrolladas del estado después de la muerte aparecen en textos posteriores y en el Nuevo Testamento.",
    interpretations: [
      "Interpretación: designa simplemente la tumba o el estado de muerte.",
      "Interpretación: designa un ámbito consciente de espera.",
    ],
    refs: ["Génesis 37:35", "Salmos 16:10", "Lucas 16:23"],
    topics: ["esperanza"],
    sources: ["biblia-rv", "interpretaciones-comunes"],
  },
  {
    id: "evangelio",
    name: "Evangelio",
    aliases: ["euangelion", "buenas nuevas", "buena noticia"],
    category: "doctrina",
    biblical:
      "«Buena noticia»: el anuncio de que Cristo murió por los pecados, fue sepultado y resucitó conforme a las Escrituras.",
    background:
      "El término se usaba en el mundo romano para anuncios oficiales de victorias o del nacimiento de un emperador.",
    refs: ["Marcos 1:1", "Romanos 1:16", "1 Corintios 15:3-4"],
    people: ["pablo", "jesus"],
    events: ["crucifixion"],
    topics: ["salvacion"],
    sources: ["biblia-rv", "contexto-historico-general"],
  },
  {
    id: "reino-de-dios",
    name: "Reino de Dios",
    aliases: ["reino de los cielos", "basileia"],
    category: "doctrina",
    biblical:
      "El gobierno de Dios anunciado por Jesús: presente en su ministerio y aún esperado en plenitud.",
    interpretations: [
      "Interpretación: se refiere principalmente al señorío presente de Dios en los creyentes.",
      "Interpretación: se refiere principalmente a un reino futuro y visible.",
    ],
    refs: ["Mateo 25:1", "Marcos 1:15", "Juan 3:3", "Daniel 2:44"],
    people: ["jesus"],
    events: ["segunda-venida"],
    topics: ["vigilancia", "profecia"],
    sources: ["biblia-rv", "interpretaciones-comunes"],
  },
];

export const getTerm = (id: string) => terms.find((t) => t.id === id);
