# REORG: Reorganización propuesta del repositorio

He creado una estructura inicial de carpetas y documentación para reorganizar el proyecto siguiendo la arquitectura: frontend, backend, data, apis.

Objetivo

- Proveer una estructura clara donde mover los archivos existentes (copiarlos o moverlos con un PR posterior).
- Evitar cambios automáticos en archivos de producción; en esta primera tarea se añaden solo READMEs y un esqueleto OpenAPI para facilitar la migración.

Estructura creada

- frontend/  -> HTML, CSS, JS, assets frontend (páginas, demos y módulos de UI)
- backend/   -> Código del servidor (Python, Node, etc.), scripts de procesamiento
- data/      -> Geodatos, geojson, shapefiles, datasets y derivados
- apis/      -> Contratos de APIs, documentación OpenAPI

Sugerencia de mapeo (archivos actuales -> destino recomendado)

- frontend:
  - index.html, demo.html, modulo-02.html ... modulo-08.html
  - style.css, modulo-02.css, modulo-03.css, demo.css, network06-shared.css, etc.
  - scripts.js, modulo-02.js, modulo-03.js, modulo-04.js, modulo-05.js, modulo-06.js, modulo-07.js, modulo-08.js
  - assets/ (imágenes y recursos estáticos usados por las páginas)

- backend:
  - apply_module02_overlay.py
  - cualquier script server-side o procesadores futuros

- data:
  - todos los archivos .geojson, .GEOJSON, capas (barrios_bogota.geojson, upz.geojson, red_eep.geojson, etc.)
  - M_dulo_07___REDSEG_N_EL_POT.pdf y otros recursos de datos

- apis:
  - OpenAPI / documentación de endpoints (a agregar cuando se diseñen APIs)

Próximos pasos recomendados

1. Revisar el REORG.md y los READMEs creados.
2. Crear un Pull Request en la rama reorg/frontend-backend-data-apis que:
   - Mueva (git mv) o copie los archivos listados al directorio correspondiente.
   - Actualice referencias relativas en HTML/CSS/JS si se cambian rutas.
3. Ejecutar pruebas locales (abrir frontend/index.html) y verificar que las rutas a assets permanecen correctas.
4. Si hay componentes server-side, crear un README con instrucciones para ejecutar el backend.

Notas

- No se han modificado ni eliminado archivos existentes: sólo se han añadido documentos de organización y un esqueleto OpenAPI.
- Si quieres que haga el movimiento automático (copiar archivos concretos a sus nuevas ubicaciones y ajustar rutas), confirma y lo hago en la misma rama; ten en cuenta que haré copias (no borraré los originales) para mayor seguridad, y actualizaré los HTML referentes cuando sea necesario.

Fecha: 2026-08-23
Autor del commit: Copilot
