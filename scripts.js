// Manejo del botón de demostración
document.addEventListener("DOMContentLoaded", () => {
  const demoBtn = document.querySelector(".demo");

  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      window.location.href = "demo.html";
    });
  }
});

// Animación al hacer scroll
const modulos = document.querySelectorAll('.modulo');

function mostrarModulos() {
  const triggerBottom = window.innerHeight * 0.85;

  modulos.forEach(modulo => {
    const boxTop = modulo.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      modulo.classList.add('visible');
    } else {
      modulo.classList.remove('visible');
    }
  });
}

// Ejecutar animación al hacer scroll
window.addEventListener('scroll', mostrarModulos);

// Ejecutar una vez al cargar
window.addEventListener('load', mostrarModulos);
