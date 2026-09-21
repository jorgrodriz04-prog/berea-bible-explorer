import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getBibleProviderStatus } from "@/lib/bible.functions";
import { useSettings } from "@/lib/settings";
import {
  MISSING_PROVIDER_MESSAGE,
  getVersion,
  primaryVersion,
  publicDomainVersion,
  type BibleVersion,
} from "@/data/bible/versions";

export interface ProviderStatusView {
  configured: boolean;
  missing: string[];
  attribution: string;
}

export interface ActiveVersion {
  /** Versión elegida por el usuario (predeterminada: RVR1960). */
  version: BibleVersion;
  /** true cuando la versión requiere una fuente con licencia autorizada. */
  needsProvider: boolean;
  /** Estado de la fuente autorizada (solo servidor; nunca expone secretos). */
  provider: ProviderStatusView | undefined;
  /** ¿Se puede mostrar texto de esta versión ahora mismo? */
  textAvailable: boolean;
  /** Mientras se comprueba la fuente autorizada. */
  checking: boolean;
  /** Mensaje único para el estado sin fuente autorizada. */
  missingMessage: string;
  /** Versión de dominio público, disponible como respaldo etiquetado. */
  fallback: BibleVersion;
  setVersionId: (id: string) => void;
}

/**
 * Fuente única de verdad para «qué versión se está mostrando y si su texto
 * está disponible». Nunca sustituye RVR1960 por RVR1909 de forma silenciosa:
 * solo informa, y el cambio de versión siempre es una acción del usuario.
 */
export function useBibleVersion(): ActiveVersion {
  const { versionId, setVersionId } = useSettings();
  const version = getVersion(versionId) ?? primaryVersion;
  const needsProvider = version.delivery === "proveedor-licenciado";

  const readStatus = useServerFn(getBibleProviderStatus);
  const status = useQuery({
    queryKey: ["estado-proveedor-biblico"],
    queryFn: () => readStatus(),
    enabled: needsProvider,
    staleTime: 5 * 60 * 1000,
  });

  const provider = status.data as ProviderStatusView | undefined;

  return {
    version,
    needsProvider,
    provider,
    textAvailable: needsProvider ? Boolean(provider?.configured) : true,
    checking: needsProvider && status.isLoading,
    missingMessage: MISSING_PROVIDER_MESSAGE,
    fallback: publicDomainVersion,
    setVersionId,
  };
}
