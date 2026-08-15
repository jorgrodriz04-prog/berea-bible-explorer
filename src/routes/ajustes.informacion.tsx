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
          <li>• Navegación completa por los 66 libros, capítulos y versículos.</li>
          <li>• Buscador tolerante a errores por palabra, frase, personaje, lugar, tema o doctrina.</li>
          <li>• Estudios bíblicos con contexto histórico y referencias cruzadas.</li>
          <li>• Favoritos guardados en el dispositivo.</li>
          <li>• Modo claro y oscuro, y tamaño de lectura ajustable.</li>
        </ul>
      </Panel>
      <Panel className="mt-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Próximos pasos</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• Texto bíblico completo desde base de datos.</li>
          <li>• Cuentas de usuario y sincronización de favoritos.</li>
          <li>• Asistente de estudio con IA limitado al ámbito bíblico.</li>
          <li>• Empaquetado como aplicación Android.</li>
        </ul>
      </Panel>
    </AppShell>
  );
}
