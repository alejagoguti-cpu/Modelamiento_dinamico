/* ==========================================================================
   PERTURBACIÓN DE RED — Módulo 08
   ==========================================================================
   Permite simular el cierre o reducción de capacidad de vías críticas
   y observar cómo responde la red (redistribución de tráfico, cambios
   en velocidad, ruido, tiempo de viaje).

   ARQUITECTURA:
   1. Identificar vías críticas por flujo/densidad/time loss
   2. Seleccionar tipo de perturbación (cierre o reducción)
   3. Calcular impacto teórico en la red
   4. Mostrar cómo cambian indicadores
   ========================================================================== */
(() => {
  "use strict";

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    // ====== ELEMENTOS DEL DOM ======
    const edgeOptions = document.querySelectorAll(".edge-option");
    const perturbationTypeInputs = document.querySelectorAll("input[name='perturbationType']");
    const capacitySlider = document.getElementById("capacitySlider");
    const capacityValue = document.getElementById("capacityValue");
    const capacitySection = document.getElementById("capacitySection");
    const applyBtn = document.getElementById("perturbationApplyBtn");
    const resetBtn = document.getElementById("perturbationResetBtn");
    const resultsPanel = document.getElementById("perturbationResults");

    if (!applyBtn) return; // Esta página no tiene el panel

    // ====== ESTADO ======
    let selectedEdge = null;
    let perturbationType = "closure";
    let capacityReduction = 0;
    let isActive = false;

    // ====== UTILIDADES ======
    function selectEdge(edgeId) {
      selectedEdge = edgeId;
      edgeOptions.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.edgeId === edgeId) {
          btn.classList.add("active");
        }
      });
      updateApplyButtonState();
      console.log(`[PERTURBATION] Edge seleccionado: ${edgeId}`);
    }

    function updateApplyButtonState() {
      const canApply = selectedEdge && !isActive;
      applyBtn.disabled = !canApply;
    }

    // ====== CÁLCULO DE IMPACTO ======
    function calculateImpact() {
      if (!selectedEdge) return null;

      // Obtener datos de la vía seleccionada
      const edgeBtn = Array.from(edgeOptions).find(btn => btn.dataset.edgeId === selectedEdge);
      if (!edgeBtn) return null;

      const edgeFlow = parseFloat(edgeBtn.dataset.flow);
      const edgeDensity = parseFloat(edgeBtn.dataset.density);
      const edgeTimeLoss = parseFloat(edgeBtn.dataset.timeloss);

      // Modelo simplificado de impacto
      let impactFactor = 1;

      if (perturbationType === "closure") {
        // Cierre total: todo el flujo debe redirigirse
        impactFactor = 2.5; // Los vehículos buscan rutas alternativas más largas
      } else {
        // Reducción de capacidad
        const remainingCapacity = capacityReduction / 100;
        impactFactor = 1 + (1 - remainingCapacity) * 3; // Congestión exponencial
      }

      // Cálculo de impacto en la red
      const baselineData = window.DEMAND_API?.getBaselineData?.() || {
        travelTime: 480,
        timeLoss: 45,
        noise: 22.4,
        flow: 3250,
      };

      const impact = {
        edgeId: selectedEdge,
        affectedVehicles: Math.round(edgeFlow * impactFactor),
        timeIncrease: edgeTimeLoss * 0.15 * impactFactor, // Aproximación
        noiseIncrease: Math.min(8, 2 * impactFactor),
        routesAffected: Math.floor(edgeDensity * 0.5),
      };

      return impact;
    }

    function applyPerturbation() {
      if (isActive) {
        console.warn("[PERTURBATION] Ya hay una perturbación activa");
        return;
      }

      const impact = calculateImpact();
      if (!impact) return;

      isActive = true;
      applyBtn.textContent = "Perturbación Activa";

      // Mostrar resultados
      document.getElementById("resultEdgeId").textContent = impact.edgeId;
      document.getElementById("resultTimeChange").textContent = `+${impact.timeIncrease.toFixed(0)} s`;
      document.getElementById("resultNoiseChange").textContent = `+${impact.noiseIncrease.toFixed(1)}`;
      document.getElementById("resultAffectedEdges").textContent = `${impact.routesAffected} vías`;
      resultsPanel.style.display = "block";

      updateApplyButtonState();
      console.log("[PERTURBATION] Perturbación aplicada:", impact);
    }

    function resetPerturbation() {
      isActive = false;
      selectedEdge = null;
      edgeOptions.forEach(btn => btn.classList.remove("active"));
      resultsPanel.style.display = "none";
      applyBtn.textContent = "Aplicar Perturbación";
      updateApplyButtonState();
      console.log("[PERTURBATION] Perturbación restablecida");
    }

    // ====== EVENT LISTENERS ======
    edgeOptions.forEach(btn => {
      btn.addEventListener("click", () => {
        selectEdge(btn.dataset.edgeId);
      });
    });

    perturbationTypeInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        perturbationType = e.target.value;
        capacitySection.style.display = perturbationType === "capacity" ? "block" : "none";
        console.log(`[PERTURBATION] Tipo de perturbación: ${perturbationType}`);
      });
    });

    capacitySlider.addEventListener("input", (e) => {
      capacityReduction = 100 - parseInt(e.target.value);
      capacityValue.textContent = `${e.target.value}%`;
      console.log(`[PERTURBATION] Capacidad: ${e.target.value}%`);
    });

    applyBtn.addEventListener("click", applyPerturbation);
    resetBtn.addEventListener("click", resetPerturbation);

    // ====== INICIALIZACIÓN ======
    console.log("[PERTURBATION] Módulo cargado");
    updateApplyButtonState();

    // Exponer API global
    window.PERTURBATION_API = {
      getSelectedEdge: () => selectedEdge,
      getImpact: () => calculateImpact(),
      isActive: () => isActive,
    };
  });
})();
