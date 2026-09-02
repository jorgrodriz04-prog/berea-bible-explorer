import { AlertTriangle } from "lucide-react";
import type { BibleVersion } from "@/data/bible/versions";

/** Chip que identifica siempre qué versión se está mostrando. */
export function VersionBadge({ version }: { version: BibleVersion }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
      {version.label}
    </span>
  );
}

/** Aviso mostrado cuando una versión con licencia no tiene proveedor configurado. */
export function LicensedVersionNotice({
  version,
  detail,
  fallback,
  onUseFallback,
}: {
  version: BibleVersion;
  detail: string;
  fallback: BibleVersion;
  onUseFallback: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gold/60 bg-gold/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {version.name} requiere una fuente autorizada
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
          <p className="mt-2 text-xs text-muted-foreground">{version.license}</p>
          <button
            type="button"
            onClick={onUseFallback}
            className="no-tap-highlight mt-3 inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary"
          >
            Leer en {fallback.label} (dominio público)
          </button>
        </div>
      </div>
    </div>
  );
}
