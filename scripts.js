document.addEventListener("DOMContentLoaded", function() {
  const demoBtn = document.querySelector(".demo");
  if (demoBtn) {
    demoBtn.onclick = function() {
      window.location.href = "demo.html";
    };
  }
});
