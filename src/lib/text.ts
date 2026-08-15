export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const tokens = (value: string) =>
  normalize(value)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);

/** Distancia de edición (Levenshtein) para tolerar errores de escritura. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        (prev[j] ?? 0) + 1,
        (row[j - 1] ?? 0) + 1,
        (prev[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = row;
  }
  return prev[b.length] ?? 0;
}

const tolerance = (len: number) => (len <= 4 ? 1 : len <= 7 ? 2 : 3);

/** Coincidencia difusa: exacta, por prefijo, por inclusión o por cercanía. */
export function fuzzyScore(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);
  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 85;
  if (t.includes(q)) return 70;
  const qTokens = tokens(q);
  const tTokens = tokens(t);
  if (!qTokens.length) return 0;
  let total = 0;
  for (const qt of qTokens) {
    let best = 0;
    for (const tt of tTokens) {
      if (tt === qt) best = Math.max(best, 60);
      else if (tt.startsWith(qt) || qt.startsWith(tt)) best = Math.max(best, 48);
      else {
        const d = editDistance(qt, tt);
        if (d <= tolerance(qt.length)) best = Math.max(best, 40 - d * 6);
      }
    }
    total += best;
  }
  return Math.round(total / qTokens.length);
}

export function snippet(text: string, query: string, size = 150) {
  const idx = normalize(text).indexOf(normalize(query));
  if (idx < 0) return text.length > size ? `${text.slice(0, size)}…` : text;
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + size);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}
