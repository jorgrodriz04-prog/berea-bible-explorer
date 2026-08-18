import type { Source } from "../types";

/**
 * Fuentes declaradas de BEREA. Toda afirmación del cerebro de conocimiento debe
 * poder señalar una de estas fuentes. No se atribuyen citas a autores u obras
 * que no estén realmente incorporados aquí.
 */
export const sources: Source[] = [
  {
    id: "biblia-rv",
    name: "Biblia (Reina-Valera, dominio público)",
    kind: "biblia",
    description: "Texto bíblico citado directamente. Es la fuente primaria de BEREA.",
  },
  {
    id: "contexto-historico-general",
    name: "Contexto histórico general",
    kind: "contexto-historico",
    description:
      "Datos históricos ampliamente aceptados sobre los períodos bíblicos (monarquías, imperios, cronologías aproximadas).",
    note: "Información de trasfondo: no es un mandato bíblico ni una afirmación del texto.",
  },
  {
    id: "contexto-cultural-general",
    name: "Contexto cultural del antiguo Cercano Oriente y del siglo I",
    kind: "contexto-cultural",
    description:
      "Costumbres, medidas, monedas, prácticas familiares y religiosas del entorno en que se escribió la Biblia.",
    note: "Reconstrucción cultural: ayuda a entender el texto, no lo sustituye.",
  },
  {
    id: "estudio-berea",
    name: "Estudio propio de BEREA",
    kind: "estudio-berea",
    description:
      "Redacción y organización preparada por BEREA a partir de los textos bíblicos citados.",
    note: "Cuando incluye conclusiones, se identifican como interpretación.",
  },
  {
    id: "interpretaciones-comunes",
    name: "Interpretaciones cristianas frecuentes",
    kind: "comentario",
    description:
      "Resumen neutral de lecturas habituales de un pasaje, sin declarar cuál es la correcta.",
    note: "Se presentan como interpretación humana, nunca como decreto divino.",
  },
];

export const getSource = (id: string) => sources.find((s) => s.id === id);

export const sourceKindLabel: Record<Source["kind"], string> = {
  biblia: "Biblia",
  "contexto-historico": "Contexto histórico",
  "contexto-cultural": "Contexto cultural",
  "obra-de-referencia": "Obra de referencia",
  comentario: "Comentario / interpretación",
  "estudio-berea": "Estudio de BEREA",
};
