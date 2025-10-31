document.addEventListener("DOMContentLoaded", () => {
  // --- MENÚ HAMBURGUESA ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      const isExpanded = navLinks.classList.contains("show");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });
  }

  // --- FAQ INTERACTIVO (ACORDEÓN) ---
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector("h3");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        item.classList.toggle("active");
        header.setAttribute("aria-expanded", !isActive);
      });
    }
  });

  // --- TOGGLE MENSUAL/ANUAL ---
  const monthlyBtn = document.getElementById("monthly-btn");
  const annualBtn = document.getElementById("annual-btn");
  const prices = document.querySelectorAll(".plan-card .price");

  if (monthlyBtn && annualBtn && prices.length > 0) {
    function updatePrices(period) {
      prices.forEach((priceElement) => {
        if (priceElement.dataset[period]) {
          priceElement.textContent = priceElement.dataset[period];
        }
      });
    }

    monthlyBtn.addEventListener("click", () => {
      monthlyBtn.classList.add("active");
      annualBtn.classList.remove("active");
      updatePrices("monthly");
    });

    annualBtn.addEventListener("click", () => {
      annualBtn.classList.add("active");
      monthlyBtn.classList.remove("active");
      updatePrices("annual");
    });
  }

  // --- CARRUSEL DE TESTIMONIOS (AUTOSCROLL) ---
  const track = document.querySelector(".testimonials-track");
  const testimonials = Array.from(track.children);

  // Solo ejecuta si el carrusel existe
  if (track && testimonials.length > 0) {
    // Clona todos los testimonios al final para el loop continuo
    testimonials.forEach((testimonial) => {
      const clone = testimonial.cloneNode(true);
      track.appendChild(clone);
    });

    let scrollX = 0;
    const speed = 1; // pixels por frame

    function animateCarousel() {
      scrollX += speed;

      // Cuando el primer testimonial completo salió de vista, lo movemos al final
      const firstTestimonial = track.children[0];
      const firstWidth = firstTestimonial.offsetWidth + 32; // 32px gap
      if (scrollX >= firstWidth) {
        track.appendChild(firstTestimonial);
        scrollX -= firstWidth;
      }

      track.style.transform = `translateX(-${scrollX}px)`;
      requestAnimationFrame(animateCarousel);
    }

    animateCarousel();
  }
});
