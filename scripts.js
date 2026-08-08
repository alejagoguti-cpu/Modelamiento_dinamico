// Esperar a que el DOM esté completamente listo
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  
  // Buscar el botón de demostración
  const demoBtn = document.querySelector(".demo");
  console.log("Demo button found:", demoBtn);
  
  if (demoBtn) {
    demoBtn.addEventListener("click", function(e) {
      console.log("Demo button clicked!");
      e.preventDefault();
      e.stopPropagation();
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
