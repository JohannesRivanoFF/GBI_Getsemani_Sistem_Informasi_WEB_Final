const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const year = document.querySelector("#year");
const yearFooter = document.querySelector("#year-footer");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dots span");
const heroCard = document.querySelector(".hero-card");

const churchWhatsapp = "6281234567890";
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Tahun footer
if (yearFooter) {
  yearFooter.textContent = new Date().getFullYear();
}

// Tahun (untuk fallback)
if (year) {
  year.textContent = new Date().getFullYear();
}

// Nav toggle
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Hero slider
let activeHeroSlide = 0;

const showHeroSlide = (index) => {
  if (!heroSlides.length) return;

  heroSlides[activeHeroSlide].classList.remove("is-active");
  if (heroDots[activeHeroSlide]) {
    heroDots[activeHeroSlide].classList.remove("is-active");
  }

  activeHeroSlide = index % heroSlides.length;
  heroSlides[activeHeroSlide].classList.add("is-active");
  if (heroDots[activeHeroSlide]) {
    heroDots[activeHeroSlide].classList.add("is-active");
  }
};

if (heroSlides.length > 1) {
  window.setInterval(() => {
    showHeroSlide(activeHeroSlide + 1);
  }, 4200);
}

// Parallax + reveal (jika tidak reduce motion)
if (!reduceMotion) {
  const revealItems = document.querySelectorAll(
    ".quick-info article, .section-heading, .schedule-card, .about-image, .about-content, .announcement, .ministry-grid article, .gallery-grid figure, .contact-card, .contact-form",
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -70px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));

  let ticking = false;

  const updateParallax = () => {
    const y = window.scrollY;

    if (heroCard) {
      heroCard.style.setProperty(
        "--hero-card-offset",
        `${Math.min(y * -0.035, 0)}px`,
      );
    }

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateParallax();
}

// Contact form
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const need = String(formData.get("need") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !contact || !need || !message) {
      if (formNote) {
        formNote.textContent = "Mohon lengkapi semua kolom sebelum mengirim.";
      }
      return;
    }

    const text = [
      "Shalom admin GBI Getsemani,",
      "",
      `Nama: ${name}`,
      `Kontak: ${contact}`,
      `Kebutuhan: ${need}`,
      `Pesan: ${message}`,
    ].join("\n");

    const url = `https://wa.me/${churchWhatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");

    if (formNote) {
      formNote.textContent =
        "Terima kasih. WhatsApp akan terbuka untuk mengirim pesan ke admin gereja.";
    }
  });
}
// ===== MEDIA SLIDESHOW =====
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".media-slide");
  if (!slides.length) return;

  let currentSlide = 0;
  const intervalTime = 8000; // 8 detik
  let slideInterval;

  // Fungsi untuk menampilkan slide tertentu
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  // Fungsi untuk pindah ke slide berikutnya
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Fungsi untuk memulai interval
  function startInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Inisialisasi: tampilkan slide pertama
  showSlide(0);
  startInterval();

  // Pause saat hover, lanjutkan saat leave
  const section = document.querySelector(".media-section");
  if (section) {
    section.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });
    section.addEventListener("mouseleave", () => {
      startInterval();
    });
  }
});
function toggleWaChat() {
  const chatBox = document.getElementById("waChatBox");
  chatBox.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".schedule-section");
  const glow = document.querySelector(".background-glow");

  if (!section || !glow) return;

  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;

  // Mendapatkan posisi kursor saat bergerak di dalam section
  section.addEventListener("mousemove", (e) => {
    const rect = section.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  // Fungsi animasi agar pergerakan background terasa mengalir (tidak kaku)
  function animateBackground() {
    // Angka '0.08' mengatur tingkat kehalusan/kelambatan kejar (semakin kecil semakin smooth/mengalir)
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(animateBackground);
  }

  animateBackground();

  // Opsi opsional: Perbesar sedikit cahaya background saat kursor masuk ke area section
  section.addEventListener("mouseenter", () => {
    glow.style.opacity = "1";
  });

  section.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
});
