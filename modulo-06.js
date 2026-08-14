<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RAPOT · Redes conceptuales del POT</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="modulo-04.css">
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="brand"><div class="mark"><i class="fa-solid fa-diagram-project"></i></div><span>RAPOT</span></div>
      <a class="nav-item" href="dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a>
      <div class="nav-label">MÓDULOS</div>
      <a class="nav-item" href="modulo-01.html"><span>01</span><i class="fa-solid fa-diagram-project"></i> Construir la Red</a>
      <a class="nav-item" href="modulo-02.html"><span>02</span><i class="fa-solid fa-chart-simple"></i> Medir la Red</a>
      <a class="nav-item" href="modulo-03.html"><span>03</span><i class="fa-solid fa-eye"></i> Discurso vs Realidad</a>
      <a class="nav-item active" href="modulo-04.html"><span>04</span><i class="fa-solid fa-bullseye"></i> Macromodelos</a>
      <a class="nav-item" href="modulo-05.html"><span>05</span><i class="fa-solid fa-magnifying-glass"></i> Lo que no está</a>
      <a class="nav-item" href="modulo-06.html"><span>06</span><i class="fa-solid fa-earth-americas"></i> POT ↔ ODS</a>
      <div class="sidebar-footer"><div class="avatar-sm">EU</div><div><strong>Equipo Urbano</strong><small>Administrador</small></div></div>
    </aside>

    <main class="main">
      <header class="topbar"><div><span class="eyebrow">MÓDULO 04</span><h1>Macromodelos del POT</h1></div><div class="avatar-sm">EU</div></header>
      <section class="welcome">
        <h2>Dos lecturas conectadas sobre lo que entendemos del POT</h2>
        <p>Elimina el modelo central y observa dos redes conceptuales: una <strong>ambientalista</strong> y otra <strong>humanista</strong>. Haz clic en los sistemas humanistas para desplegar sus conceptos concretos y explorar sus conexiones.</p>
      </section>

      <section class="workspace">
        <aside class="conventions panel">
          <div class="panel-kicker">GUÍA DE LECTURA</div>
          <h2>Convenciones</h2>
          <p class="muted">Los colores identifican el tipo de concepto y las líneas muestran cómo se relacionan dentro de la lectura del POT.</p>
          <div class="legend-group">
            <h3>Red ambientalista</h3>
            <label><span class="dot green"></span>Concepto ambiental concreto</label>
            <label><span class="line green-line"></span>Conexión ambiental</label>
            <label><span class="dot green-soft"></span>Red ecológica relacionada</label>
          </div>
          <div class="legend-group">
            <h3>Red humanista</h3>
            <label><span class="dot orange"></span>Sistema humanista</label>
            <label><span class="dot yellow"></span>Sistema socioeconómico</label>
            <label><span class="dot blue"></span>Sistema de gobernanza</label>
            <label><span class="dot purple"></span>Sistema funcionalista</label>
          </div>
          <div class="legend-group">
            <h3>Relación</h3>
            <label><span class="line connection"></span>Conexión entre conceptos</label>
            <label><span class="line dashed"></span>Conexión transversal</label>
          </div>
          <div class="hint"><i class="fa-solid fa-hand-pointer"></i><span>Haz clic en una bola del lado humanista para mostrar u ocultar sus conceptos.</span></div>
        </aside>

        <section class="network-card panel">
          <div class="network-head"><div><div class="panel-kicker">RED CONCEPTUAL INTERACTIVA</div><h2>Ambientalista ↔ Humanista</h2></div><button id="resetBtn" class="reset-btn"><i class="fa-solid fa-rotate-left"></i> Restablecer</button></div>
          <div id="selectionNote" class="selection-note">Selecciona un sistema de la red humanista.</div>
          <svg id="networkViz" viewBox="0 0 1200 760" role="img" aria-label="Red conceptual ambientalista y humanista del POT"></svg>
          <div id="conceptDetail" class="concept-detail" aria-live="polite"><strong>Cómo leer la red</strong><span>La bola ambientalista contiene conceptos ecológicos concretos. La bola humanista es mayor y se conecta con tres sistemas: socioeconómico, gobernanza y funcionalista.</span></div>
        </section>
      </section>
    </main>
  </div>
  <script src="modulo-04.js"></script>
</body>
</html>
