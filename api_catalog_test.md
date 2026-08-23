# Prueba local del catálogo API ampliado

Fecha: 2026-08-23

## Resultado de montaje

El módulo 05 monta 28 controles únicos agrupados en Movilidad, Ambiente, Servicios, Economía, Territorio, Cultura e Infraestructura. La tipografía computada del sitio es Inter, con el tema común cargado.

## Categorías montadas

Calles; Peatonal y bici; Transporte público; Ferrocarril y metro; Cables y aéreo; Naturaleza; Agua y humedales; Bosques y cobertura; Equipamientos; Educación; Salud; Cuidado y comunidad; Cívico y público; Servicios urbanos; Comercio y empleo; Alimentos y mercados; Industria y producción; Vivienda; Edificaciones; Usos del suelo; Parques y recreación; Deporte; Patrimonio y cultura; Turismo y atracciones; Memoria y monumentos; Límites y barrios; Infraestructura técnica; Mobiliario vial.

## Interacciones

Activar todo cambia los 28 botones a activos, genera 28 estados de consulta y muestra 28 elementos de resumen. Limpiar desactiva todas las categorías, aborta la consulta activa y muestra “Ninguna capa activa”. Activar únicamente Salud genera una consulta independiente y muestra su estado “cargando”.

## Manejo de disponibilidad

Las consultas Overpass pueden quedar en “falló” cuando un servidor público está saturado; el estado se muestra explícitamente y no bloquea la interfaz. El módulo conserva el fallback procedural para continuar explorando. La prueba no interpreta una caída temporal del proveedor como ausencia de la categoría.
