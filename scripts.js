// Definir nodos
var nodes = new vis.DataSet([
  {id: 1, label: 'Humedal'},
  {id: 2, label: 'Movilidad sostenible'},
  {id: 3, label: 'Vivienda'},
  {id: 4, label: 'Gestión del agua'},
  {id: 5, label: 'Espacio público'}
]);

// Definir conexiones
var edges = new vis.DataSet([
  {from: 1, to: 2, label: 'Condiciona expansión urbana'},
  {from: 2, to: 3, label: 'Acceso a vivienda'},
  {from: 4, to: 3, label: 'Agua necesaria para vivienda'},
  {from: 5, to: 2, label: 'Espacio público depende de movilidad'}
]);

// Crear red
var container = document.getElementById('network');
var data = {nodes: nodes, edges: edges};
var options = {
  interaction: {hover: true},
  edges: {arrows: 'to'}
};
var network = new vis.Network(container, data, options);

// Animación al hacer scroll
const modulos = document.querySelectorAll('.modulo');

function mostrarModulos() {
  const triggerBottom = window.innerHeight * 0.85; // 85% de la pantalla

  modulos.forEach(modulo => {
    const boxTop = modulo.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      modulo.classList.add('visible');
    } else {
      modulo.classList.remove('visible');
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const demoBtn = document.querySelector(".demo");

  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      window.location.href = "demo.html"; // abre demo.html
    });
  }
});
document.querySelector('.demo').addEventListener('click', function() {
  window.location.href = 'demo.html';
});
