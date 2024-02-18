// script.js
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let target = document.querySelector(this.getAttribute('href'));
        let headerOffset = 100; // Asegúrate de que este valor sea igual a la altura de tu encabezado fijo
        let elementPosition = target.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  });
  