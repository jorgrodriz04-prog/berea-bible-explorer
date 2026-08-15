import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

interface AppShellProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  action?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, subtitle, back, action, children }: AppShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="safe-top sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 pb-2.5">
          {back ? (
            <button
              type="button"
              aria-label="Volver"
              onClick={() => router.history.back()}
              className="no-tap-highlight flex size-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="size-6" />
            </button>
          ) : (
            <Link to="/" className="no-tap-highlight flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-base font-bold text-primary-foreground">
              B
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-semibold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <div className="shrink-0">{action}</div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-5">{children}</main>
      <BottomNav />
    </div>
  );
}
