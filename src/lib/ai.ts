/**
 * Punto de integración futuro para la asistencia con IA de estudio bíblico.
 *
 * La interfaz ya está definida para que la pantalla de IA se conecte más
 * adelante a un server function (Lovable Cloud + AI Gateway) sin rediseñar la
 * aplicación. Hoy no realiza llamadas externas.
 */
export interface BibleAiQuestion {
  question: string;
  context?: { bookId?: string; chapter?: number; studySlug?: string };
}

export interface BibleAiAnswer {
  answer: string;
  refs: string[];
  disclaimer: string;
}

export const AI_SCOPE_RULES = [
  "Responder únicamente sobre contenido bíblico y su estudio.",
  "Citar siempre las referencias bíblicas utilizadas.",
  "No emitir opiniones ajenas al ámbito bíblico.",
  "Aclarar cuando un tema tiene distintas interpretaciones.",
];

export const aiEnabled = false;

export async function askBibleAi(_input: BibleAiQuestion): Promise<BibleAiAnswer> {
  throw new Error("La función de IA todavía no está habilitada.");
}
