/* =========================================================
   Huella · lógica de la web (vanilla JS)
   - Cambio de idioma ES/EN (lee data-es / data-en del HTML)
   - Menú móvil
   - Formulario de contacto
   No genera HTML: todo el contenido está escrito en index.html
   ========================================================= */

// ---- CONFIG: pega aquí tu endpoint de Formspree (Fase 2) ----
// Mientras esté vacío, el formulario funciona en "modo demo"
// (muestra el mensaje de éxito sin enviar nada).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvznjdvb"; // ej: "https://formspree.io/f/xxxxxxx"
// -------------------------------------------------------------

const STORAGE_KEY = "huella-lang";

// Textos del formulario (los únicos que el JS necesita conocer,
// porque cambian de estado: "Enviando...", "Enviado", error).
const formMessages = {
  es: {
    send: "Enviar mensaje",
    sending: "Enviando...",
    sent: "¡Mensaje enviado! Te contactaremos pronto.",
    error: "Hubo un problema al enviar. Inténtalo de nuevo o llámanos.",
  },
  en: {
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent! We'll be in touch soon.",
    error: "Something went wrong. Please try again or call us.",
  },
};

let currentLang = "es";

/* ---------- Aplicar idioma ---------- */
function applyLang(lang) {
  currentLang = lang;

  // Cada elemento con data-es/data-en muestra el texto del idioma activo
  document.querySelectorAll("[data-es]").forEach((el) => {
    const val = el.getAttribute("data-" + lang);
    if (val !== null) el.textContent = val;
  });

  // Estado visual del botón de idioma (solo si existe)
  const esBtn = document.getElementById("lang-es");
  const enBtn = document.getElementById("lang-en");
  if (esBtn) esBtn.classList.toggle("active", lang === "es");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");

  // Atributo lang del documento
  document.documentElement.lang = lang;

  localStorage.setItem(STORAGE_KEY, lang);
}

/* ---------- Formulario de contacto ---------- */
function setupForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  // --- Feedback visual: activar el botón solo si el formulario está completo ---
  function checkFormValid() {
    const consent = document.getElementById("f-consent");
    const ok =
      form.name.value.trim() &&
      form.email.value.trim() &&
      form.message.value.trim() &&
      (!consent || consent.checked);
    submitBtn.disabled = !ok;
  }

  // Revisa cada vez que el usuario escribe o marca la casilla
  form.addEventListener("input", checkFormValid);
  form.addEventListener("change", checkFormValid);

  // Estado inicial: desactivado al cargar
  checkFormValid();


  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const m = formMessages[currentLang];
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) return;

    const consent = document.getElementById("f-consent");
    if (consent && !consent.checked) {
      status.textContent = currentLang === "es"
        ? "Debes aceptar la política de privacidad."
        : "You must accept the privacy policy.";
      status.className = "form-status error";
      status.hidden = false;
      return;
    }

    status.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = m.sending;

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Network response not ok");
      } else {
        // Modo demo: sin endpoint configurado todavía
        await new Promise((r) => setTimeout(r, 600));
      }

      form.reset();
      status.textContent = m.sent;
      status.className = "form-status success";
    } catch (err) {
      status.textContent = m.error;
      status.className = "form-status error";
    } finally {
      status.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = m.send;
      setTimeout(() => { status.hidden = true; }, 5000);
    }
  });
}

/* ---------- Menú móvil ---------- */
function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-mobile");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}







/* ---------- Galería de la home (carrusel + puntos) ---------- */
function setupGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const track = gallery.querySelector("[data-gallery-track]");
  const prevBtn = gallery.querySelector("[data-gallery-prev]");
  const nextBtn = gallery.querySelector("[data-gallery-next]");
  const dotsWrap = document.querySelector("[data-gallery-dots]");
  const items = Array.from(track.children);
  let index = 0;
  let lastDotCount = -1;

  // Cuántas fotos se ven a la vez según el ancho (coincide con el CSS: 639 / 900)
  function perView() {
    if (window.innerWidth <= 639) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, items.length - perView());
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", "Foto " + (i + 1));
      dot.addEventListener("click", () => { index = i; update(); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function update() {
    if (index > maxIndex()) index = maxIndex();

    const dotCount = maxIndex() + 1;
    if (dotCount !== lastDotCount) {
      buildDots();
      lastDotCount = dotCount;
    }

    const item = items[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = item.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * step}px)`;

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex();
    updateDots();
  }

  prevBtn.addEventListener("click", () => { index = Math.max(0, index - 1); update(); });
  nextBtn.addEventListener("click", () => { index = Math.min(maxIndex(), index + 1); update(); });
  window.addEventListener("resize", update);

  update();
}





/* ---------- Lightbox (usado por la galería de home y la página completa) ---------- */
function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  const prevBtn = document.querySelector("[data-lightbox-prev]");
  const nextBtn = document.querySelector("[data-lightbox-next]");
  const items = Array.from(document.querySelectorAll(".gallery-item, .full-gallery-item"));
  if (!lightbox || !lightboxImg || items.length === 0) return;

  let current = 0;

  function show(i) {
    // Navegación circular: después de la última vuelve a la primera, y viceversa
    current = (i + items.length) % items.length;
    const img = items[current].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  items.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      show(i);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  if (prevBtn) prevBtn.addEventListener("click", () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(current + 1));

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}






/* ---------- Modal de equipo (biografía extensa) ---------- */
function setupTeamModal() {
  const modal = document.querySelector("[data-team-modal]");
  if (!modal) return;

  const closeBtn = modal.querySelector("[data-team-modal-close]");
  const panels = modal.querySelectorAll("[data-team-panel]");
  const triggers = document.querySelectorAll("[data-team-target]");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.getAttribute("data-team-target");
      panels.forEach((p) => {
        p.hidden = p.getAttribute("data-team-panel") !== target;
      });
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}


/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Año del footer (solo si existe)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Idioma: leer guardado y aplicarlo (heredado de la página principal)
  const stored = localStorage.getItem(STORAGE_KEY);
  applyLang(stored === "en" || stored === "es" ? stored : "es");

  // Botón de idioma (solo si existe)
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLang(currentLang === "es" ? "en" : "es");
    });
  }

  // Menú y formulario solo si están presentes en la página
  if (document.getElementById("menu-toggle")) setupMenu();
  if (document.getElementById("contact-form")) setupForm();


  setupGallery();
  setupLightbox();
  setupTeamModal();
});