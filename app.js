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

// ===== DYNAMIC CMS CONTENT: KEGIATAN & KHOTBAH =====
async function loadDynamicKegiatan() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  try {
    const res = await fetch("./api/kegiatan.php");
    if (!res.ok) return;
    const result = await res.json();
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      galleryGrid.innerHTML = result.data.map(item => `
        <figure>
          <div class="gallery-image">
            <img
              src="${escapeHtml(item.image || './Resource/IBADAH MINGGU.jpeg')}"
              alt="${escapeHtml(item.title || 'Kegiatan')}"
              loading="lazy"
            />
            <div class="gallery-overlay">
              <span class="overlay-title">${escapeHtml(item.title || '')}</span>
              <span class="overlay-desc">${escapeHtml(item.short_desc || item.description || '')}</span>
            </div>
          </div>
          <figcaption>
            <strong>${escapeHtml(item.title || '')}</strong>
            <p>${escapeHtml(item.description || item.short_desc || '')}</p>
            <span class="date">📅 ${escapeHtml(item.date || '')}</span>
          </figcaption>
        </figure>
      `).join('');
    }
  } catch (e) {
    console.debug("Dynamic kegiatan fetch skipped or failed, using fallback:", e);
  }
}

async function loadDynamicKhotbah() {
  const khotbahGrid = document.getElementById("khotbah-grid");
  if (!khotbahGrid) return;

  try {
    const res = await fetch("./api/khotbah.php");
    if (!res.ok) return;
    const result = await res.json();
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      khotbahGrid.innerHTML = result.data.map(item => `
        <article class="khotbah-card">
          <a
            href="${escapeHtml(item.youtube_url || '#')}"
            target="_blank"
            rel="noopener"
            class="khotbah-link"
          >
            <div class="khotbah-device">
              <div class="khotbah-device-frame">
                <div class="device-notch"></div>
                <div class="khotbah-thumbnail">
                  <img
                    src="${escapeHtml(item.thumbnail || './Resource/Screenshot 2026-07-26 233705.png')}"
                    alt="Thumbnail Khotbah - ${escapeHtml(item.title || '')}"
                    loading="lazy"
                  />
                  <div class="khotbah-play">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      width="56"
                      height="56"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  <div class="khotbah-duration">${escapeHtml(item.duration || '30:00')}</div>
                </div>
              </div>
              <div class="device-bottom"></div>
            </div>
            <div class="khotbah-info">
              <span class="khotbah-series">${escapeHtml(item.series || 'M|G')}</span>
              <h3 class="khotbah-title">${escapeHtml(item.title || '')}</h3>
              <p class="khotbah-pastor">${escapeHtml(item.pastor || 'Pdt. Michael Gunawan')}</p>
              <div class="khotbah-views">👁️ ${escapeHtml(item.views || '0 views')}</div>
            </div>
          </a>
        </article>
      `).join('');
    }
  } catch (e) {
    console.debug("Dynamic khotbah fetch skipped or failed, using fallback:", e);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener("DOMContentLoaded", () => {
  loadDynamicKegiatan();
  loadDynamicKhotbah();

  // ===== PASTOR FULL-STAGE SPOTLIGHT SLIDER (1-BY-1 CONTROLLER) =====
  function initPastorSlider() {
    const track = document.getElementById("pastorTrack");
    const slides = document.querySelectorAll(".pastor-slide");
    const tabs = document.querySelectorAll(".pastor-tab");
    const dots = document.querySelectorAll(".pastor-dot");
    const prevBtn = document.getElementById("pastorPrevBtn");
    const nextBtn = document.getElementById("pastorNextBtn");
    const currentIdxEl = document.getElementById("pastorCurrentIndex");
    const totalCountEl = document.getElementById("pastorTotalCount");
    const stage = document.getElementById("pastorStage");

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideTimer = null;

    if (totalCountEl) {
      totalCountEl.textContent = String(totalSlides).padStart(2, "0");
    }

    function updateSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;

      // Update Track transform (sliding horizontally 100% per slide)
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update Slides state
      slides.forEach((slide, idx) => {
        const isActive = idx === currentSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", !isActive);
      });

      // Update Tabs state
      tabs.forEach((tab, idx) => {
        const isActive = idx === currentSlide;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive);
      });

      // Update Dots state
      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === currentSlide);
      });

      // Update Counter
      if (currentIdxEl) {
        currentIdxEl.textContent = String(currentSlide + 1).padStart(2, "0");
      }
    }

    // Prev / Next button clicks
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        updateSlide(currentSlide - 1);
        restartAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        updateSlide(currentSlide + 1);
        restartAutoSlide();
      });
    }

    // Tabs clicks
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const idx = parseInt(tab.getAttribute("data-index"), 10);
        if (!isNaN(idx)) {
          updateSlide(idx);
          restartAutoSlide();
        }
      });
    });

    // Dots clicks
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(idx)) {
          updateSlide(idx);
          restartAutoSlide();
        }
      });
    });

    // Touch Swipe support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 45;

    if (stage) {
      stage.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      // Pause on hover
      stage.addEventListener("mouseenter", () => stopAutoSlide());
      stage.addEventListener("mouseleave", () => startAutoSlide());
    }

    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX < 0) {
          // Swiped left -> next slide
          updateSlide(currentSlide + 1);
        } else {
          // Swiped right -> prev slide
          updateSlide(currentSlide - 1);
        }
        restartAutoSlide();
      }
    }

    // Keyboard Arrow navigation when pastor section is focused
    const pastorSection = document.getElementById("gembala");
    if (pastorSection) {
      pastorSection.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          updateSlide(currentSlide - 1);
          restartAutoSlide();
        } else if (e.key === "ArrowRight") {
          updateSlide(currentSlide + 1);
          restartAutoSlide();
        }
      });
    }

    // Auto-slide every 8 seconds
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        updateSlide(currentSlide + 1);
      }, 8000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function restartAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Initialize
    updateSlide(0);
    startAutoSlide();
  }

  initPastorSlider();
});

