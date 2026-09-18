/**
 * Registro de versiones bíblicas de BEREA.
 *
 * Regla de licencias (no negociable):
 * - Reina-Valera 1960 es la versión principal y predeterminada de BEREA, pero
 *   su texto NUNCA se copia ni se genera dentro del repositorio: se solicita a
 *   un proveedor con licencia autorizada (API.Bible), configurado por secretos.
 * - Si el proveedor no está configurado, BEREA lo dice con claridad
 *   («RVR1960 no configurada: falta conectar la fuente autorizada») y no
 *   sustituye el texto por otra versión.
 * - Reina-Valera 1909 (dominio público) permanece únicamente como fuente
 *   técnica temporal para que el lector y el buscador no queden roto; no es la
 *   versión predeterminada ni se presenta como la Biblia de BEREA.
 */

export type BibleVersionDelivery = "incluido" | "proveedor-licenciado";
export type BibleVersionRole = "principal" | "tecnica";

export interface BibleVersion {
  id: string;
  /** Nombre completo mostrado en fichas y metadatos. */
  name: string;
  /** Etiqueta corta para chips y encabezados. */
  label: string;
  year: number;
  /** Cómo llega el texto a la aplicación. */
  delivery: BibleVersionDelivery;
  /** Papel dentro de BEREA. */
  role: BibleVersionRole;
  /** Situación legal del texto. */
  license: string;
  /** Explicación mostrada al usuario. */
  note: string;
}

export const bibleVersions: BibleVersion[] = [
  {
    id: "rvr1960",
    name: "Reina-Valera 1960",
    label: "RVR1960",
    year: 1960,
    delivery: "proveedor-licenciado",
    role: "principal",
    license: "© Sociedades Bíblicas Unidas. Requiere licencia de distribución.",
    note:
      "Versión principal y predeterminada de BEREA. Su texto no se almacena en la aplicación: se solicita a un proveedor con licencia autorizada (API.Bible).",
  },
  {
    id: "rvr1909",
    name: "Reina-Valera 1909",
    label: "RVR1909",
    year: 1909,
    delivery: "incluido",
    role: "tecnica",
    license: "Dominio público.",
    note:
      "Fuente técnica temporal, no la Biblia principal de BEREA. Texto de dominio público incluido para que la lectura y la búsqueda sigan funcionando mientras RVR1960 no esté conectada.",
  },
];

/** Versión principal y predeterminada de BEREA. */
export const PRIMARY_VERSION_ID = "rvr1960";

/** Fuente técnica temporal de dominio público (no predeterminada). */
export const PUBLIC_DOMAIN_VERSION_ID = "rvr1909";

/** Mensaje único mostrado cuando falta la fuente autorizada de RVR1960. */
export const MISSING_PROVIDER_MESSAGE =
  "RVR1960 no configurada: falta conectar la fuente autorizada.";

export const getVersion = (id: string) => bibleVersions.find((v) => v.id === id);

export const publicDomainVersion = getVersion(PUBLIC_DOMAIN_VERSION_ID)!;
export const primaryVersion = getVersion(PRIMARY_VERSION_ID)!;
