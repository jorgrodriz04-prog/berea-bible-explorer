import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useFavorites, type Favorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

interface Props {
  favorite: Omit<Favorite, "createdAt">;
  className?: string;
  label?: string;
}

export function FavoriteButton({ favorite, className, label }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(favorite.id);

  return (
    <button
      type="button"
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={active}
      onClick={() => {
        toggle(favorite);
        toast(active ? "Quitado de favoritos" : "Guardado en favoritos", {
          description: favorite.title,
        });
      }}
      className={cn(
        "no-tap-highlight inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-3 text-sm font-semibold transition-colors",
        active ? "border-primary/40 bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary",
        className,
      )}
    >
      <Heart className={cn("size-4", active && "fill-current")} />
      {label ? <span>{active ? "Guardado" : label}</span> : null}
    </button>
  );
}
