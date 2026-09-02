import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { Panel } from "@/components/berea/section";

export const Route = createFileRoute("/ajustes/informacion")({
  head: () => ({
    meta: [
      { title: "Información — BEREA" },
      { name: "description", content: "Qué es BEREA, su propósito de estudio bíblico y su hoja de ruta." },
      { property: "og:title", content: "Información — BEREA" },
      { property: "og:description", content: "Propósito y alcance de la aplicación BEREA." },
    ],
  }),
  component: Info,
});

function Info() {
  return (
    <AppShell title="Información" subtitle="Acerca de BEREA" back>
      <Panel>
        <h2 className="font-display text-lg font-semibold text-foreground">El nombre</h2>
        <p className="scripture mt-2 text-card-foreground">
          En Hechos 17:11 se dice de los creyentes de Berea que recibieron la palabra con toda solicitud,
          escudriñando cada día las Escrituras. Ese es el propósito de esta aplicación: estudiar, no solo
          leer.
        </p>
      </Panel>
      <Panel className="mt-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Qué incluye hoy</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• Acceso como invitado: sin registro ni inicio de sesión.</li>
          <li>• Navegación completa por los 66 libros, 1189 capítulos y 31.102 versículos.</li>
          <li>• Texto Reina-Valera 1909 (RVR1909, dominio público) incluido y disponible sin conexión.</li>
          <li>• Buscador tolerante a errores por palabra, frase, personaje, lugar, tema o doctrina.</li>
          <li>• Estudios bíblicos con contexto histórico y referencias cruzadas.</li>
          <li>• Favoritos guardados en el dispositivo.</li>
          <li>• Modo claro y oscuro, y tamaño de lectura ajustable.</li>
        </ul>
      </Panel>
      <Panel className="mt-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Próximos pasos</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• Reina-Valera 1960 (RVR1960) como versión principal, servida desde un proveedor con
            licencia autorizada. Su texto no se incluye en la aplicación.</li>
          <li>• Cuentas opcionales y sincronización de favoritos (el uso seguirá siendo posible sin cuenta).</li>
          <li>• Asistente de estudio con IA limitado al ámbito bíblico.</li>
          <li>• Empaquetado como aplicación Android.</li>
        </ul>
      </Panel>
    </AppShell>
  );
}
