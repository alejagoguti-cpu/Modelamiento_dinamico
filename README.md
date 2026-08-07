# Modelamiento_dinamico


RAPOT


RAPOT es una plataforma experimental de análisis relacional diseñada para desmontar, visualizar y cuestionar el modelo de ciudad contenido en el Plan de Ordenamiento Territorial —POT—.

En lugar de leer el POT únicamente como un inventario de normas, conceptos, estructuras y actuaciones, RAPOT lo representa como un sistema de relaciones.

Su pregunta central es:

> ¿Qué modelo de ciudad aparece cuando dejamos de leer el POT como un conjunto de elementos independientes y comenzamos a analizar las relaciones entre ellos?



La plataforma transforma información documental en una red interactiva que posteriormente puede medirse, compararse, cuestionarse y modificarse mediante ocho módulos de análisis.


---

01. Objetivo

RAPOT busca convertir el POT en un modelo relacional explorable.

El sistema permite pasar de:

Documento → Conceptos → Relaciones → Red → Métricas → Contradicciones → Patrones → Ausencias → Comparaciones → Simulaciones → Modelo alternativo

La red constituye el objeto central de análisis durante toda la aplicación.

Por esta razón, en todos los módulos RAPOT mantiene la red en el centro de la interfaz, mientras que indicadores, filtros, evidencias y herramientas funcionan como capas de lectura sobre ella.


---

02. Problema

Un documento de ordenamiento puede declarar determinados elementos como fundamentales para la ciudad.

Sin embargo, esto no necesariamente significa que esos mismos elementos ocupen una posición estructuralmente importante dentro del sistema de relaciones que el propio documento construye.

RAPOT permite investigar preguntas como:

¿Qué conceptos están realmente conectados?

¿Cuáles son estructuralmente centrales?

¿Qué elementos funcionan como puentes?

¿Qué elementos permanecen aislados?

¿Coincide lo que el POT declara importante con lo que su estructura relacional muestra?

¿Qué contradicciones aparecen?

¿Qué elementos aparentemente secundarios resultan estratégicos?

¿Qué grandes modelos de pensamiento urbano pueden estar detrás del POT?

¿Qué actores, procesos o dinámicas quedan fuera de su representación?

¿Cómo cambia el sistema cuando se modifica una relación?

¿Qué comportamientos emergen?

¿Qué modelo alternativo de ciudad podría construirse?



---

03. Principio fundamental

RAPOT diferencia siempre entre:

DATO

Información obtenida directamente de documentos o bases cargadas.

CÁLCULO

Resultado producido mediante operaciones sobre la red.

INFERENCIA

Interpretación derivada de evidencias y patrones.

HIPÓTESIS

Escenario introducido por el usuario para explorar una modificación.

Esto es fundamental porque RAPOT no pretende convertir una interpretación en un hecho.

Por ejemplo, el sistema no debería afirmar:

> “El POT es un modelo ambiental.”



Puede indicar:

> “Se identificó un patrón compatible con una influencia ambiental, sustentado por estas evidencias documentales y relaciones. Nivel de certeza: alto.”




---

04. Arquitectura conceptual

La unidad fundamental de RAPOT es el grafo.

Nodo

Representa un concepto.

Ejemplos:

Humedal

Movilidad sostenible

Biodiversidad

Vivienda

Gestión del agua

Espacio público

Arista

Representa una relación entre dos conceptos.

RAPOT contempla inicialmente cuatro tipos:

Directa — A modifica, determina o produce un efecto inmediato sobre B.

Indirecta — A afecta B mediante uno o varios intermediarios.

Soporte — A proporciona condiciones necesarias para que B funcione.

Resiliencia — La relación entre A y B incrementa la capacidad del sistema para resistir, adaptarse o recuperarse.


---

05. Las cuatro estructuras del POT

Los conceptos pueden clasificarse inicialmente según las estructuras definidas para el análisis:

EEP — Estructura Ecológica Principal

EFS — Estructura Funcional y de Servicios

ESE — Estructura Socioeconómica y Espacial

EAG — Estructura Administrativa y de Gestión

Cada estructura posee una identidad visual diferente dentro de la red.


---

06. Flujo general de RAPOT

FUENTES
   ↓
CONCEPTOS
   ↓
RELACIONES
   ↓
RED POT
   ↓
ANÁLISIS
   ↓
INTERPRETACIÓN
   ↓
SIMULACIÓN
   ↓
PROPUESTA

El proyecto está organizado en 8 módulos.


---

MÓDULO 01 — CONSTRUIR LA RED

Pregunta

> ¿Cómo se relacionan los elementos que conforman el modelo de ciudad?



Es el punto de entrada al sistema.

El usuario carga información proveniente de fuentes documentales y una base de conceptos.

RAPOT identifica relaciones potenciales entre los conceptos y construye el grafo.

Entradas

Concepto

Estructura

Fuente

