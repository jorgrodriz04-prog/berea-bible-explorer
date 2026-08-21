import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { EmptyState } from "@/components/berea/section";
import { FavoriteButton } from "@/components/berea/favorite-button";
import { RefChipList } from "@/components/berea/ref-chip";
import { crossRefsForRef } from "@/lib/knowledge";
import { adjacentBooks, getBook } from "@/data/bible/books";
import { getChapter } from "@/data/bible/verses";

export const Route = createFileRoute("/biblia/$bookId/$chapter")({
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    const chapter = Number(params.chapter);
    if (!book || !Number.isFinite(chapter) || chapter < 1 || chapter > book.chapters) throw notFound();
    return { book, chapter, content: getChapter(book.id, chapter) ?? null };
  },
  head: ({ loaderData }) => {
    const label = loaderData ? `${loaderData.book.name} ${loaderData.chapter}` : "Lectura";
    return {
      meta: [
        { title: `${label} — BEREA` },
        { name: "description", content: `Lee ${label} y guarda versículos en favoritos con BEREA.` },
        { property: "og:title", content: `${label} — BEREA` },
        { property: "og:description", content: `Texto bíblico de ${label}.` },
      ],
    };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { book, chapter, content } = Route.useLoaderData();
  const { prev: prevBook, next: nextBook } = adjacentBooks(book.id);
  const prevHref =
    chapter > 1
      ? `/biblia/${book.id}/${chapter - 1}`
      : prevBook
        ? `/biblia/${prevBook.id}/${prevBook.chapters}`
        : null;
  const nextHref =
    chapter < book.chapters
      ? `/biblia/${book.id}/${chapter + 1}`
      : nextBook
        ? `/biblia/${nextBook.id}/1`
        : null;

  return (
    <AppShell
      title={`${book.name} ${chapter}`}
      subtitle={book.group}
      back
      action={
        <AppLink
          href={`/biblia/${book.id}`}
          className="no-tap-highlight inline-flex min-h-10 items-center rounded-full border border-border px-3 text-xs font-semibold text-muted-foreground"
        >
          Capítulos
        </AppLink>
      }
    >
      {content ? (
        <ol className="space-y-4">
          {content.verses.map((v) => {
            const reference = `${book.name} ${chapter}:${v.number}`;
            const cross = crossRefsForRef(reference);
            return (
              <li key={v.number} className="group rounded-2xl border border-border bg-card p-4 shadow-soft">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <span className="mt-0.5 font-display text-sm font-bold text-primary">{v.number}</span>
                  <p className="scripture text-card-foreground">{v.text}</p>
                </div>

                {cross ? (
                  <div className="mt-3 rounded-xl border border-border bg-surface p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Referencias cruzadas
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{cross.reason}</p>
                    <div className="mt-2">
                      <RefChipList refs={[...cross.available.map((a) => a.ref), ...cross.unavailable]} />
                    </div>
                  </div>
                ) : null}

                <div className="mt-3 flex justify-end">
                  <FavoriteButton
                    favorite={{
                      id: `versiculo:${book.id}:${chapter}:${v.number}`,
                      kind: "versiculo",
                      title: reference,
                      subtitle: "Versículo",
                      body: v.text,
                      path: `/biblia/${book.id}/${chapter}`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      ) : (

        <EmptyState
          title="Capítulo sin texto todavía"
          description="La navegación ya funciona. El texto de este capítulo se cargará cuando se conecte la base de datos bíblica completa."
        />
      )}

      <nav className="mt-6 grid grid-cols-2 gap-3">
        {prevHref ? (
          <AppLink
            href={prevHref}
            className="no-tap-highlight flex min-h-12 items-center justify-center rounded-xl border border-border bg-card text-sm font-semibold text-foreground"
          >
            ← Anterior
          </AppLink>
        ) : (
          <span />
        )}
        {nextHref ? (
          <AppLink
            href={nextHref}
            className="no-tap-highlight flex min-h-12 items-center justify-center rounded-xl border border-border bg-card text-sm font-semibold text-foreground"
          >
            Siguiente →
          </AppLink>
        ) : (
          <span />
        )}
      </nav>
    </AppShell>
  );
}
