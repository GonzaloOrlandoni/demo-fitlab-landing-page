document.addEventListener("DOMContentLoaded", () => {
  // --- MENÚ HAMBURGUESA ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("show");
      const isExpanded = navLinks.classList.contains("show");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });

    if (navItems) {
      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navLinks.classList.remove("show");
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    }
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

  // --- SCROLL TO TOP + PROGRESS BAR ---
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const progressBar = document.getElementById("progress-bar");

  if (scrollToTopBtn) {
    let isScrolling = false;
    window.addEventListener("scroll", () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Scroll to top button
          if (scrollY > 400) {
            scrollToTopBtn.classList.add("show");
          } else {
            scrollToTopBtn.classList.remove("show");
          }

          // Progress bar
          if (progressBar) {
            const docHeight = document.body.scrollHeight - window.innerHeight;
            progressBar.style.width = ((scrollY / docHeight) * 100) + "%";
          }

          isScrolling = false;
        });
        isScrolling = true;
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  // --- FORMULARIO CONTACTO (Async con Toast) ---
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim() !== "") {
        setTimeout(() => showToast("¡Mensaje enviado con éxito!", "success"), 1500);
        form.reset();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showToast("¡Mensaje enviado! Te contactaremos a la brevedad. 💪", "success");
          form.reset();
        } else {
          showToast("Error al enviar. Intentá nuevamente.", "error");
        }
      } catch {
        showToast("Error de conexión. Verificá tu internet.", "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Enviar Mensaje";
        }
      }
    });
  }
});

// =========================================
//  SISTEMA DE TOASTS
// =========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = '<i class="fas fa-info-circle"></i>';
  if (type === "success") icon = '<i class="fas fa-check-circle"></i>';
  if (type === "error") icon = '<i class="fas fa-exclamation-circle"></i>';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-message"></div>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;
  toast.querySelector(".toast-message").textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  const timeout = setTimeout(() => closeToast(toast), 4000);
  toast.querySelector(".toast-close").addEventListener("click", () => {
    clearTimeout(timeout);
    closeToast(toast);
  });
}

function closeToast(toast) {
  toast.classList.remove("show");
  toast.classList.add("hide");
  toast.addEventListener("transitionend", () => toast.remove());
}
