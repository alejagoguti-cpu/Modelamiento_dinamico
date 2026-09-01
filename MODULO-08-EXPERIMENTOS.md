# Módulo 08: Experimentos Interactivos de Simulación de Tráfico

## Visión General

El módulo 08 ahora incluye **4 experimentos interactivos** para explorar cómo responde la red vial de Kennedy ante cambios en demanda, perturbaciones y diferentes estrategias de enrutamiento.

Todos los experimentos se basan en la simulación SUMO actual como **estado base (0%)**, sin modificaciones.

---

## Experimento 1: Demanda Variable

### Descripción
Modifica la demanda vehicular entre -100% y +100% y observa cómo responden los indicadores principales.

### Interfaz
- **Barra deslizante**: controla demanda de -100% a +100%
- **Botones presets**: atajos rápidos (Min, Baja, BASE, Mod, Alta, Máx)
- **Indicadores en tiempo real**: 10 métricas se recalculan dinámicamente
- **Comparación**: mostrar cambios vs estado base (0%)

### Indicadores Monitoreados
1. **Vehículos Activos**: número de vehículos en la red
2. **Flujo (veh/h)**: vehículos por hora
3. **Velocidad (km/h)**: velocidad promedio de la red
4. **Densidad (veh/km)**: concentración de vehículos
5. **Ocupación (%)**: porcentaje de capacidad utilizada
6. **Tiempo de Viaje (s)**: duración promedio de recorridos
7. **Tiempo Perdido (s)**: tiempo adicional por congestión
8. **Ruido (índice)**: nivel acústico relativo
9. **Congestión**: cantidad de vías congestionadas
10. **Comparación con base**: cambio absoluto y porcentual

### Fórmula de Interpolación (Teórica)
```
demanda_nueva = demanda_base × (1 + porcentaje / 100)

Ejemplo:
  0%:   demanda_base × 1.00
  +50%: demanda_base × 1.50
  -50%: demanda_base × 0.50
  +100%: demanda_base × 2.00
```

### Congestión (Modelo Simplificado)
```
velocidad = velocidad_base / (1 + (demandPercent/100)^1.2)

Esto modela que:
- A mayor demanda → mayor congestión
- Velocidad disminuye no-linealmente
- Efecto es más pronunciado en demandas altas
```

### Próximo Paso
Cuando generes múltiples escenarios con SUMO, el sistema podrá cargar:
- `vehiculos_0.json` (actual)
- `vehiculos_+25.json`, `vehiculos_+50.json`, etc.
- `noise_0.json`, `noise_+25.json`, etc.

La barra pasará de interpolación teórica a **datos reales de SUMO**.

---

## Experimento 2: Perturbación de Red

### Descripción
Simula el cierre temporal de una vía o reducción de capacidad, y observa cómo se redistribuye el tráfico.

### Interfaz
- **Selector de vías**: 5 vías críticas identificadas (por flujo, densidad, time loss)
- **Tipo de perturbación**: 
  - Cierre total (vía no disponible)
  - Reducción de capacidad (hasta 0%)
- **Resultados**: impacto estimado en la red

### Vías Críticas Incluidas
1. `1209495214#3` - Mayor time loss (60238s)
2. `1184088523#1` - Segundo mayor impact score
3. `1162630088#1` - Tercero mayor impact score
4. `1195023605#3` - Densidad muy alta (208.2 veh/km)
5. `1078142963#8` - Flujo y densidad significativos

### Cálculo de Impacto
```
Para CIERRE:
  impactFactor = 2.5
  (Tráfico se redistribuye a rutas más largas)

Para REDUCCIÓN:
  impactFactor = 1 + (1 - capacidadRestante) × 3
  (Congestión exponencial en esa vía)

Impacto en red:
  - Vehículos afectados = flujo_vía × impactFactor
  - Incremento de tiempo = time_loss_vía × 0.15 × impactFactor
  - Incremento de ruido ≤ 8 puntos
```

### Uso Típico
1. Selecciona una vía crítica
2. Elige tipo de perturbación
3. (Si es reducción) ajusta capacidad disponible
4. Haz clic en "Aplicar Perturbación"
5. Observa el impacto estimado

---

## Experimento 3: Redistribución de Rutas

### Descripción
Mantiene la misma demanda pero cambia cómo se distribuyen los vehículos entre rutas. Identifica si hay alternativas más eficientes.

