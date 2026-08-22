# Bogotá Infinite Drive en Navegador Multiescalar

La actividad está integrada en `modulo-05.html`, la vista **Navegador Multiescalar**. El juego no se encuentra en Macromodelos: aparece como una capa de conducción sobre el mapa central de Bogotá.

> El mapa Leaflet existente es el mundo del juego. El carro se proyecta con las mismas coordenadas y la misma transformación de `vias.geojson` que usa la capa vial del navegador. El derrape usa una fuerza de dirección creciente con la velocidad y un agarre lateral variable: a mayor velocidad, más desplazamiento lateral y recuperación más lenta.

| Regla | Implementación |
| --- | --- |
| Vista | Planta, con el vehículo centrado en el mapa a color y zoom 17 de nivel calle; solo se muestran pocas cuadras. El juego se activa únicamente en Metaverso. |
| Recorrido | El carro sigue una geometría real de `vias.geojson`, alineada sobre el mapa cartográfico a color. |
| Movimiento | `W`/flecha arriba acelera; `S`/flecha abajo frena; `A-D` o flechas laterales desplazan el carro dentro del ancho de la vía. El corredor admite dos carros lado a lado. |
| Física | Aceleración, velocidad máxima, fricción y pérdida de velocidad después de una salida o impacto. En curvas cerradas el agarre lateral baja con la velocidad, aumenta la inercia y el carro recupera el derrape de forma progresiva. |
| Colisiones | El vehículo no atraviesa el obstáculo: se detiene, pierde velocidad y se descuenta una vida. Motos y ciclistas tienen impactos diferenciados. |
| Vida | Tres vidas representadas en el HUD; al llegar a cero la ruta se detiene. |
| Reinicio | `R` restablece distancia, velocidad y vidas. |
| Tráfico | Carros, TransMilenio, SITP, motos y ciclistas circulan continuamente; los ciclistas se ubican en el borde/ciclovía y las motos usan posiciones laterales de carril. Los carros usan posiciones paralelas separadas. |
| Cámara | El mapa usa zoom 17 y se centra continuamente en el carro mientras avanza por la ruta; al activar Metaverso el canvas se redimensiona y redibuja la escena. |
| Mundo | La ruta se mantiene activa y el mapa se redibuja alrededor del carro conforme avanza. |

Los archivos principales son `modulo-05-drive.js`, que controla la simulación y el render del vehículo, `modulo-05.js`, que expone el mapa Leaflet y carga la red vial, `modulo-05.html`, que contiene el overlay dentro del mapa, y `modulo-05-polish.css`, que contiene el HUD arcade.

## Ejecución local

Desde la carpeta del repositorio se puede abrir `modulo-05.html` mediante un servidor estático, por ejemplo `python3 -m http.server 4173`, y visitar `http://localhost:4173/modulo-05.html`. Es importante utilizar un servidor HTTP porque el navegador bloquea la carga de `vias.geojson` cuando se abre el archivo directamente con `file://`.
