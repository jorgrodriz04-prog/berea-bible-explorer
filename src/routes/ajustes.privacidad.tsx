import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/berea/app-shell";
import { Panel } from "@/components/berea/section";

export const Route = createFileRoute("/ajustes/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — BEREA" },
      { name: "description", content: "Cómo BEREA maneja tus datos: favoritos locales y sin rastreo." },
      { property: "og:title", content: "Política de privacidad — BEREA" },
      { property: "og:description", content: "Tus favoritos y ajustes se guardan en tu dispositivo." },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  const items = [
    ["Datos que guardamos", "Actualmente BEREA guarda tus favoritos y tus ajustes de lectura únicamente en tu dispositivo, mediante el almacenamiento local del navegador."],
    ["Cuentas de usuario", "No se requiere cuenta para usar la aplicación. Cuando se habilite el inicio de sesión, se solicitará el mínimo de datos necesarios y podrás eliminar tu cuenta y tus datos desde Ajustes."],
    ["Publicidad y rastreo", "BEREA no muestra publicidad ni utiliza rastreadores publicitarios."],
    ["Contenido de IA", "Cuando se active el asistente de estudio, las preguntas se enviarán al proveedor de IA únicamente para generar la respuesta y estarán limitadas al ámbito bíblico."],
    ["Contacto", "Para cualquier consulta sobre privacidad o eliminación de datos, escribe al responsable de la aplicación desde el canal de soporte publicado en la tienda."],
  ];

  return (
    <AppShell title="Privacidad" subtitle="Política de privacidad" back>
      <div className="space-y-4">
        {items.map(([title, body]) => (
          <Panel key={title}>
            <h2 className="font-display text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
