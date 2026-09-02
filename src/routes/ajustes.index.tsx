import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Info, Moon, Shield, Sparkles, Sun, Trash2, Type, UserRound } from "lucide-react";
import { AppShell } from "@/components/berea/app-shell";
import { Panel, SectionTitle } from "@/components/berea/section";
import { useSettings, type ThemeMode } from "@/lib/settings";
import { useFavorites } from "@/lib/favorites";
import { AI_SCOPE_RULES } from "@/lib/ai";
import { bibleVersions } from "@/data/bible/versions";

export const Route = createFileRoute("/ajustes/")({
  head: () => ({
    meta: [
      { title: "Ajustes — BEREA" },
      {
        name: "description",
        content: "Configura el tema claro u oscuro, el tamaño de la lectura y consulta la información de BEREA.",
      },
      { property: "og:title", content: "Ajustes — BEREA" },
      { property: "og:description", content: "Tema, tamaño de texto, privacidad y cuenta." },
    ],
  }),
  component: AjustesPage,
});

const themes: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Oscuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Info },
];

const scales = [
  { value: 0.9, label: "A" },
  { value: 1, label: "A" },
  { value: 1.15, label: "A" },
  { value: 1.3, label: "A" },
];

function AjustesPage() {
  const { theme, setTheme, fontScale, setFontScale, versionId, setVersionId } = useSettings();
  const { favorites, clear } = useFavorites();

  return (
    <AppShell title="Ajustes" subtitle="Apariencia, lectura y cuenta">
      <SectionTitle>Versión bíblica</SectionTitle>
      <Panel>
        <ul className="space-y-2">
          {bibleVersions.map((v) => {
            const selected = v.id === versionId;
            const needsProvider = v.delivery === "proveedor-licenciado";
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setVersionId(v.id)}
                  className={`no-tap-highlight w-full rounded-xl border p-3 text-left ${
                    selected ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{v.name}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {v.label}
                    </span>
                    {needsProvider ? (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold">
                        Requiere fuente autorizada
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">{v.note}</span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">{v.license}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="mt-6">
      <SectionTitle>Apariencia</SectionTitle>

      <Panel>
        <div className="grid grid-cols-3 gap-2">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={`no-tap-highlight flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold ${
                theme === value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>
      </Panel>
      </div>



      <div className="mt-6">
        <SectionTitle>Tamaño del texto bíblico</SectionTitle>
        <Panel>
          <div className="flex items-center gap-2">
            <Type className="size-5 shrink-0 text-muted-foreground" />
            <div className="grid flex-1 grid-cols-4 gap-2">
              {scales.map((s, i) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFontScale(s.value)}
                  className={`no-tap-highlight min-h-12 rounded-xl border font-display font-semibold ${
                    fontScale === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                  style={{ fontSize: `${0.85 + i * 0.15}rem` }}
                  aria-label={`Tamaño ${i + 1}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="scripture mt-4 border-t border-border pt-3 text-card-foreground">
            Jehová es mi pastor; nada me faltará.
          </p>
        </Panel>
      </div>

      <div className="mt-6">
        <SectionTitle>Estudio con IA</SectionTitle>
        <Panel className="border-dashed">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Próximamente</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {AI_SCOPE_RULES.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <SectionTitle>Aplicación</SectionTitle>
        <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <li className="border-b border-border">
            <Link to="/ajustes/informacion" className="no-tap-highlight flex min-h-14 items-center gap-3 px-4">
              <Info className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 font-semibold text-foreground">Información de BEREA</span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </Link>
          </li>
          <li className="border-b border-border">
            <Link to="/ajustes/privacidad" className="no-tap-highlight flex min-h-14 items-center gap-3 px-4">
              <Shield className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 font-semibold text-foreground">Política de privacidad</span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </Link>
          </li>
          <li className="flex min-h-14 items-center gap-3 px-4">
            <UserRound className="size-5 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">Cuenta — modo invitado</span>
              <span className="block text-xs text-muted-foreground">
                Estás usando BEREA como invitado: no hace falta registrarse. El inicio de sesión será
                opcional y solo servirá para sincronizar favoritos entre dispositivos.
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <SectionTitle>Datos locales</SectionTitle>
        <Panel>
          <p className="text-sm text-muted-foreground">
            Tus {favorites.length} favorito(s) se guardan en este dispositivo. Al habilitar cuentas se
            sincronizarán con tu perfil.
          </p>
          <button
            type="button"
            onClick={clear}
            className="no-tap-highlight mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-destructive/40 px-4 text-sm font-semibold text-destructive"
          >
            <Trash2 className="size-4" />
            Borrar favoritos
          </button>
        </Panel>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">BEREA · versión 1.0</p>
    </AppShell>
  );
}
