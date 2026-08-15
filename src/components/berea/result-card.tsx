import { ChevronRight } from "lucide-react";
import { resultTypeLabel, type SearchResult } from "@/lib/search";
import { AppLink } from "./app-link";
import { FavoriteButton } from "./favorite-button";

export function ResultCard({ result }: { result: SearchResult }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <AppLink href={result.path} className="min-w-0 no-tap-highlight">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-secondary-foreground">
            {resultTypeLabel[result.type]}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold text-foreground">{result.title}</h3>
          {result.subtitle ? <p className="text-xs text-muted-foreground">{result.subtitle}</p> : null}
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{result.body}</p>
        </AppLink>
        <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
      </div>
      <div className="mt-3 flex justify-end">
        <FavoriteButton
          favorite={{
            id: `resultado:${result.id}`,
            kind: result.type === "estudio" ? "estudio" : result.type === "versiculo" ? "versiculo" : "busqueda",
            title: result.title,
            subtitle: resultTypeLabel[result.type],
            body: result.body,
            path: result.path,
          }}
        />
      </div>
    </div>
  );
}
