# BEREA: Your Bible Study Guide

Quiero crear una aplicación web móvil llamada BEREA, enfocada exclusivamente en el estudio de la Biblia.



BEREA debe ser una aplicación moderna, rápida, limpia y especialmente diseñada para utilizarse desde teléfonos Android, pero también debe funcionar correctamente en computadora.



OBJETIVO PRINCIPAL



La aplicación debe ayudar al usuario a estudiar la Biblia de manera profunda y sencilla. No quiero que sea solamente un lector de versículos. Debe permitir buscar palabras, frases, personajes, lugares, acontecimientos, doctrinas y temas bíblicos, y conectar esa búsqueda con el contenido correspondiente.



DISEÑO



- Interfaz moderna y profesional.

- Diseño mobile-first.

- Navegación sencilla para personas que no tienen conocimientos técnicos.

- Modo claro y modo oscuro.

- Barra de navegación inferior en teléfonos.

- Tipografía clara y cómoda para leer.

- Botones grandes y fáciles de tocar.

- Diseño preparado para convertirse posteriormente en una aplicación Android.

- Utilizar correctamente las áreas seguras de la pantalla.

- Evitar desplazamientos y comportamientos incómodos propios de páginas web dentro de un teléfono.

- Las pantallas deben tener navegación real mediante rutas/URLs, no solamente estados internos, para que el botón Atrás de Android funcione correctamente.



ESTRUCTURA PRINCIPAL



Crear inicialmente estas secciones:



1. INICIO

2. BIBLIA

3. BUSCAR

4. ESTUDIOS

5. FAVORITOS

6. AJUSTES



BIBLIA



Crear una sección para navegar por:



- Antiguo Testamento.

- Nuevo Testamento.

- Libros bíblicos.

- Capítulos.

- Versículos.



La navegación debe ser sencilla y permitir pasar de un libro a otro y de un capítulo a otro.



BUSCADOR



El buscador es una de las funciones más importantes de BEREA.



Debe permitir buscar:



- Una palabra.

- Una frase completa.

- Un personaje.

- Un lugar.

- Un acontecimiento.

- Un tema.

- Una doctrina.

- Un concepto bíblico.



La búsqueda NO debe depender únicamente de coincidencias exactas.



Por ejemplo, búsquedas como:



"Juda"

"Leviatán"

"Jericó"

"Eva"

"Adán"

"las diez vírgenes"

"fe"

"perdón"

"pacto"

"salvación"



deben poder encontrar contenido relacionado cuando corresponda.



Los resultados deben organizarse claramente y permitir entrar al contenido encontrado.



ESTUDIOS



Crear una sección para estudios bíblicos organizados por temas.



Cada estudio debe poder contener:



- Título.

- Introducción.

- Textos bíblicos relacionados.

- Explicación.

- Contexto histórico y cultural cuando sea necesario.

- Personajes relacionados.

- Lugares relacionados.

- Referencias bíblicas relacionadas.

- Conclusión.



La arquitectura debe permitir agregar muchos estudios posteriormente sin tener que modificar manualmente la aplicación.



FAVORITOS



El usuario debe poder guardar:



- Versículos.

- Estudios.

- Temas.

- Resultados de búsqueda.

- Respuestas o explicaciones generadas posteriormente por IA.



Los favoritos deben permanecer guardados correctamente.



AJUSTES



Crear una sección de ajustes con opciones para:



- Modo claro/oscuro.

- Tamaño de texto para lectura.

- Información de la aplicación.

- Política de privacidad.

- Cuenta y eliminación de cuenta cuando posteriormente se implemente autenticación.



ARQUITECTURA



Construir la aplicación de manera modular y escalable.



No crear una aplicación con contenido fijo directamente dentro de cada componente.



Preparar una estructura de datos que permita posteriormente incorporar:



- Libros bíblicos.

- Capítulos.

- Versículos.

- Personajes.

- Lugares.

- Temas.

- Estudios.

- Referencias cruzadas.

- Comentarios.

- Favoritos.

- Usuarios.



La aplicación debe estar preparada para conectar posteriormente una base de datos y servicios externos.



IMPORTANTE SOBRE IA



Más adelante quiero integrar una función de inteligencia artificial para que el usuario pueda hacer preguntas sobre temas bíblicos.



La IA debe estar limitada al ámbito bíblico y servir como herramienta de estudio.



NO implementar todavía una conexión de IA si eso requiere configurar claves o servicios externos. Primero construye correctamente la arquitectura de la aplicación y deja preparada la estructura para integrar esa función posteriormente.



IMPORTANTE



No quiero solamente una página de presentación.



Quiero que construyas una aplicación funcional con navegación entre las diferentes secciones, componentes reutilizables y una arquitectura preparada para crecer.



Antes de implementar funcionalidades avanzadas, prioriza:



1. Arquitectura.

2. Navegación.

3. Diseño móvil.

4. Lectura bíblica.

5. Buscador.

6. Estudios.

7. Favoritos.

8. Preparación para base de datos e IA.



La aplicación debe llamarse BEREA y mostrar ese nombre claramente en la interfaz.



Construye esta primera versión de BEREA con una apariencia profesional, bíblica, moderna y sencilla.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e998758c-5504-4bce-b7ff-5254e411439e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
