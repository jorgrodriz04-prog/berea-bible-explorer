import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { AppLink } from "@/components/berea/app-link";
import { EmptyState } from "@/components/berea/section";
import { adjacentBooks, getBook } from "@/data/books";
import { availableChapters } from "@/data/verses";

export const Route = createFileRoute("/biblia/$bookId/")({
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.book.name ?? "Libro";
    return {
      meta: [
        { title: `${name} — BEREA` },
        { name: "description", content: `Capítulos de ${name} para leer y estudiar en BEREA.` },
        { property: "og:title", content: `${name} — BEREA` },
        { property: "og:description", content: `Selecciona un capítulo de ${name}.` },
      ],
    };
  },
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const withText = new Set(availableChapters(book.id));
  const { prev, next } = adjacentBooks(book.id);

  return (
    <AppShell
      title={book.name}
      subtitle={`${book.testament === "AT" ? "Antiguo" : "Nuevo"} Testamento · ${book.group}`}
      back
    >
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => (
          <AppLink
            key={n}
            href={`/biblia/${book.id}/${n}`}
            className={`no-tap-highlight flex min-h-14 items-center justify-center rounded-xl border text-base font-semibold shadow-soft ${
              withText.has(n)
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {n}
          </AppLink>
        ))}
      </div>

      {!withText.size ? (
        <div className="mt-5">
          <EmptyState
            title="Texto pendiente de carga"
            description="Este libro ya está disponible para navegar. El texto completo se incorporará al conectar la base de datos bíblica."
          />
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">
          Los capítulos destacados ya incluyen texto en esta versión.
        </p>
      )}

      <nav className="mt-6 grid grid-cols-2 gap-3">
        {prev ? (
          <AppLink
            href={`/biblia/${prev.id}`}
            className="no-tap-highlight flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground"
          >
            ← {prev.name}
          </AppLink>
        ) : (
          <span />
        )}
        {next ? (
          <AppLink
            href={`/biblia/${next.id}`}
            className="no-tap-highlight flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground"
          >
            {next.name} →
          </AppLink>
        ) : (
          <span />
        )}
      </nav>
    </AppShell>
  );
}
