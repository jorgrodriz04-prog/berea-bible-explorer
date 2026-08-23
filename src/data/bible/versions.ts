/**
 * Registro de versiones bíblicas de BEREA.
 *
 * Regla de licencias (no negociable):
 * - Solo se incluye texto dentro del proyecto cuando es de dominio público.
 * - Una versión con derechos vigentes (p. ej. Reina-Valera 1960, © Sociedades
 *   Bíblicas Unidas) NUNCA se copia ni se genera aquí: se sirve desde un
 *   proveedor con licencia autorizada, configurado por variables de entorno.
 * - Si el proveedor no está configurado, la versión aparece como no disponible
 *   y BEREA no sustituye su texto por otro: eso evitaría confundir al lector.
 */

export type BibleVersionDelivery = "incluido" | "proveedor-licenciado";

export interface BibleVersion {
  id: string;
  /** Nombre completo mostrado en fichas y metadatos. */
  name: string;
  /** Etiqueta corta para chips y encabezados. */
  label: string;
  year: number;
  /** Cómo llega el texto a la aplicación. */
  delivery: BibleVersionDelivery;
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
    license: "© Sociedades Bíblicas Unidas. Requiere licencia de distribución.",
    note:
      "Versión principal de BEREA. Su texto no se almacena en la aplicación: se solicita a un proveedor con licencia autorizada.",
  },
  {
    id: "rvr1909",
    name: "Reina-Valera 1909",
    label: "RVR1909",
    year: 1909,
    delivery: "incluido",
    license: "Dominio público.",
    note:
      "Texto completo incluido en la aplicación y disponible sin conexión. Su ortografía es antigua (á, fué) porque se conserva sin alteraciones.",
  },
];

/** Versión principal declarada de BEREA. */
export const PRIMARY_VERSION_ID = "rvr1960";

/** Versión usada cuando la principal no tiene proveedor con licencia activo. */
export const PUBLIC_DOMAIN_VERSION_ID = "rvr1909";

export const getVersion = (id: string) => bibleVersions.find((v) => v.id === id);

export const publicDomainVersion = getVersion(PUBLIC_DOMAIN_VERSION_ID)!;
export const primaryVersion = getVersion(PRIMARY_VERSION_ID)!;
