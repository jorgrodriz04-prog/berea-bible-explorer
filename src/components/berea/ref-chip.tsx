import { parseRef } from "@/lib/refs";
import { refAvailable } from "@/lib/knowledge";
import { AppLink } from "./app-link";

/**
 * Chip de referencia bíblica. Solo enlaza cuando el texto existe en BEREA:
 * así no se generan enlaces falsos.
 */
export function RefChip({ reference }: { reference: string }) {
  const parsed = parseRef(reference);
  const classes =
    "inline-flex min-h-9 items-center rounded-full border border-border bg-secondary px-3 text-sm font-semibold text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary";

  if (!parsed.path || !refAvailable(reference))
    return (
      <span
        className="inline-flex min-h-9 items-center rounded-full border border-dashed border-border bg-surface px-3 text-sm font-medium text-muted-foreground"
        title="Texto aún no disponible en BEREA"
      >
        {reference}
      </span>
    );

  return (
    <AppLink href={parsed.path} className={classes}>
      {reference}
    </AppLink>
  );
}

export function RefChipList({ refs }: { refs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {refs.map((r) => (
        <RefChip key={r} reference={r} />
      ))}
    </div>
  );
}
