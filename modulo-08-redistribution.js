/* ==========================================================================
   REDISTRIBUCIÓN DE RUTAS — Módulo 08
   ==========================================================================
   Simula cómo cambiarían los indicadores si se redistribuyera el tráfico
   entre rutas diferentes (manteniendo la misma demanda total).

   ESTRATEGIAS:
   1. Actual: distribución actual de SUMO
   2. Equilibrada: carga uniforme por vía
   3. Más Corta: todos por la ruta más corta (independiente de congestión)
   4. Más Rápida: rutas evitando congestión (modelo teórico)
   ========================================================================== */
(() => {
  "use strict";

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    // ====== ELEMENTOS DEL DOM ======
    const strategyInputs = document.querySelectorAll("input[name='routeStrategy']");
    const applyBtn = document.getElementById("redistributionApplyBtn");
    const resetBtn = document.getElementById("redistributionResetBtn");

    if (!applyBtn) return; // Esta página no tiene el panel

    // ====== ESTADO ======
    let currentStrategy = "current";
    const strategies = {
      current: { time: 480, flow: 1015, noise: 22.4 },
      balanced: null,
      shortest: null,
      fastest: null,
    };

    // ====== CÁLCULO DE IMPACTO POR ESTRATEGIA ======
    function calculateStrategy(strategyName) {
      const baseline = strategies.current;

      switch (strategyName) {
        case "balanced":
          // Distribución uniforme reduce congestión en puntos críticos
          return {
            time: baseline.time * 0.85,    // 15% más rápido
            flow: baseline.flow * 0.95,    // Flujo ligeramente menor (menos atascos)
            noise: baseline.noise * 0.88,  // Ruido reducido
          };

        case "shortest":
          // Todos por la ruta más corta: congestión en esa ruta
          return {
            time: baseline.time * 1.35,    // 35% más lento (todos en mismo camino)
            flow: baseline.flow * 0.75,    // Flujo reducido por atascos
            noise: baseline.noise * 1.25,  // Ruido aumentado
          };

        case "fastest":
          // Distribución teórica evitando congestión
          return {
            time: baseline.time * 0.78,    // 22% más rápido
            flow: baseline.flow * 1.08,    // Flujo aumentado (menos cuellos)
            noise: baseline.noise * 0.82,  // Ruido reducido
          };

        default:
          return baseline;
      }
    }

    // ====== ACTUALIZAR COMPARACIÓN ======
    function updateComparison() {
      const data = calculateStrategy(currentStrategy);

      // Actualizar tabla de comparación
      const updateCell = (id, value, format = ".0f") => {
        const el = document.getElementById(id);
        if (el) {
          if (format === ".0f") el.textContent = Math.round(value).toString();
          else el.textContent = value.toFixed(1);

          if (!id.includes("current")) {
            el.textContent += (el.textContent !== "—" ? (format === ".0f" ? " s" : "") : "");
          }
        }
      };

      updateCell("comp-" + currentStrategy + "-time", data.time, ".0f");
      updateCell("comp-" + currentStrategy + "-flow", data.flow, ".0f");
      updateCell("comp-" + currentStrategy + "-noise", data.noise, ".1f");
    }

    // ====== EVENT LISTENERS ======
    strategyInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        currentStrategy = e.target.value;
        updateComparison();
        console.log(`[REDISTRIBUTION] Estrategia: ${currentStrategy}`);
      });
    });

    applyBtn.addEventListener("click", () => {
      const data = calculateStrategy(currentStrategy);
      console.log(`[REDISTRIBUTION] Aplicando estrategia '${currentStrategy}':`, data);
      applyBtn.textContent = `Aplicado: ${currentStrategy}`;
    });

    resetBtn.addEventListener("click", () => {
      strategyInputs.forEach(input => {
        if (input.value === "current") input.checked = true;
      });
      currentStrategy = "current";
      applyBtn.textContent = "Aplicar Distribución";
      updateComparison();
      console.log("[REDISTRIBUTION] Restablecido");
    });

    // ====== INICIALIZACIÓN ======
    console.log("[REDISTRIBUTION] Módulo cargado");
    updateComparison();

    // Exponer API global
    window.REDISTRIBUTION_API = {
      getCurrentStrategy: () => currentStrategy,
      getStrategyData: () => calculateStrategy(currentStrategy),
    };
  });
})();
