// Smooth scroll para navbar
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// FAQ interactivo
document.querySelectorAll(".faq-item h3").forEach((q) => {
  q.addEventListener("click", () => {
    q.parentElement.classList.toggle("active");
  });
});

// Toggle mensual/anual
const monthlyBtn = document.getElementById("monthly-btn");
const annualBtn = document.getElementById("annual-btn");
const prices = document.querySelectorAll(".plan-card .price");

const monthlyPrices = ["$39.000 /mes", "$60.000 /mes", "$70.000 /mes"];
const annualPrices = ["$468.000 /año", "$720.000 /año", "$840.000 /año"];

monthlyBtn.addEventListener("click", () => {
  monthlyBtn.classList.add("active");
  annualBtn.classList.remove("active");
  prices.forEach((price, index) => {
    price.textContent = monthlyPrices[index];
  });
});

annualBtn.addEventListener("click", () => {
  annualBtn.classList.add("active");
  monthlyBtn.classList.remove("active");
  prices.forEach((price, index) => {
    price.textContent = annualPrices[index];
  });
});

const track = document.querySelector(".testimonials-track");
const testimonials = Array.from(track.children);

// Clonar todos los testimonios al final para el loop continuo
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

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("#navbar ul");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
