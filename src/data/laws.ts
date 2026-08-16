import type { Law } from "./types";

/** Leyes y mandamientos citados con su texto y, cuando el NT lo indica, su cumplimiento. */
export const laws: Law[] = [
  {
    id: "diez-mandamientos",
    name: "Los diez mandamientos",
    aliases: ["decalogo", "mandamientos", "tablas de la ley"],
    category: "moral",
    summary: "Núcleo del pacto del Sinaí entregado a Israel por medio de Moisés.",
    biblical:
      "Éxodo 20 recoge diez palabras que abren con «Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto» y regulan la relación con Dios y con el prójimo.",
    fulfillment:
      "Jesús resume la ley en amar a Dios y al prójimo (Mateo 22:37-40) y Pablo afirma que el amor es el cumplimiento de la ley (Romanos 13:10).",
    refs: ["Éxodo 20:1", "Deuteronomio 5:6", "Mateo 22:37-40"],
    people: ["moises", "jesus"],
    topics: ["pacto"],
    terms: ["pacto-termino", "justicia"],
    sources: ["biblia-rv"],
  },
  {
    id: "amar-al-projimo",
    name: "Amarás a tu prójimo",
    aliases: ["segundo mandamiento", "amor al projimo"],
    category: "moral",
    summary: "Mandamiento de Levítico que el Nuevo Testamento cita como resumen de la ley.",
    biblical: "«Amarás a tu prójimo como a ti mismo» (Levítico 19:18).",
    fulfillment:
      "Citado por Jesús como el segundo gran mandamiento y por Santiago como «la ley real».",
    refs: ["Levítico 19:18", "Mateo 22:39", "Santiago 2:8"],
    people: ["jesus"],
    topics: ["amor"],
    sources: ["biblia-rv"],
  },
  {
    id: "leyes-del-pobre",
    name: "Provisión para el pobre y el extranjero",
    aliases: ["espigar", "rebuscar", "diezmo del pobre"],
    category: "civil",
    summary: "La ley reserva parte de la cosecha para el pobre, la viuda y el extranjero.",
    biblical:
      "No segar los rincones del campo, no rebuscar la viña y dejar lo olvidado para el pobre y el extranjero (Levítico 19:9-10; Deuteronomio 24:19).",
    interpretation:
      "Interpretación: muchos leen estos textos como base de la responsabilidad social del pueblo de Dios.",
    refs: ["Levítico 19:9-10", "Deuteronomio 24:19", "Rut 2:3"],
    customs: ["agricultura"],
    topics: ["amor"],
    sources: ["biblia-rv", "interpretaciones-comunes"],
  },
  {
    id: "sacrificios",
    name: "Ley de los sacrificios",
    aliases: ["holocausto", "ofrendas", "levitico"],
    category: "ceremonial",
    summary: "Sistema de ofrendas para la expiación y la comunión con Dios.",
    biblical:
      "Levítico regula holocaustos, ofrendas de paz y de expiación; sin derramamiento de sangre no se hacía remisión (Hebreos 9:22).",
    fulfillment:
      "Hebreos presenta el sacrificio de Cristo como definitivo y superior a los sacrificios repetidos.",
    refs: ["Levítico 1:3", "Levítico 16:30", "Hebreos 9:22", "Hebreos 10:12"],
    terms: ["expiacion"],
    customs: ["dia-expiacion", "templo"],
    sources: ["biblia-rv"],
  },
  {
    id: "mandamiento-nuevo",
    name: "El mandamiento nuevo",
    aliases: ["amaos los unos a los otros"],
    category: "mandamiento-nuevo",
    summary: "Jesús ordena a sus discípulos amarse como él los amó.",
    biblical:
      "«Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado» (Juan 13:34).",
    refs: ["Juan 13:34", "1 Juan 4:9-10"],
    people: ["jesus", "juan"],
    topics: ["amor"],
    sources: ["biblia-rv"],
  },
];

export const getLaw = (id: string) => laws.find((l) => l.id === id);
