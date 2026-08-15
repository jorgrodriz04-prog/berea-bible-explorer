import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = ComponentProps<typeof Link>;

/**
 * Enlace tipado a partir de una ruta calculada en tiempo de ejecución
 * (resultados de búsqueda, referencias cruzadas, favoritos).
 */
export function AppLink({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & Omit<LinkProps, "to" | "params" | "children">) {
  return (
    <Link to={href as "/"} {...rest}>
      {children}
    </Link>
  );
}