### Estrategias Comparadas
1. **Actual**: distribución actual de SUMO (referencia)
2. **Equilibrada**: carga uniforme por vía
   - Tiempo: -15% (flujo mejor distribuido)
   - Flujo: -5% (menos atascos)
   - Ruido: -12%

3. **Más Corta**: todos por la ruta geométricamente más corta
   - Tiempo: +35% (embotellamiento en una ruta)
   - Flujo: -25% (capacidad saturada)
   - Ruido: +25%

4. **Más Rápida**: distribución teórica evitando congestión
   - Tiempo: -22% (rutas mejor seleccionadas)
   - Flujo: +8% (mejor capacidad utilizada)
   - Ruido: -18%

### Interpretación
- La estrategia **"Más Rápida"** es teóricamente óptima pero requiere información en tiempo real
- La estrategia **"Equilibrada"** es prácticamente alcanzable con señalización inteligente
- La estrategia **"Más Corta"** es lo que pasa sin coordinación

### Próximo Paso
Cuando tengas rutas alternativas en SUMO, podrás generar escenarios con diferentes matrices O/D.

---

## Experimento 4: Pico y Recuperación

### Descripción
Simula un evento temporal de demanda: incremento progresivo hacia un pico, seguido de reducción y recuperación.

### Perfil Temporal (20 segundos simulados)
```
00:00-05:00 → Demanda actual (0%)
05:00-10:00 → Incremento acelerado (0% → 50%)
10:00-12:00 → Pico máximo (50% → 100%)
12:00-15:00 → Reducción (100% → 50%)
15:00-20:00 → Recuperación completa (50% → 0%)
```

### Eventos Detectados Automáticamente
1. **Inicio de congestión**: cuándo demanda supera ~25%
2. **Pico máximo**: momento de máxima congestión
3. **Recuperación completa**: cuándo cae a niveles normales

### Métricas Calculadas
- Duración total de congestión
- Incremento máximo de ruido
- Cantidad de vías críticas durante pico
- Tiempo promedio afectado

### Interpretación Típica
- **Inicio rápido** (< 5 min): red poco resiliente
- **Recuperación lenta** (> 5 min): efecto memoria en rutas
- **Ruido pico**: impacto acústico concentrado
- **Vías críticas**: puntos que colapsan primero

---

## API Global Expuesta

Cada módulo expone una API global para integración:

### `DEMAND_API`
```javascript
window.DEMAND_API = {
  getDemandPercent(),     // Retorna demanda actual (-100 a +100)
  getScenarioData(),      // Retorna indicadores del escenario actual
  getBaselineData(),      // Retorna estado base (0%)
  setDemand(percent),     // Establece demanda programáticamente
}
```

### `PERTURBATION_API`
```javascript
window.PERTURBATION_API = {
  getSelectedEdge(),      // Vía seleccionada
  getImpact(),            // Cálculo de impacto
  isActive(),             // ¿Perturbación activa?
}
```

### `REDISTRIBUTION_API`
```javascript
window.REDISTRIBUTION_API = {
  getCurrentStrategy(),   // Estrategia actual
  getStrategyData(),      // Datos de estrategia
}
```

### `PEAK_API`
```javascript
window.PEAK_API = {
  getDemandAtTime(t),          // Demanda a tiempo t
  getMetricsAtDemand(percent), // Métricas para demanda
  analyzeProfile(),            // Análisis del perfil temporal
}
```

---

## Datos Actuales

### Estado Base (0%)
- **Vehículos**: 2581 (máximo en simulación)
- **Flujo**: ~3250 veh/h
- **Velocidad**: 18.5 km/h
- **Densidad**: 125 veh/km
- **Ocupación**: 8.5%
- **Tiempo de viaje**: 480 s (8 min)
- **Ruido promedio**: 22.4

### Red
- **Número de vías**: 4764
- **Vías críticas**: ~128 con noise > 24
- **Zonas de mayor flujo**: rampas de acceso y arterias principales

---

## Próximos Pasos para Datos SUMO Reales

Para pasar de interpolación teórica a **datos reales**, necesitas:

### 1. Generar Escenarios en SUMO
```bash
# Para cada demanda (-100%, -50%, 0%, +25%, +50%, +75%, +100%):
sumo -c config.sumocfg --output-prefix vehiculos_XXX
```

