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

  // --- SCROLL TO TOP (Volver Arriba) ---
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    // 1. Muestra/Oculta el botón
    window.addEventListener("scroll", () => {
      // Muestra el botón si el scroll vertical es mayor a 400px
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    // 2. Realiza el scroll al inicio de la página
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Desplazamiento suave
      });
    });
  }

  // --- SCROLL REVEAL LÓGICA CONSTANTE (Intersection Observer) ---
  const scrollRevealSections = document.querySelectorAll(".scroll-reveal");

  if (scrollRevealSections.length > 0) {
    const observerOptions = {
      root: null, // El viewport es el root
      rootMargin: "0px",
      threshold: 0.1, // El 10% del elemento debe ser visible para activar
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target;
        // Seleccionamos las tarjetas internas de los grids
        const gridItems = target.querySelectorAll(".services-grid > *, .plans-grid > *, .testimonials-track > *");

        if (entry.isIntersecting) {
          // El elemento está entrando en el viewport: Lo activamos
          target.classList.add("active");

          // Activamos las tarjetas internas con delay para el efecto escalonado
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("active-item");
            }, index * 150);
          });
        } else {
          // El elemento está saliendo del viewport: Lo reiniciamos (ocultamos)
          target.classList.remove("active");

          // Reiniciamos las tarjetas internas
          gridItems.forEach((item) => {
            item.classList.remove("active-item");
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    scrollRevealSections.forEach((section) => {
      observer.observe(section);
    });
  }
});
