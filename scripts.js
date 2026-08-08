document.addEventListener("DOMContentLoaded", function() {
  // demo button (existing)
  const demoBtn = document.querySelector(".demo");
  if (demoBtn) demoBtn.onclick = () => window.location.href = "demo.html";

  // create tooltip element
  let tooltip = document.createElement('div');
  tooltip.className = 'node-tooltip';
  document.body.appendChild(tooltip);

  // helper to get label text inside <g class="node"> (strip line breaks)
  function nodeLabel(node) {
    return node.textContent.replace(/\s+/g, ' ').trim();
  }

  const nodes = document.querySelectorAll('.node');
  const links = document.querySelectorAll('.links line');

  nodes.forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      // dim other nodes & links
      nodes.forEach(n => { if (n !== node) n.classList.add('dim'); });
      links.forEach(l => l.style.opacity = '0.12');

      // highlight this node
      node.classList.add('active');

      // show tooltip
      tooltip.textContent = nodeLabel(node);
      tooltip.style.display = 'block';
    });

    node.addEventListener('mousemove', (e) => {
      // position tooltip near cursor, avoid going off-screen
      const pad = 12;
      let left = e.pageX + pad;
      let top = e.pageY + pad;
      const tw = tooltip.offsetWidth || 160;
      const th = tooltip.offsetHeight || 28;
      if (left + tw > window.innerWidth) left = e.pageX - tw - pad;
      if (top + th > window.innerHeight) top = e.pageY - th - pad;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    });

    node.addEventListener('mouseleave', () => {
      nodes.forEach(n => n.classList.remove('dim'));
      links.forEach(l => l.style.opacity = '1');
      node.classList.remove('active');
      tooltip.style.display = 'none';
    });

    node.addEventListener('click', () => {
      // placeholder: open details panel, navigate, or show modal
      const label = nodeLabel(node);
      console.log('Nodo clicado:', label);
      // Example: flash or show more info — implement as needed
    });
  });
});
