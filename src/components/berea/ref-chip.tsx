import { parseRef } from "@/lib/refs";
import { AppLink } from "./app-link";

export function RefChip({ reference }: { reference: string }) {
  const parsed = parseRef(reference);
  const classes =
    "inline-flex min-h-9 items-center rounded-full border border-border bg-secondary px-3 text-sm font-semibold text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary";

  if (!parsed.path) return <span className={classes}>{reference}</span>;
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
