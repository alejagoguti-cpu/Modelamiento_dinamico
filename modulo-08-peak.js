/* ==========================================================================
   PICO Y RECUPERACIÓN — Módulo 08
   ==========================================================================
   Simula un evento temporal: aumento progresivo de demanda hacia un pico,
   y luego reducción gradual. Permite observar:
   - Cuándo aparece la congestión
   - Duración del evento
   - Cómo se recupera la red después
   - Cambios en ruido y tiempo de viaje

   Modelo temporal: 20 segundos simulados
   - 0-5s: demanda baja (0%)
   - 5-10s: incremento acelerado (+50%)
   - 10-12s: pico máximo (+100%)
   - 12-15s: reducción
   - 15-20s: recuperación completa
   ========================================================================== */
(() => {
  "use strict";

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    // ====== ELEMENTOS DEL DOM ======
    const simulateBtn = document.getElementById("peakSimulateBtn");
    const resetBtn = document.getElementById("peakResetBtn");
    const resultsPanel = document.getElementById("peakResults");

    if (!simulateBtn) return; // Esta página no tiene el panel

    // ====== ESTADO ======
    let isSimulating = false;
    let simulationTime = 0;
    const totalDuration = 20; // segundos

    // ====== MODELO TEMPORAL DEL PICO ======
    function getDemandAtTime(t) {
      // t: 0 a 20 segundos
      if (t < 5) return 0;           // Demanda actual (0%)
      if (t < 10) return (t - 5) * 10;  // Incremento: 0% a 50%
      if (t < 12) return 50 + (t - 10) * 25; // Aceleración: 50% a 100%
      if (t < 15) return 100 - (t - 12) * 16.7; // Reducción: 100% a ~50%
      return Math.max(0, 50 - (t - 15) * 10); // Recuperación: 50% a 0%
    }

    function getMetricsAtDemand(demandPercent) {
      const baselineData = window.DEMAND_API?.getBaselineData?.() || {
        travelTime: 480,
        timeLoss: 45,
        noise: 22.4,
      };

      const factor = 1 + demandPercent / 100;
      const speedReduction = Math.pow(factor, 1.2);

      return {
        time: baselineData.travelTime * (1 / speedReduction),
        noise: baselineData.noise + (demandPercent / 100) * 5,
        congestionLevel: Math.min(100, demandPercent * 1.5),
      };
    }

    // ====== EVENTOS TEMPORAL ======
    function analyzeTemporalProfile() {
      const events = {
        congestionStart: null,
        peakTime: null,
        recoveryEnd: null,
        maxNoise: 0,
        totalCongestionDuration: 0,
        avgTimeAtPeak: 0,
      };

      let maxCongestion = 0;
      let maxNoiseTime = -1;
      let congestionStartTime = -1;
      let congestionFrames = 0;
      let peakTimeValue = 0;
      let peakCount = 0;

      // Simulación en pasos de 0.5s
      for (let t = 0; t <= totalDuration; t += 0.5) {
        const demand = getDemandAtTime(t);
        const metrics = getMetricsAtDemand(demand);

        // Detectar inicio de congestión (cuando demanda > 25%)
        if (demand > 25 && congestionStartTime === -1) {
          events.congestionStart = t;
          congestionStartTime = t;
        }

        // Detectar pico (máxima congestión)
        if (metrics.congestionLevel > maxCongestion) {
          maxCongestion = metrics.congestionLevel;
          events.peakTime = t;
        }

        // Detectar máximo ruido
        if (metrics.noise > events.maxNoise) {
          events.maxNoise = metrics.noise;
          maxNoiseTime = t;
        }

        // Contar frames en congestión
        if (demand > 25) {
          congestionFrames++;
          peakTimeValue += metrics.time;
          peakCount++;
        }

        // Detectar fin de congestión
        if (congestionStartTime !== -1 && demand <= 10 && events.recoveryEnd === null) {
          events.recoveryEnd = t;
        }
      }

      events.totalCongestionDuration = congestionFrames * 0.5;
      events.avgTimeAtPeak = peakCount > 0 ? peakTimeValue / peakCount : 0;

      return events;
    }

    // ====== SIMULAR ======
    function simulatePeak() {
      if (isSimulating) return;

      isSimulating = true;
      simulateBtn.disabled = true;
      simulateBtn.textContent = "Simulando...";

      const events = analyzeTemporalProfile();

      // Mostrar resultados
      document.getElementById("eventCongestionStart").textContent = events.congestionStart ? `${events.congestionStart.toFixed(1)}s` : "—";
      document.getElementById("eventPeakTime").textContent = events.peakTime ? `${events.peakTime.toFixed(1)}s` : "—";
      document.getElementById("eventRecoveryEnd").textContent = events.recoveryEnd ? `${events.recoveryEnd.toFixed(1)}s` : "—";

      document.getElementById("analysisDuration").textContent = `${events.totalCongestionDuration.toFixed(1)}s`;
      document.getElementById("analysisNoiseIncrease").textContent = `+${(events.maxNoise - 22.4).toFixed(1)}`;
      document.getElementById("analysisCriticalEdges").textContent = "~25 vías";
      document.getElementById("analysisAvgTime").textContent = `${Math.round(events.avgTimeAtPeak)}s`;

      resultsPanel.style.display = "block";

      console.log("[PEAK] Análisis de pico:", events);

      // Simulación visual (sin bloqueo)
      setTimeout(() => {
        isSimulating = false;
        simulateBtn.disabled = false;
        simulateBtn.textContent = "Simular Pico";
      }, 1500);
    }

    function resetPeak() {
      simulationTime = 0;
      isSimulating = false;
      simulateBtn.disabled = false;
      simulateBtn.textContent = "Simular Pico";
      resultsPanel.style.display = "none";
      console.log("[PEAK] Restablecido");
    }

    // ====== EVENT LISTENERS ======
    simulateBtn.addEventListener("click", simulatePeak);
    resetBtn.addEventListener("click", resetPeak);

    // ====== INICIALIZACIÓN ======
    console.log("[PEAK] Módulo cargado");

    // Exponer API global
    window.PEAK_API = {
      getDemandAtTime: getDemandAtTime,
      getMetricsAtDemand: getMetricsAtDemand,
      analyzeProfile: analyzeTemporalProfile,
    };
  });
})();
