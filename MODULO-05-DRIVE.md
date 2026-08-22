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

## Controles y colisiones verificadas

El motor registra `keydown` y `keyup` en la ventana: `↑`/`W` acelera, `↓`/`S` frena, y `←`/`A` y `→`/`D` giran con inercia lateral. La actualización es continua mediante `requestAnimationFrame`, no por casillas.

Las colisiones con carros, motos, buses, TransMilenio y postes aplican retroceso, pérdida de velocidad, reducción de vida y descuento de score. Al llegar a cero aparece `GAME OVER`; `R` reinicia la partida.


## Audio del juego

Metaverso incluye una pista instrumental original de fondo en `assets/bogota-infinite-drive-background.wav`. La música comienza después de la primera interacción del usuario, como exige el bloqueo de reproducción automática del navegador.

El motor sintetiza efectos ligeros de motor, aceleración, frenado y derrape mediante Web Audio API, y reproduce un impacto cuando el carro choca con tráfico u obstáculos. El botón `🔊` permite silenciar o restaurar todo el audio y el deslizador permite ajustar el volumen. La música se mantiene en loop y deja espacio de mezcla para los efectos.

## Marcador competitivo y temporizador

El HUD del modo Metaverso muestra **score**, **tiempo** y **distancia** durante la carrera. El score aumenta según la velocidad y la distancia recorrida, recibe una penalización de 100 puntos por colisiones con tráfico u obstáculos y de 250 puntos por pasar un semáforo en rojo; nunca baja de cero.

El temporizador comienza cuando el jugador acelera o cuando el vehículo alcanza una velocidad mínima, continúa mientras el carro conserva inercia y se detiene al entrar en `GAME OVER`. Al reiniciar con `R`, el score, el tiempo, la distancia y la vida vuelven a sus valores iniciales. En caso de muerte, el HUD conserva el score final para comparar el siguiente intento.

| Métrica | Regla | Visualización |
| --- | --- | --- |
| Score | Distancia recorrida a velocidad arcade, con penalizaciones por golpes | Marcador grande en puntos, con cinco dígitos |
| Tiempo | Se inicia con el movimiento y se congela en `GAME OVER` | Minutos, segundos y décimas |
| Distancia | Metros recorridos sobre las vías reales cargadas | Kilómetros con dos decimales |

Los controles de competencia son `WASD` o las flechas para conducir y `R` para reiniciar. En la verificación manual, una aceleración de prueba produjo `00014 PTS`, `00:02.8` y `0.01 km` en el HUD, confirmando que las tres métricas se actualizan juntas.
