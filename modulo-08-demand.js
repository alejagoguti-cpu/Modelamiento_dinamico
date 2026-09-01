/* ==========================================================================
   CONTROL INTERACTIVO DE DEMANDA — Módulo 08
   ==========================================================================
   Maneja la barra de demanda variable, presets de escenarios,
   indicadores en tiempo real, y comparación con el estado base (0%).

   ARQUITECTURA:
   1. Base State: se almacena el estado actual como referencia (0%)
   2. Demand Slider: permite -100% a +100%
   3. Presets: botones para cargar escenarios predefinidos
   4. Indicators: cálculo de métricas en tiempo real
   5. Comparison: muestra cambios vs base

   NOTA: Los archivos de escenarios SUMO se cargarán como sean generados.
   Por ahora, funciona con interpolación teórica.
   ========================================================================== */
(() => {
  "use strict";

  // Esperar a que el DOM esté listo
  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    // ====== ELEMENTOS DEL DOM ======
    const demandSlider = document.getElementById("demandSlider");
    const demandCurrentValue = document.getElementById("demandCurrentValue");
    const demandStatusText = document.getElementById("demandStatusText");
    const demandPresetBtns = document.querySelectorAll(".demand-preset-btn");
    const comparisonToggle = document.getElementById("comparisonToggle");

    // Indicadores
    const indicators = {
      vehicles: document.getElementById("indVehicles"),
      vehiclesChange: document.getElementById("indVehiclesChange"),
      flow: document.getElementById("indFlow"),
      flowChange: document.getElementById("indFlowChange"),
      speed: document.getElementById("indSpeed"),
      speedChange: document.getElementById("indSpeedChange"),
      density: document.getElementById("indDensity"),
      densityChange: document.getElementById("indDensityChange"),
      occupancy: document.getElementById("indOccupancy"),
      occupancyChange: document.getElementById("indOccupancyChange"),
      travelTime: document.getElementById("indTravelTime"),
      travelTimeChange: document.getElementById("indTravelTimeChange"),
      timeLoss: document.getElementById("indTimeLoss"),
      timeLossChange: document.getElementById("indTimeLossChange"),
      noise: document.getElementById("indNoise"),
      noiseChange: document.getElementById("indNoiseChange"),
      congestion: document.getElementById("indCongestion"),
      congestionChange: document.getElementById("indCongestionChange"),
    };

    if (!demandSlider) return; // Esta página no tiene el panel

    // ====== ESTADO GLOBAL ======
    let baselineData = null;         // Estado actual (0%)
    let currentDemandPercent = 0;    // Demanda actual
    let currentScenarioData = null;  // Datos del escenario actual
    let showComparison = true;       // Mostrar comparación con base

    // ====== UTILIDADES ======
    function formatPercent(val) {
      if (val > 0) return `+${val}%`;
      return `${val}%`;
    }

    function getStatusText(demandPercent) {
      if (demandPercent === 0) return "Estado actual (referencia)";
      if (demandPercent < -75) return "Demanda mínima";
      if (demandPercent < -25) return "Demanda muy baja";
      if (demandPercent < 0) return "Demanda baja";
      if (demandPercent < 25) return "Demanda moderada";
      if (demandPercent < 50) return "Demanda alta";
      if (demandPercent < 75) return "Demanda muy alta";
      return "Demanda máxima";
    }

    function formatChange(current, base, decimals = 1) {
      if (!base || base === 0) return "—";
      const change = current - base;
      const pct = ((change / base) * 100).toFixed(0);
      const sign = change > 0 ? "+" : "";
      return `${sign}${change.toFixed(decimals)} (${sign}${pct}%)`;
    }

    // ====== MODELO TEÓRICO: Simulación de Cambios ======
    // Interpola indicadores basado en demanda
    // Esto es un placeholder hasta que generes escenarios con SUMO
    function interpolateScenario(demandPercent) {
      if (!baselineData) return null;

      const factor = 1 + demandPercent / 100; // 1.5 para +50%, 0.5 para -50%, etc.

      // Aproximación teórica simple:
      // - Flujo aumenta proportionalmente
      // - Velocidad disminuye (congestión)
      // - Densidad aumenta
      // - Tiempo de viaje aumenta

      // Fórmula de congestión (simplificada):
      // velocidad = velocidad_base / (1 + (demandPercent/100)^1.5)
      const congestionFactor = Math.pow(Math.abs(factor), 1.2);
      const speedReduction = factor > 1 ? 1 / congestionFactor : 1;

      return {
        vehicles: Math.round(baselineData.vehicles * factor),
        flow: baselineData.flow * factor,
        speed: baselineData.speed * speedReduction,
        density: baselineData.density * factor,
        occupancy: Math.min(100, baselineData.occupancy * factor),
        travelTime: baselineData.travelTime * (1 / speedReduction),
        timeLoss: baselineData.timeLoss * factor,
        noise: baselineData.noise + (demandPercent / 100) * 5, // Aumento teórico de ruido
        congestionCount: Math.round(baselineData.congestionCount * Math.max(factor, 0.1)),
      };
    }

    // ====== CALCULAR BASELINE (Estado Actual) ======
    function calculateBaseline() {
      // Datos agregados de kennedy_noise.json
      // Se calcularán en tiempo real cuando modulo-08-noise.js cargue
      // Por ahora, valores de ejemplo basados en auditoría
      baselineData = {
        vehicles: 2581,        // Máximo en última simulación
        flow: 3250,            // veh/h promedio (estimado)
        speed: 18.5,           // km/h promedio
        density: 125,          // veh/km promedio
        occupancy: 8.5,        // % promedio
        travelTime: 480,       // segundos (8 min)
        timeLoss: 45,          // segundos promedio
        noise: 22.4,           // índice promedio
        congestionCount: 128,  // vías con congestión (noise > 24)
      };
      console.log("[DEMAND] Baseline establecido:", baselineData);
    }

    // ====== ACTUALIZAR INDICADORES ======
    function updateIndicators(demandPercent) {
      const scenario = interpolateScenario(demandPercent);
      if (!scenario) {
        console.warn("[DEMAND] No hay datos base para calcular escenario");
        return;
      }

      currentScenarioData = scenario;

      // Helper para actualizar valor e cambio
      const updateIndicator = (valueEl, changeEl, current, base, format = ".0f") => {
        if (valueEl) {
          if (format === ".0f") {
            valueEl.textContent = Math.round(current).toString();
          } else if (format === ".1f") {
            valueEl.textContent = current.toFixed(1);
          } else {
            valueEl.textContent = current.toFixed(2);
          }
        }
        if (changeEl && showComparison && base) {
          const change = current - base;
          const pct = ((change / base) * 100).toFixed(0);
          const sign = change > 0 ? "+" : "";

          changeEl.textContent = `${sign}${change.toFixed(1)} (${sign}${pct}%)`;
          changeEl.classList.remove("positive", "negative", "neutral");

          if (change > 0) changeEl.classList.add("positive");
          else if (change < 0) changeEl.classList.add("negative");
          else changeEl.classList.add("neutral");
        } else if (changeEl) {
          changeEl.textContent = "";
        }
      };

      // Actualizar todos los indicadores
      updateIndicator(indicators.vehicles, indicators.vehiclesChange, scenario.vehicles, baselineData.vehicles, ".0f");
      updateIndicator(indicators.flow, indicators.flowChange, scenario.flow, baselineData.flow, ".0f");
      updateIndicator(indicators.speed, indicators.speedChange, scenario.speed, baselineData.speed, ".1f");
      updateIndicator(indicators.density, indicators.densityChange, scenario.density, baselineData.density, ".1f");
      updateIndicator(indicators.occupancy, indicators.occupancyChange, scenario.occupancy, baselineData.occupancy, ".1f");
      updateIndicator(indicators.travelTime, indicators.travelTimeChange, scenario.travelTime, baselineData.travelTime, ".0f");
      updateIndicator(indicators.timeLoss, indicators.timeLossChange, scenario.timeLoss, baselineData.timeLoss, ".1f");
      updateIndicator(indicators.noise, indicators.noiseChange, scenario.noise, baselineData.noise, ".1f");
      updateIndicator(indicators.congestion, indicators.congestionChange, scenario.congestionCount, baselineData.congestionCount, ".0f");
    }

    // ====== ACTUALIZAR DEMANDA ======
    function setDemand(demandPercent) {
      currentDemandPercent = Math.round(demandPercent);

      // Actualizar display
      demandCurrentValue.textContent = formatPercent(currentDemandPercent);
      demandStatusText.textContent = getStatusText(currentDemandPercent);

      // Actualizar indicadores
      updateIndicators(currentDemandPercent);

      // Actualizar botones de preset
      demandPresetBtns.forEach(btn => {
        btn.classList.remove("active");
        if (parseInt(btn.dataset.demand) === currentDemandPercent) {
          btn.classList.add("active");
        }
      });

      // TODO: Cargar escenario SUMO si existen múltiples archivos
      // if (currentDemandPercent !== 0) {
      //   loadScenarioData(currentDemandPercent);
      // }

      console.log(`[DEMAND] Demanda actualizada: ${formatPercent(currentDemandPercent)}`);
    }

    // ====== EVENT LISTENERS ======
    demandSlider.addEventListener("input", (e) => {
      setDemand(parseInt(e.target.value));
    });

    demandPresetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const demand = parseInt(btn.dataset.demand);
        demandSlider.value = demand;
        setDemand(demand);
      });
    });

    comparisonToggle.addEventListener("change", (e) => {
      showComparison = e.target.checked;
      updateIndicators(currentDemandPercent);
    });

    // ====== INICIALIZACIÓN ======
    console.log("[DEMAND] Módulo cargado");
    calculateBaseline();
    setDemand(0);

    // Exponer API global para comunicación con otros módulos
    window.DEMAND_API = {
      getDemandPercent: () => currentDemandPercent,
      getScenarioData: () => currentScenarioData,
      getBaselineData: () => baselineData,
      setDemand: setDemand,
    };
  });
})();
