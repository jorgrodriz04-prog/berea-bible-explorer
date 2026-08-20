import { BookOpen, Info, Landmark, MessageCircleQuestion } from "lucide-react";
import { AppLink } from "./app-link";
import { Panel, SectionTitle } from "./section";
import { RefChipList } from "./ref-chip";
import {
  entityKindPlural,
  sourceLabels,
  crossRefsForRef,
  type EntityRef,
  type KnowledgeEntity,
  type KnowledgeLayers,
} from "@/lib/knowledge";

/** Chips navegables hacia otras entidades del cerebro de conocimiento. */
export function RelationChips({ items }: { items: EntityRef[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((r) => (
        <AppLink
          key={`${r.kind}:${r.id}`}
          href={r.path}
          className="no-tap-highlight inline-flex min-h-9 items-center rounded-full border border-border bg-secondary px-3 text-sm font-semibold text-secondary-foreground hover:border-primary/40 hover:text-primary"
        >
          {r.name}
        </AppLink>
      ))}
    </div>
  );
}

export function RelationSections({ relations }: { relations: KnowledgeEntity["relations"] }) {
  const entries = Object.entries(relations) as [keyof typeof entityKindPlural, EntityRef[]][];
  if (!entries.length) return null;
  return (
    <div className="mt-6 space-y-5">
      {entries.map(([kind, items]) => (
        <section key={kind}>
          <SectionTitle>{entityKindPlural[kind]}</SectionTitle>
          <RelationChips items={items} />
        </section>
      ))}
    </div>
  );
}

/**
 * Muestra por separado lo que afirma la Biblia, el contexto histórico/cultural
 * y las interpretaciones. Nunca se presenta una reconstrucción como mandato.
 */
export function LayeredContent({ layers }: { layers: KnowledgeLayers }) {
  return (
    <div className="space-y-3">
      {layers.biblical ? (
        <Panel>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            <BookOpen className="size-3.5" /> Lo que dice la Biblia
          </p>
          <p className="scripture mt-2 whitespace-pre-line text-card-foreground">{layers.biblical}</p>
        </Panel>
      ) : null}

      {layers.historical ? (
        <Panel>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Landmark className="size-3.5" /> Contexto histórico y cultural
          </p>
          <p className="scripture mt-2 text-card-foreground">{layers.historical}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Información de trasfondo para entender el texto; no es una afirmación de la Biblia.
          </p>
        </Panel>
      ) : null}

      {layers.interpretations?.length ? (
        <Panel>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <MessageCircleQuestion className="size-3.5" /> Interpretaciones
          </p>
          <ul className="mt-2 space-y-2">
            {layers.interpretations.map((i) => (
              <li key={i} className="scripture text-card-foreground">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Lecturas humanas del texto. BEREA no decide por ti: compara, examina y concluye.
          </p>
        </Panel>
      ) : null}
    </div>
  );
}

export function SourcesNote({ ids }: { ids: readonly string[] }) {
  const list = sourceLabels(ids);
  if (!list.length) return null;
  return (
    <section className="mt-6">
      <SectionTitle>Fuentes</SectionTitle>
      <Panel className="space-y-2">
        {list.map((s) => (
          <div key={s.id}>
            <p className="text-sm font-semibold text-foreground">
              {s.kind}
              <span className="font-normal text-muted-foreground"> · {s.name}</span>
            </p>
            {s.note ? <p className="text-xs text-muted-foreground">{s.note}</p> : null}
          </div>
        ))}
      </Panel>
    </section>
  );
}

/** Referencias cruzadas de un pasaje: solo se enlazan las disponibles en BEREA. */
export function CrossRefPanel({ reference }: { reference: string }) {
  const cross = crossRefsForRef(reference);
  if (!cross) return null;
  return (
    <Panel className="space-y-2">
      <p className="text-sm font-semibold text-foreground">{cross.ref}</p>
      <p className="text-xs text-muted-foreground">{cross.reason}</p>
      {cross.available.length ? <RefChipList refs={cross.available.map((a) => a.ref)} /> : null}
      {cross.unavailable.length ? (
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Sin texto disponible todavía en BEREA: {cross.unavailable.join(", ")}. Puedes consultarlas en
            tu Biblia.
          </span>
        </p>
      ) : null}
    </Panel>
  );
}