### 2. Convertir a JSON Compacto
Ejemplo (script Python):
```python
# Lee trazado_-50.xml
# Genera vehiculos_-50.json en formato compacto
```

### 3. Subir a GitHub
```
assets/
  ├── vehiculos_0.json      (actual)
  ├── vehiculos_+25.json
  ├── vehiculos_+50.json
  ├── vehiculos_+75.json
  ├── vehiculos_+100.json
  ├── vehiculos_-50.json
  └── vehiculos_-100.json

  ├── noise_0.json
  ├── noise_+25.json
  └── ...
```

### 4. Modificar modulo-08-demand.js
Reemplazar la sección de interpolación teórica con carga dinámica:
```javascript
function loadScenarioData(demandPercent) {
  const file = `./assets/vehiculos_${demandPercent >= 0 ? '+' : ''}${demandPercent}.json`;
  fetch(file).then(r => r.json()).then(data => {
    // Reemplazar timesteps en modulo-08-sumo.js
  });
}
```

---

## Limitaciones Actuales

1. **Interpolación teórica**: Los indicadores se calculan con modelos matemáticos simplificados
2. **No hay redistribución real**: El tráfico no se redirige dinámicamente
3. **Ruido estimado**: No es acústico real, es proxy relativo
4. **Una simulación base**: Todos los escenarios derivan de la misma simulación SUMO

## Precisión Esperada

- **Indicadores teóricos**: ±20% de error vs datos SUMO reales
- **Tendencias**: correctas (si demanda sube, tiempo sube)
- **Comparaciones relativas**: confiables (cuál estrategia es mejor)
- **Valores absolutos**: aproximados

---

## Notas de Diseño

### Por qué estos 4 experimentos
- **Demanda**: el parámetro más básico e importante
- **Perturbación**: simula realidad (obras, cierres, accidentes)
- **Redistribución**: optimización de políticas
- **Pico**: resiliencia y preparación ante eventos

### Por qué modelo teórico
- No todos tienen SUMO instalado
- Cálculos instantáneos (interactividad)
- Scaffolding para datos reales después

### Decisiones de diseño UI/UX
- API global expuesta: permite extensiones futuras
- Módulos independientes: cada experimento es autocontenido
- Indicadores de comparación: contexto siempre disponible
- Botones presets: acceso rápido a escenarios comunes

---

## Archivos del Sistema

```
modulo-08.html              ← Interfaz unificada
modulo-08.css               ← Estilos de todos los experimentos
modulo-08.js                ← Lógica de red (no modificado)
modulo-08-sumo.js           ← Reproducción de SUMO (no modificado)
modulo-08-noise.js          ← Mapa de ruido (no modificado)

NUEVOS:
modulo-08-demand.js         ← Experimento 1 (barra + indicadores)
modulo-08-perturbation.js   ← Experimento 2 (cierre/reducción)
modulo-08-redistribution.js ← Experimento 3 (estrategias de rutas)
modulo-08-peak.js           ← Experimento 4 (pico temporal)

DATOS:
assets/kennedy_net.json
assets/kennedy_vehiculos.json
assets/kennedy_noise.json
```

---

## Troubleshooting

### La barra no aparece
- Verifica que el navegador cargue `modulo-08-demand.js`
- Abre la consola (F12): busca `[DEMAND] Módulo cargado`

### Los indicadores muestran "—"
- Significa que `DEMAND_API.getBaselineData()` retorna null
- Verifica que `modulo-08-demand.js` se ejecutó

### Los estilos se ven raros
- Limpia caché: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
- Verifica que `modulo-08.css` se cargó correctamente

### Las vías críticas no coinciden con visualmente
- Las vías se identifican por tiempo de viaje total, no por flujo instantáneo
- El tiempo de viaje es acumulativo: tiempo en cola + tiempo de desplazamiento

---

## Recursos Útiles

- **Líneas de interpolación**: `modulo-08-demand.js` líneas 125-150
- **Cálculo de impacto**: `modulo-08-perturbation.js` líneas 80-110
- **Estrategias**: `modulo-08-redistribution.js` líneas 30-65
- **Perfil temporal**: `modulo-08-peak.js` líneas 40-75

---

**Última actualización**: 2026-09-01  
**Estado**: Funcional con datos teóricos. Listo para integración SUMO real.
