# Auditoría técnica de BEREA (estado actual, sin cambios aplicados)

## 1. Funcionando

**Acceso sin cuenta (invitado)**
- No existe ninguna pantalla de login ni guard de rutas; `__root.tsx` monta directamente los proveedores locales de ajustes y favoritos. Todas las secciones (Inicio, Biblia, Buscar, Estudios, Favoritos, Ajustes) se abren sin registro.
- Favoritos (`berea.favorites.v1`) y ajustes (`berea.settings.v1`) se guardan en el dispositivo, con protección ante almacenamiento no disponible y sin escritura antes de leer (bandera `ready`).

**Integridad del texto bíblico incluido**
- Verificado por conteo directo: 66 libros, 1189 capítulos, 31.102 versículos, 0 capítulos vacíos y 0 versículos vacíos.
- Ese texto es Reina-Valera 1909 real (ortografía antigua: "fué", "JEHOVA", "á"), correctamente identificado.

**Diferenciación de versiones**
- Registro de versiones con RVR1960 como versión principal declarada y RVR1909 como texto incluido de dominio público.
- Predeterminada efectiva: RVR1909. Al elegir RVR1960 el lector consulta al proveedor y, si no hay proveedor, muestra aviso y NO sustituye el texto: no se muestra RVR1909 bajo etiqueta RVR1960.
- Proveedor licenciado: **no configurado** (no existen las variables `BEREA_BIBLE_API_URL` / `BEREA_BIBLE_API_KEY` / `BEREA_BIBLE_VERSION_CODE`). El puente está listo pero inactivo, lo cual es el comportamiento esperado.

**Buscador y carga diferida**
- Índice unificado de libros, personajes, lugares, acontecimientos, temas, términos, costumbres, leyes y estudios, con puntuación difusa y agrupación por categoría, más atajo de referencia ("Juan 3:16").
- La búsqueda de versículos recorre la Biblia completa cargando un archivo por libro de forma diferida, sin penalizar el arranque.

**Conocimiento, estudios y referencias cruzadas**
- Auditadas 274 referencias de personajes, lugares, acontecimientos, temas, términos, costumbres, leyes y estudios: **0 referencias rotas**.
- 12 entradas de referencias cruzadas con 38 pasajes relacionados: **0 sin resolver**.
- Separación explícita de capas (texto bíblico / contexto histórico / interpretación) y atribución de fuentes en cada ficha.
- `askBibleQuestion` no inventa: construye contexto solo con datos existentes y declara "insuficiente" cuando no hay evidencia. No hay modelo de IA conectado (esperado).

**Navegación y compilación**
- Navegación real por URL, barra inferior y botón Atrás propio conectado al historial del router (compatible con el botón Atrás de Android).
- Build actual: **OK**. Sin errores de runtime ni de consola registrados.

## 2. Problemas encontrados

**P1 — Crítico (riesgo legal y de exactitud): los versículos "de muestra" no son RVR1909**
El archivo de contenido curado se declara "Reina-Valera 1909 (dominio público). No es RVR1960", pero su redacción es la moderna, coincidente con RVR1960:

```text
curado:   "Y dijo Dios: Sea la luz; y fue la luz."
RVR1909:  "Y dijo Dios: Sea la luz: y fué la luz."
curado:   "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús."
RVR1909:  "AHORA pues, ninguna condenación hay ... mas conforme al espíritu."
curado:   "Jehová es mi pastor; nada me faltará."
RVR1909:  "JEHOVA es mi pastor; nada me faltará."
```

Impacto: ese texto es el que alimenta el "Versículo del día" del Inicio, el texto de las referencias en fichas y referencias cruzadas, y los pasajes que recupera `askBibleQuestion`. Es decir, se está mostrando texto que probablemente corresponde a una versión con derechos vigentes, con etiqueta de dominio público, y además incompleto (versículos salteados dentro del mismo capítulo, p. ej. Génesis 1 pasa del 8 al 26).

**P2 — Alto: cobertura de `verseText` limitada a 29 capítulos curados**
La función que devuelve el texto de una referencia solo consulta el contenido curado, no la Biblia completa. Consecuencia: la mayoría de referencias válidas devuelven vacío, y el contexto que recibiría la IA queda artificialmente pobre; puede producir respuestas incompletas o "insuficiente" cuando el texto sí existe en la aplicación.

**P3 — Medio: incoherencia entre versión elegida y texto auxiliar**
El Inicio, las fichas y las referencias cruzadas muestran texto sin tener en cuenta la versión seleccionada ni mostrar su etiqueta; solo el lector de capítulo es consciente de la versión.

**P4 — Bajo: dos fuentes de verdad para el texto bíblico**
Coexisten el contenido curado y el texto completo por libro, con reglas distintas de disponibilidad. Mientras existan las dos, cualquier corrección debe aplicarse dos veces.

**P5 — Bajo: cobertura de conocimiento aún pequeña**
20 personajes, 12 lugares, 9 acontecimientos, 10 temas, 10 términos, 10 costumbres, 5 leyes, 6 estudios y 12 grupos de referencias cruzadas. Todo correcto, pero insuficiente para un estudio profundo de toda la Biblia.

## 3. Pendiente

- Eliminar o reemplazar el contenido curado por lectura del texto completo RVR1909, para que no exista texto de procedencia dudosa.
- Unificar la obtención de texto de una referencia sobre la Biblia completa (con carga diferida) para Inicio, fichas, referencias cruzadas y contexto de IA.
- Mostrar la versión activa donde se cite texto fuera del lector.
- Conectar el proveedor con licencia (variables de entorno) cuando exista contrato para RVR1960.
- Conectar un modelo de IA al contexto ya construido y ampliar el cerebro de conocimiento.

## 4. Prioridad recomendada

| Prioridad | Acción |
| --- | --- |
| 1 | P1: retirar el texto curado mal etiquetado y servir esos pasajes desde el RVR1909 completo |
| 2 | P2: `verseText` (y el contexto de IA) sobre la Biblia completa |
| 3 | P3: etiqueta de versión en todo lugar donde se cite texto |
| 4 | P4: una sola fuente de verdad del texto bíblico |
| 5 | P5 + IA + proveedor licenciado: ampliación de contenido e integraciones |

No se modificó ningún archivo. Si apruebas, el siguiente paso sería un plan de corrección empezando por P1 y P2.