Fragmento documental

Concepto relacionado

Tipo de relación

Justificación


Salida

Una red interactiva.

Controles

El usuario puede activar o desactivar:

EEP

EFS

ESE

EAG

Relaciones directas

Relaciones indirectas

Relaciones de soporte

Relaciones de resiliencia


También puede buscar y seleccionar nodos individuales.

Regla

Toda relación debe conservar trazabilidad hacia su fuente.


---

MÓDULO 02 — MEDIR LA RED

Aquí la red deja de ser únicamente visual.

RAPOT calcula dos variables principales.

Variable A — Conectividad

> ¿Cuántas relaciones tiene cada nodo?



Variable B — Centralidad

> ¿Qué tan importante resulta un nodo dentro del conjunto de la red?



A partir de ellas, RAPOT puede clasificar nodos como:

🟢 Nodo central

Presenta alta conectividad y/o importancia estructural.

🟡 Nodo puente

Conecta sectores o comunidades diferentes de la red.

🔵 Nodo periférico

Presenta pocas conexiones y baja integración.

🔴 Nodo aislado

Tiene una integración mínima o inexistente.

La pregunta que responde es:

> ¿Qué elementos son realmente centrales cuando dejamos de mirar el POT como inventario y comenzamos a observarlo como sistema?



Exploración de perturbaciones

El usuario dispone de controles del tipo:

¿Qué pasaría si...?

Puede seleccionar:

Nodo ▼

Acción ▼

Nodo relacionado ▼

Por ejemplo:

> ¿Qué pasaría si se apaga el nodo “Humedal”?



RAPOT recalcula la red y permite comparar:

ANTES ↔ DESPUÉS

Esto permite observar cambios en conectividad, centralidad y estructura.


---

MÓDULO 03 — DISCURSO VS REALIDAD

Este módulo compara dos variables.

Variable A — Importancia discursiva

> ¿Qué tanto énfasis recibe un concepto dentro del POT?



Puede considerar criterios documentales previamente definidos, como presencia, jerarquía, objetivos asociados o relevancia normativa.

Variable B — Importancia estructural

> ¿Qué tan importante resulta ese concepto dentro de la red?



Esta variable reutiliza resultados del módulo 02.

RAPOT genera una matriz de cuatro cuadrantes:

	Estructural baja	Estructural alta

Discursiva alta	⚠️ Contradicción	🟢 Coherencia
Discursiva baja	⚪ Periférico	🔥 Elemento oculto


Ejemplo conceptual

Si el POT presenta la Estructura Ecológica Principal como un elemento fundamental del modelo territorial, pero la red muestra una integración estructural comparativamente baja, RAPOT identifica una brecha.

No concluye automáticamente que el POT esté equivocado.

Indica:

> Alta importancia discursiva + baja importancia estructural = posible contradicción.



El usuario puede seleccionar:

¿POR QUÉ?

Y RAPOT muestra las relaciones, métricas y evidencias que produjeron el resultado.


---

MÓDULO 04 — MACROMODELOS

Pregunta central

> ¿Qué macromodelos pueden estar detrás del modelo de ciudad que propone el POT?



El POT no surge de manera aislada.

Puede estar relacionado con:

instituciones

equipos técnicos

disciplinas

marcos jurídicos

modelos económicos

paradigmas ambientales

intereses sociales

formas históricas de comprender la ciudad


Por ello RAPOT permite explorar posibles influencias predominantes.

Variable A — Evidencia documental

¿Qué elementos documentales sustentan una determinada interpretación?

Variable B — Patrón relacional

¿La organización de la red presenta relaciones compatibles con esa interpretación?

Macromodelos explorables

La taxonomía debe ser configurable.

Por ejemplo:

🌱 Ambiental

💰 Económico

⚖️ Jurídico-institucional

⚙️ Tecnocrático

👥 Comunitario

🏗️ Desarrollista

El sistema sigue una cadena explícita:

EVIDENCIA
   ↓
RELACIONES
   ↓
PATRÓN
   ↓
INTERPRETACIÓN
   ↓
NIVEL DE CERTEZA

Certeza

🟢 Alta

🟡 Media

🔴 Baja

El nivel de certeza permite diferenciar una interpretación fuertemente sustentada de una hipótesis débil.

Controles principales

Fuente documental ▼

Macromodelo a explorar ▼

Nivel de certeza ▼

Tipo de evidencia ▼

Visualizar en la red ▼

Modo de análisis ▼

Comparar macromodelos ▼

La red permanece siempre en el centro.


---

MÓDULO 05 — LO QUE NO ESTÁ

RAPOT cambia aquí la pregunta.

Ya no pregunta solamente:

> ¿Qué contiene el POT?



Pregunta:

> ¿Qué dimensiones de la realidad territorial quedan ausentes o subrepresentadas dentro del modelo?



Para ello compara:

Variable A

Representación en el POT