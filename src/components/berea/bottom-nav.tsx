import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Home, Search, Settings, GraduationCap } from "lucide-react";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/biblia", label: "Biblia", icon: BookOpen },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/estudios", label: "Estudios", icon: GraduationCap },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/ajustes", label: "Ajustes", icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto grid max-w-3xl grid-cols-6 px-1 pt-1.5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="no-tap-highlight group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="size-5 shrink-0" strokeWidth={1.9} />
              <span className="text-[10px] font-semibold tracking-tight">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
