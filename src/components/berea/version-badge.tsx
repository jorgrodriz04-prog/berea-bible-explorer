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

/** Línea de atribución: versión + situación legal del texto mostrado. */
export function VersionCaption({
  version,
  attribution,
  className = "",
}: {
  version: BibleVersion;
  attribution?: string | undefined;
  className?: string;
}) {
  return (
    <span className={`text-xs font-semibold text-muted-foreground ${className}`}>
      {version.label} · {attribution ?? version.license.replace(/\.$/, "")}
    </span>
  );
}

/**
 * Aviso mostrado cuando la versión con licencia no tiene fuente autorizada.
 * Nunca sustituye el texto: ofrecer el respaldo es una decisión del usuario.
 */
export function LicensedVersionNotice({
  version,
  detail,
  fallback,
  onUseFallback,
  compact = false,
}: {
  version: BibleVersion;
  detail: string;
  fallback?: BibleVersion | undefined;
  onUseFallback?: (() => void) | undefined;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-dashed border-gold/60 bg-gold/5 ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{detail}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            El texto de {version.name} no se almacena en BEREA. Para leerlo aquí hay que conectar la
            fuente con licencia autorizada (API.Bible).
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{version.license}</p>
          {fallback && onUseFallback ? (
            <button
              type="button"
              onClick={onUseFallback}
              className="no-tap-highlight mt-3 inline-flex min-h-11 items-center rounded-full border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary"
            >
              Leer en {fallback.label} (dominio público)
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
